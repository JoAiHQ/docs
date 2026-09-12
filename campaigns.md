# Campaigns

Campaigns send personalized messages to an audience of contacts over email, WhatsApp, SMS, or push. They are created as **drafts**, then sent when ready. Campaigns belong to a **team** and use that team's contacts, segments, and agent channel integrations.

## Overview

- Target a **saved segment**, contacts with specific **tags**, or explicit **contact IDs**
- Personalize with `{{placeholders}}` from contact fields, static text, or AI prompts
- WhatsApp templates go through an **approval** flow before send
- Finished campaigns can be **archived** so the active list stays clean
- Email messages get an **unsubscribe** footer automatically when marketing consent URLs are available

## Channels

| Channel | Content | Placeholders | Extra requirements |
| --- | --- | --- | --- |
| **Email** | Subject + body | Static + AI | Own outbound provider + from address |
| **WhatsApp** | Template body | Static only | Slug-style name, language, category, approval before send |
| **SMS** | Body | Static + AI | — |
| **Push** | Title + body | Static + AI | — |

AI placeholders (`aiParams`) require an **agent** on the campaign with that channel enabled. For email, set up outbound sending (provider + from address) — the `@inbox.joai.ai` address is for receiving only.

## Audience

### In the UI

Choose one mode when creating:

1. **Segment** — a saved audience (recommended for recurring sends; tag rules usually live here)
2. **Contacts** — pick specific contacts

Audience is fixed at create time. You can edit message content later, not who is targeted.

### Via MCP / API

Pass one or more of:

- `segmentId` — saved segment hashid
- `tags` — contacts with any of these tags
- `contactIds` — explicit contact hashids

At least one audience source is required. Tags and contact IDs can be combined; a segment resolves on its own.

Before send, the UI shows how many contacts are **sendable** vs skipped:

| Skip reason | Meaning |
| --- | --- |
| **Pending consent** | Marketing consent not granted yet |
| **Opted out** | Contact unsubscribed / opted out |
| **Missing channel** | No usable address for this channel (email/phone/etc.) |
| **Approval skipped** | Channel/approval rules excluded the contact |

## Placeholders

Use `{{name}}`-style tokens in the subject and/or body. Names may only contain **lowercase letters, numbers, and underscores** (`[a-z0-9_]+`).

Every placeholder must be mapped, or it stays **empty** on send.

### Static / contact fields (`templateParams`)

Map a placeholder to:

- a **contact path**: `contact.name`, `contact.email`, `contact.phone`, `contact.company`, `contact.title`, `contact.location`
- or a **literal string**, e.g. `Vienna`

```json
{
  "name": "contact.name",
  "city": "Vienna"
}
```

### AI prompts (`aiParams`)

Map a placeholder to a short prompt. At send time the campaign agent fills that slot **per contact** (voice/brand-aware).

```json
{
  "offer": "Mention a short local coffee or brunch offer in under 20 words."
}
```

Rules:

- A placeholder belongs in **either** `templateParams` **or** `aiParams`, not both
- `aiParams` requires an **agent** on the campaign
- Not available for **WhatsApp**
- The agent needs an active integration for the campaign channel
- Keep prompts short and specific

## WhatsApp approval

WhatsApp campaigns are treated as provider templates:

1. Create a draft with a **slug name** (`summer_promo`, not `Summer Promo`), content, **language** (e.g. `de`, `en`), and **category** (`MARKETING`, `UTILITY`, or `AUTHENTICATION`)
2. Map **every** placeholder in `templateParams` (AI params are rejected)
3. **Submit for approval**
4. Wait until status is **approved** (use **Refresh** if needed)
5. **Send**

Editing a **pending** or **approved** campaign resets it to **draft** and clears external approval metadata — submit again before sending.

## Lifecycle

| Status | Meaning |
| --- | --- |
| **Draft** | Editable. Submit (WhatsApp) or send (other channels). |
| **Pending** | Waiting on WhatsApp template approval. |
| **Approved** | WhatsApp template approved; ready to send. |
| **Rejected** | Approval failed; edit and resubmit. |
| **Sending** | Delivery in progress. Can be **cancelled** if stuck. |
| **Completed** | Finished. Can be archived. |
| **Failed** | Finished with failures. Can be archived. |

### Edit

Unsent campaigns (draft, pending, approved, rejected) can be edited. Sending / completed / failed cannot. Editing pending or approved content returns the campaign to draft.

### Cancel send

Cancel is only available while **sending**. It closes open delivery approval cards and marks remaining contacts as failed so the campaign can leave the stuck state.

### Delete

Campaigns can be deleted unless they are currently **sending**. WhatsApp provider templates are cleaned up best-effort when deleting.

### Archive

Only **completed** and **failed** campaigns can be archived. Archived campaigns leave the active list, remain under the **Archived** filter, and still count toward historical send totals. **Restore** (unarchive) before editing.

## Creating a campaign (UI)

1. Open **Campaigns** for the team
2. Create: name, channel, content, audience
3. Map every `{{placeholder}}` (static/contact or AI) and pick an agent when using AI
4. Check the audience preview (sendable vs skipped)
5. For WhatsApp: language + category, then submit for approval
6. Send when ready (confirm dialog shows sendable count and auto-mode notes)

Use the in-app message preview to sanity-check personalization before sending.

## MCP / agents

Agent MCP tools:

| Tool | Purpose |
| --- | --- |
| `create_campaign` | Create a draft (`joai-campaign-create`) |
| `send_campaign` | Start delivery (`joai-campaign-send`) |
| `list_campaigns` | List campaigns (`joai-campaign-list`) |
| `campaign_stats` | Team campaign stats (`joai-campaign-stats`) |
| `delete_campaign` | Delete a campaign (`joai-campaign-delete`) |

Related warp (often used from automations / form follow-ups):

- `joai-campaign-send-contact` — send an existing campaign to one contact by email, optionally delayed (`2h`, `3d`, …)

**Not exposed as dedicated MCP tools today:** update/edit, archive/unarchive, cancel send, WhatsApp submit/refresh. Use the JoAi UI (or HTTP API) for those.

When creating via MCP, pass placeholders explicitly — they are **not** inferred from `{{tokens}}` alone:

```json
{
  "name": "Follow-up",
  "channel": "email",
  "subject": "Hi {{name}}",
  "content": "Offer for you: {{offer}}",
  "segmentId": "…",
  "templateParams": { "name": "contact.name" },
  "aiParams": { "offer": "Mention a short local offer." }
}
```

If `aiParams` is set and no `agentId` is passed, MCP defaults to the **connected agent**. That agent still needs an active channel integration.

After `send_campaign`, delivery may wait on warp approval when the sending agent is not in **auto mode**. Approve in JoAi or poll `check_warp_executions` until messages go out.

For live schemas, call `tools/list` on the agent MCP endpoint. See also [MCP](/protocols/mcp) and the public [SKILL.md](https://joai.ai/SKILL.md).

## Tips

- Prefer segments over one-off contact lists when you will reuse the audience
- Map every placeholder before send — empty `templateParams` is the usual reason `{{name}}` arrives blank
- For WhatsApp, use a slug name and map all placeholders up front or create/submit will fail validation
- Pick an agent that actually has the channel integration before using AI slots
- For email, set up outbound sending on the agent (provider + from address you control). The inbox address alone is for receiving
- Archive completed campaigns so the active list stays focused on work in progress
