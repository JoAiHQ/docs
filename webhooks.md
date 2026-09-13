# Webhooks & hooks

JoAi has two related “HTTP callback” surfaces — do not confuse them.

## 1) Webhooks integration (outbound)

Install **Webhooks** under Integrations / Apps. Agent output events POST to your HTTPS URL.

Typical triggers: `agent.action`, `agent.message`, `user.message`.

Configure URL, secret, retries, headers in the Webhooks integration UI. See also [Integrations](/integrations).

## 2) Automations → Hooks (agent hooks)

Under **Agent settings → Automations → Hooks**:

| Source | Behavior |
| --- | --- |
| **internal** | JoAi event (e.g. `contact.created`) → run a warp |
| **web** | Agent output event → POST to an external URL |

MCP: `list_hooks`, `create_hook`, `toggle_hook`, `delete_hook` (Board-gated).

## 3) Inbound lifecycle hooks (runtimes)

External agent runtimes can POST to:

`POST /agents/{agentUuid}/hooks` with `Authorization: Bearer <agentAuthKey>`

Supported `type` values include:

- `session.start` — returns curated context (character + memories)
- `permission.request` — waits for JoAi approval (UI or signed link)

Also used for board auto-execution callbacks and Claude stop-hook adapters. Agent index: [SKILL.md](https://joai.ai/SKILL.md).

## Related

- [Shortcuts](/shortcuts) (Automations tabs)
- [Integrations](/integrations)
- [Agents](/agents)
- [Board](/apps/board)
- [API](/api)
- [MCP](/protocols/mcp)
