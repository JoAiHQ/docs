# Campaigns

Campaigns send personalized messages to an audience of contacts over email, WhatsApp, SMS, or push. They are created as **drafts**, then sent when ready. Campaigns belong to a **team** and use that team's contacts, segments, and agent channel integrations.

Install the **Campaigns** native app under **Team settings → Apps** (see [Native apps](/apps/)).

## Overview

- Target a **saved segment**, contacts with specific **tags**, or explicit **contact IDs**
- Personalize with `{{placeholders}}` from contact fields, static text, or AI prompts
- WhatsApp templates go through an **approval** flow before send
- Finished campaigns can be **archived**, and recipients that failed or were skipped can be **retried**
- Email messages get an **unsubscribe** footer automatically when marketing consent URLs are available

## Channels

| Channel | Content | Placeholders | Extra requirements |
| --- | --- | --- | --- |
| **Email** | Subject + body (plain or HTML) | Static + AI | Own outbound provider + from address |
| **WhatsApp** | Template body | Static only | Slug-style name, language, category, approval before send |
| **SMS** | Body | Static + AI | — |
| **Push** | Title + body | Static + AI | — |

AI placeholders (`aiParams`) require an **agent** on the campaign with that channel enabled. For email, set up outbound sending (provider + from address) — the `@inbox.joai.ai` address is for receiving only.

## Audience

### In the UI

Choose one mode when creating a campaign:

1. **Segment** — a saved audience (recommended for recurring sends). Pick an existing segment, or create one with **New segment**. The Campaigns page also has a **Segments** section to list, view, edit, and delete segments.
2. **Tags** — contacts that have any of the selected tags
3. **Contacts** — pick specific contacts

Audience is fixed at create time. You can edit message content later, not who is targeted.

### Segment builder

Segments are groups of conditions with match **all** or **any** per group. The editor shows a live match count.

| Condition type | Meaning |
| --- | --- |
| `tag` | Has tag |
| `has_email` / `has_phone` / `has_user` | Channel / user presence |
| `never_purchased` | No orders yet |
| `last_purchase_after` / `last_purchase_before` | Purchase window |
| `order_count_at_least` | Order count |
| `total_order_amount` / `avg_order_value_at_least` | Spend metrics |
| `last_contact_after` / `last_contact_before` | Last contact window |
| `waiting_on` | Waiting / follow-up state |
| `created_after` / `created_before` | Contact created window |
| `email_contains` | Email substring |

MCP: `list_segments`, `create_segment`, `delete_segment` (requires [Contacts](/apps/contacts)). There is **no `update_segment`** — edit in the Campaigns UI.

### Via MCP / API

Pass one or more of:

- `segmentId` — saved segment hashid
- `tags` — contacts with any of these tags (API-only audience path)
- `contactIds` — explicit contact hashids

At least one audience source is required on create. Tags and contact IDs can be combined; a segment resolves on its own. Empty audiences (including empty segments) are rejected.

On update, omit `segmentId` / `tags` / `contactIds` to leave the audience unchanged; send any of them to replace it (same non-empty rules as create).


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

- a **contact path**: `contact.name`, `contact.firstName`, `contact.lastName`, `contact.email`, `contact.phone`, `contact.company`, `contact.title`, `contact.location`
- or a **literal string**, e.g. `Vienna`

First/last name are derived from the contact’s full name (first word / remainder).

