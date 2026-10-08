# Automations

The **Automations** native app is the team home for automation: **Journeys** (contact drips) and **Hooks** (event → one action). Install it under **Team settings → Apps**.

They are **not**:

- [Campaigns](/campaigns) — oneshot blasts to an audience
- **Agent settings → Automations** — shortcuts, alerts, and flows (Hooks are also available there for the active agent)

## Overview

### Journeys

- Enroll contacts from a **prop**, **segment**, **manual run**, or **webhook** (inbound Hook)
- Steps: **wait**, **warp** (any action, including contact messages), **branch**, **halt**
- One enrollment per automation + contact; marketing opt-out is checked at enroll
- Graph cannot change while enrollments are active — disable or wait until idle to edit steps
- Live enrollment cards over the team websocket; milestones on the **contact timeline**
- Message steps surface as the usual agent **approval card** in chat

### Hooks

- Stateless: one JoAi or inbound event → map fields → one warp now (no enrollment wait)
- Manage under **Automations → Hooks** (pick an agent) — same models as Agent settings → Automations → Hooks
- See [Webhooks & hooks](/webhooks)

## Install

1. **Team settings → Apps** → install **Automations**
2. Open **Automations** in the sidebar
3. Agents only see automation MCP tools when the app is installed

## Creating in the UI

### Journeys

1. Open **Automations** → **Journeys** → **New automation**
2. Choose a **trigger** (prop, segment, manual, or webhook)
3. Build the **timeline** — insert waits, messages, custom actions, and branches between steps (reorder with the arrows)
4. For branches, pick **Then** / **Else** targets from the step list (or **End**) — no raw step numbers
5. For contact messages, choose the channel and write the body (the contact-message action is used under the hood)
6. Enable when ready; use **Run** for a one-contact manual enroll
7. Watch enrollments on the automation card (live updates)

Webhook triggers need an **agent** (inbound delivery is `/agents/{uuid}/hooks`). JoAi creates a **system-owned Hook** tied to the automation — manage it from the automation, not the editable Hooks list.

### Hooks

1. Open **Automations** → **Hooks**
2. Choose the **agent** that owns the hook
3. Create an internal hook (e.g. `contact.created` / `update.created` → warp) or manage existing ones

## How they work

| Piece | Behavior |
| --- | --- |
| **Trigger** | Contact prop (e.g. `onboarding-stage` = `done`), segment match, manual, or **webhook** — **not** marketing tags. Several webhook automations can share one `source`; each gets its own Hook and all matching Hooks run. |
| **Enrollment** | Unique per automation + contact; skips marketing opt-out at enroll. Missing address / pending consent are checked when a warp step resolves `integration` (and can re-enroll once fixed). |
| **Action** | Step type `warp`: pick any action and map inputs from `contact.*` / `enrollment.*` (Hook-style mapper). Contact messages use `warpId` `joai-contact-message-send` with inputs `message`, `integration`, `recipientId`, `contactId` (and `subject` / `html` when needed). Prior-step warp *outputs* are not wired yet — steps fire asynchronously. |
| **Branch** | `branch` with `when[]` conditions (same operators as Hooks). In the UI, Then/Else jump to another step or **End**; the API stores 0-based `thenPosition` / `elsePosition` (including the terminal halt). |
| **Scheduler** | Each wait queues a delayed advance; an every-minute sweeper also picks up due enrollments |
| **Steps** | Wait stores `delayMinutes` (`0` = immediate) and stays first-class (not a warp) |
| **Audience preview** | Opt-out sendable vs skipped (channel readiness is evaluated when steps run) |
| **Delete** | Allowed when no enrollments are active; otherwise disable with `update_automation` |

**Journeys and Hooks stay separate under the hood.** Hooks map events to one immediate action; journeys enroll contacts over time. A **webhook journey** trigger links them: the system Hook enrolls the mapped contact into that journey.

## MCP / agents

Requires the **Automations** native app installed on the team. Discover live schemas with `tools/list`. Warp steps that need approval follow the usual auto-mode / `check_warp_executions` flow.

| Tool | Purpose |
| --- | --- |
| `create_automation` | Create with `triggerType`, `triggerConfig`, `actions`, optional `agentId` / `enabled` |
| `list_automations` | List team automations |
| `automation_stats` | Team automation stats |
| `update_automation` | Update name / enabled / trigger / `agentId` |
| `set_automation_actions` | Replace ordered actions (`wait` / `warp` / `branch` / `halt`) |
| `list_automation_enrollments` | Paginated enrollments (`page`, `perPage`) |
| `retry_automation_enrollment` | Clear enrollment `error` and resume |
| `run_automation` | Manually enroll one contact |
| `preview_automation_audience` | Opt-out sendable count + skip reasons + sample IDs |
| `delete_automation` | Delete when no active enrollments |

Example create payload:

```json
{
  "name": "Hollabrunn · B2B welcome",
  "triggerType": "prop",
  "triggerConfig": { "propKey": "onboarding-stage", "propValue": "done" },
  "actions": [
    { "type": "wait", "config": { "delayMinutes": 4320 } },
    {
      "type": "warp",
      "config": {
        "warpId": "joai-contact-message-send",
        "inputs": {
          "contactId": { "source": "contact", "path": "contact.id" },
          "message": { "source": "literal", "value": "Hallo {{name}}" },
          "subject": { "source": "literal", "value": "Kurz zu hollabrunn.digital" },
          "integration": { "source": "literal", "value": "email" },
          "recipientId": { "source": "contact", "path": "contact.email" }
        }
      }
    },
    { "type": "halt", "config": {} }
  ]
}
```

## Tips

- Install **Automations** before expecting MCP tools or the sidebar entry
- Prefer `joai-contact-message-send` for contact messages — there is no first-class “send” step type
- Prefer prop or segment triggers for recurring journeys; use webhook when an external system should enroll
- Disable (`enabled: false`) instead of delete when enrollments are still active
- Webhook automations need an agent with inbound Hooks; oneshot blasts belong in [Campaigns](/campaigns)
- Prefer **Automations → Hooks** for team-wide hook management; Agent settings → Automations still has Shortcuts / Alerts / Flows (and a Hooks tab for the active agent) — see [Shortcuts](/shortcuts) and [Webhooks](/webhooks)

## Related

- [Native apps](/apps/) — install Automations on the team
- [Campaigns](/campaigns) — oneshot blasts (separate install)
- [Contacts](/apps/contacts) — CRM; segments are managed in Campaigns
- [Webhooks](/webhooks) — Hooks vs journey webhook enroll
- [Shortcuts](/shortcuts) — Agent settings → Automations (shortcuts / alerts / flows)
- [MCP](/protocols/mcp)
