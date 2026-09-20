# Webhooks & hooks

JoAi has two related “HTTP callback” surfaces — do not confuse them.

## 1) Webhooks integration (outbound)

Install **Webhooks** under Integrations / Apps. Agent output events POST to your HTTPS URL.

Typical triggers: `agent.action`, `agent.message`, `user.message`.

Configure URL, secret, retries, headers in the Webhooks integration UI. Installer guide: [Webhooks integration](/integrations/webhooks).

## 2) Agent settings → Automations → Hooks

Under **Agent settings → Automations → Hooks**:

| Source | Behavior |
| --- | --- |
| **internal** | JoAi event (e.g. `contact.created`) → run a warp |
| **web** | Agent output event → POST to an external URL |
| **inbound** | `POST /agents/{uuid}/hooks?source=` → map payload → run a warp |

Hooks are **stateless**: one event → map fields → one warp now. They are **not** the [Automations](/automations) native app (no enrollment, wait, or drip journey).

The **Automations** native app can use a **webhook trigger**: JoAi upserts a system-owned Hook whose `next` enrolls the mapped contact into that automation (`joai-automation-enroll`). Multiple automations may share the same inbound `source` — each keeps its own Hook, and every matching Hook runs on a POST. Disabling an automation deactivates its Hook. Use Hooks for fire-and-forget warps; use [Automations](/automations) when the contact journey needs time, branches, or multiple steps.

MCP: `list_hooks`, `create_hook`, `toggle_hook`, `delete_hook` (Board-gated). Journey tools (`create_automation`, …) require the Automations app — see [Automations](/automations).

## 3) Inbound lifecycle hooks (runtimes)

External agent runtimes can POST to:

`POST /agents/{agentUuid}/hooks` with `Authorization: Bearer <agentAuthKey>`

Supported `type` values include:

- `session.start` — returns curated context (character + memories)
- `permission.request` — waits for JoAi approval (UI or signed link)

Also used for board auto-execution callbacks and Claude stop-hook adapters. Full contract: [SKILL.md](https://joai.ai/SKILL.md).

## Related

- [Webhooks integration](/integrations/webhooks) — installer / outbound setup
- [Automations](/automations) — contact journeys with webhook enroll
- [Shortcuts](/shortcuts) — Agent settings → Automations tabs
- [Integrations](/integrations/)
- [Agents](/agents)
- [Board](/apps/board)
- [API](/api)
- [MCP](/protocols/mcp)