```json
{
  "name": "contact.firstName",
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
| **Scheduled** | Send queued for a future time. **Cancel schedule** returns to draft. |
| **Sending** | Delivery in progress. Can be **cancelled** if stuck. |
| **Completed** | Finished. Can be archived, or retried for recipients that failed or were skipped. |
| **Failed** | Finished with failures. Can be archived, or retried. |

### Edit

Unsent campaigns (draft, pending, approved, rejected) can be edited — including **audience** (segment, tags, or contact IDs). Sending / completed / failed cannot. Editing pending or approved content or audience returns the campaign to draft (re-submit WhatsApp approval before sending).

On update, omit `segmentId` / `tags` / `contactIds` to leave the audience unchanged; send any of them to replace it (same rules as create: at least one non-empty source).

### Schedule send

When starting delivery, pass an optional **`scheduledAt`** ISO datetime (API, SDK, or `send_campaign` with `scheduledAt`). Future times set status **scheduled** and dispatch when due; omit or use a past time to send immediately.

**Cancel schedule** (`POST …/cancel-schedule`) is only available while **scheduled**. It clears `scheduledAt` and returns the campaign to **draft**.

### Test send (email)

Before a real blast, use **Send test** in the UI or `POST /v1/campaigns/{id}/send-test` with `{ "contactId": "…" }`.

- Email channel only; **existing contact with an email** required
- Assembles the real subject/body (placeholders, AI slots, HTML, unsubscribe footer) and delivers synchronously through the campaign agent
- Subject is prefixed with `[TEST]`
- Does **not** start the campaign, attach audience contacts, or update sent/skipped/failed counts
- Does **not** create new CRM contacts

### Cancel send

Cancel is only available while **sending**. It closes open delivery approval cards and marks remaining contacts as failed so the campaign can leave the stuck state.

### Email HTML mode

For **email** campaigns, set **`contentHtml`** on create/update. In the UI, HTML mode uses a dedicated visual editor with a formatting toolbar (plus a source toggle for raw HTML). The body is sent as HTML (fragment tags like `<p>` work — no full `<html>` document required). Plain-text campaigns keep the 5 000 character limit; HTML allows up to 50 000. The marketing **unsubscribe** footer is appended in HTML when applicable.

### Opens and clicks (Resend only)

When outbound email is sent through **Resend**, the provider message id is stored on the outbound message and campaign contact. Resend **email.opened** / **email.clicked** webhooks update per-contact `opened_at` / `clicked_at` and campaign `openedCount` / `clickedCount`. Other email providers do not populate these metrics today.

### Recipients and retries

Every campaign contact carries a delivery status you can inspect per recipient:

| Status | Meaning |
| --- | --- |
| **Sent** | Delivered to the channel |
| **Failed** | Delivery attempt rejected; the provider error is stored |
| **Skipped** | Not attempted, with a reason (consent, opt-out, missing channel, approval) |
| **Pending** | Attached to the campaign but not attempted yet |

In the Campaigns UI the counts on a campaign card (`failed`, `skipped`, and `sent / total`) are clickable and open the recipient list, which you can filter by status.

**Retry** re-queues recipients that did not go out and can still be delivered:

- **Failed** recipients are always retryable
- **Skipped** recipients are retryable only when the reason can be resolved — **missing channel** (after adding an email/phone) or **approval skipped** (after approval)
- **Opted out** and **pending consent** recipients are never retried
- Retrying reopens a finished campaign to **sending**, clears the previous failure/skip, restores the remaining count, and dispatches the messages again

HTTP API:

- `GET /v1/campaigns/{id}/recipients` — paginated recipients; optional `status` (`sent`, `failed`, `skipped`, `pending`) and `perPage`. Each recipient includes `retryable` and, for skips, `skipReason`.
- `POST /v1/campaigns/{id}/retry` — retry every retryable recipient, or pass `{ "contactIds": ["…"] }` for specific contacts. Only allowed for **completed** or **failed** campaigns. Returns `{ "retried": n }`.

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
6. **Send test** (email only) to your inbox — real delivery with a `[TEST]` subject; does not start the campaign or attach the audience
7. Send when ready (confirm dialog shows sendable count and auto-mode notes)

Use the in-app message preview to sanity-check personalization before sending. Prefer **Send test** for a real email round-trip.

## MCP / agents

Agent MCP tools:

| Tool | Purpose |
| --- | --- |
| `create_campaign` | Create a draft (`joai-campaign-create`) |
| `preview_campaign_audience` | Preview sendable vs skipped counts (`joai-campaign-audience-preview`) — call **before** `send_campaign` |
| `send_campaign` | Start delivery (`joai-campaign-send`); optional `scheduledAt` (ISO 8601, future) |
| `list_campaigns` | List campaigns (`joai-campaign-list`) |
| `campaign_stats` | Team campaign stats (`joai-campaign-stats`) |
| `delete_campaign` | Delete a campaign (`joai-campaign-delete`) |

Related warp (often used from automations / form follow-ups):

- `joai-campaign-send-contact` — send an existing campaign to one contact by email, optionally delayed (`2h`, `3d`, …)

**Not exposed as dedicated MCP tools today:** update/edit, archive/unarchive, cancel send, test send, list recipients, retry failed sends, WhatsApp submit/refresh. Use the JoAi UI (or HTTP API) for those.

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

Before `send_campaign`, call `preview_campaign_audience` (with `campaignId`, or `channel` plus `segmentId` / `tags` / `contactIds`) to confirm sendable recipients and skip reasons (`pending_consent`, `opted_out`, `missing_channel`, `approval_skipped`).

After `send_campaign`, delivery may wait on warp approval when the sending agent is not in **auto mode**. Approve in JoAi or poll `check_warp_executions` until messages go out.

For live schemas, call `tools/list` on the agent MCP endpoint. See also [MCP](/protocols/mcp) and the public [SKILL.md](https://joai.ai/SKILL.md).

## Tips

- Prefer segments over one-off contact lists when you will reuse the audience
- Map every placeholder before send — empty `templateParams` is the usual reason `{{name}}` arrives blank
- For WhatsApp, use a slug name and map all placeholders up front or create/submit will fail validation
- Pick an agent that actually has the channel integration before using AI slots
- For email, set up outbound sending on the agent (provider + from address you control). The inbox address alone is for receiving
- Archive completed campaigns so the active list stays focused on work in progress

## Related

- [Native apps](/apps/) — install Campaigns on the team
- [WhatsApp Business](/integrations/whatsapp) — Meta Cloud API channel (not Personal)
- [Email](/integrations/email) — agent email for campaigns
- [Twilio](/integrations/twilio) — SMS / voice channel
- [Contacts](/apps/contacts) — CRM; segments are managed in Campaigns (MCP segment tools still need Contacts installed)
- [Forms](/apps/forms) — form follow-ups
- [MCP](/protocols/mcp)

