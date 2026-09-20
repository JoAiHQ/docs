# Automations

Automations are long-lived **contact journeys**: a trigger enrolls a contact, then ordered steps run over time (wait, action, branch, halt). Install the **Automations** native app under **Team settings → Apps** to use the dashboard and MCP tools.

They are **not**:

- [Campaigns](/campaigns) — oneshot blasts to an audience
- **Agent settings → Automations** — shortcuts, alerts, flows, and [Hooks](/webhooks) that fire a single immediate action (no enrollment)

## Overview

- Enroll contacts from a **prop**, **segment**, **manual run**, or **webhook** (inbound Hook)
- Steps: **wait**, **warp** (any action, including contact messages), **branch**, **halt**
- One enrollment per automation + contact; marketing opt-out is checked at enroll
- Graph cannot change while enrollments are active — disable or wait until idle to edit steps
- Live enrollment cards over the team websocket; milestones on the **contact timeline**
- Message steps surface as the usual agent **approval card** in chat

## Install

1. **Team settings → Apps** → install **Automations**
2. Open **Automations** in the sidebar
3. Agents only see automation MCP tools when the app is installed

## Creating in the UI

1. Open **Automations** → **New automation**
2. Choose a **trigger** (prop, segment, manual, or webhook)
3. Add steps in order — waits, warps, branches, halt
4. For contact messages, pick the contact-message action and map inputs (`message`, `integration`, …)
5. Enable when ready; use **Run** for a one-contact manual enroll
6. Watch enrollments on the automation card (live updates)

Webhook triggers need an **agent** (inbound delivery is `/agents/{uuid}/hooks`). JoAi creates a **system-owned Hook** tied to the automation — manage it from the automation, not the editable Hooks list.

## How they work

| Piece | Behavior |
| --- | --- |
| **Trigger** | Contact prop (e.g. `onboarding-stage` = `done`), segment match, manual, or **webhook** — **not** marketing tags. Several webhook automations can share one `source`; each gets its own Hook and all matching Hooks run. |
| **Enrollment** | Unique per automation + contact; skips marketing opt-out at enroll. Missing address / pending consent are checked when a warp step resolves `integration` (and can re-enroll once fixed). |
| **Action** | Step type `warp`: pick any action and map inputs from `contact.*` / `enrollment.*` (Hook-style mapper). Contact messages use `warpId` `joai-contact-message-send` with inputs `message`, `integration`, `recipientId`, `contactId` (and `subject` / `html` when needed). Prior-step warp *outputs* are not wired yet — steps fire asynchronously. |
| **Branch** | `branch` with `when[]` conditions (same operators as Hooks) and jumps to `thenPosition` / `elsePosition` |
| **Scheduler** | Each wait queues a delayed advance; an every-minute sweeper also picks up due enrollments |
| **Steps** | Wait stores `delayMinutes` (`0` = immediate) and stays first-class (not a warp) |
| **Audience preview** | Opt-out sendable vs skipped (channel readiness is evaluated when steps run) |
| **Delete** | Allowed when no enrollments are active; otherwise disable with `update_automation` |

**Hooks stay separate.** Agent settings → Automations → Hooks map inbound/internal events to one immediate action. A **webhook automation** trigger links the two: the system Hook enrolls the mapped contact into this journey.

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
- Agent settings → Automations (shortcuts / hooks) is a different surface — see [Shortcuts](/shortcuts) and [Webhooks](/webhooks)

## Related

- [Native apps](/apps/) — install Automations on the team
- [Campaigns](/campaigns) — oneshot blasts (separate install)
- [Contacts](/apps/contacts) — CRM; segments are managed in Campaigns
- [Webhooks](/webhooks) — Hooks vs webhook enrollment triggers
- [Shortcuts](/shortcuts) — Agent settings → Automations (not this app)
- [MCP](/protocols/mcp)
