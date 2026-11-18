# Webhooks & hooks

JoAi has two related “HTTP callback” surfaces — do not confuse them.

## 1) Webhooks integration (outbound)

Install **Webhooks** under Integrations / Apps. Agent output events POST to your HTTPS URL.

Typical triggers: `agent.action`, `agent.message`, `user.message`.

Configure URL, secret, retries, headers in the Webhooks integration UI. Installer guide: [Webhooks integration](/integrations/webhooks).

## 2) Automations → Hooks

Manage Hooks in the **Automations** native app (**Automations → Hooks**, pick an agent), or under **Agent settings → Automations → Hooks** for the active agent.

| Source | Behavior |
| --- | --- |
| **internal** | JoAi event (`contact.created`, `contact.updated`, `update.created`) → run a warp |
| **web** | Agent output event → POST to an external URL |
| **inbound** | `GET` or `POST /agents/{uuid}/hooks?source=` → map payload → run a warp |

Hooks are **stateless**: one event → map fields → one warp now. They share the Automations UI with [Journeys](/automations) but are not contact enrollments (no wait / drip).

A **webhook journey** trigger upserts a system-owned Hook whose `next` enrolls the mapped contact (`joai-automation-enroll`). Multiple journeys may share the same inbound `source` — each keeps its own Hook, and every matching Hook runs on a POST. Disabling a journey deactivates its Hook. Use Hooks for fire-and-forget warps; use Journeys when the contact path needs time, branches, or multiple steps.

MCP: `list_hooks`, `create_hook`, `toggle_hook`, `delete_hook` (Board-gated). Journey tools (`create_automation`, …) require the Automations app — see [Automations](/automations).

### Inbound hook URL and token

Every `source` gets its own secret. Use it as a bearer header:

```bash
curl -X POST "https://api.joai.ai/agents/{uuid}/hooks?source=deploy" \
  -H "Authorization: Bearer $HOOK_SECRET" \
  -H "Content-Type: application/json" \
  -d '{"message":"Deployment finished: API [devnet]"}'
```

…or in the URL, so services that cannot set headers (Forge deploy hooks, simple cron pings) can just call it:

```bash
curl "https://api.joai.ai/agents/{uuid}/hooks?source=deploy&token=$HOOK_SECRET&message=Deployment%20finished%3A%20API%20%5Bdevnet%5D"
```

- `GET` and `POST` both work; query params are part of the payload, so a warp can map `message`, `level`, or any other field.
- Two auth modes, two capabilities:
  - **Bearer header / HMAC signature** — full inbound hook: a matching `Hook` runs its warp (or enrolls the journey).
  - **`?token=` in the URL** — notification-only: posts `message` as the agent (proactive message + push) and records the sample. It never runs warps, automations, `session.start`, or `permission.request`, so a leaked URL cannot do more than send you notifications. Use this for CI services that cannot set headers.
- Inbound messaging providers (WhatsApp / wacli) do not accept `?token=`; they require the HMAC signature header so a leaked URL cannot spoof messages.
- The secret is a per-source agent secret (`HOOK_SECRET_<SOURCE>`). Show, copy, and rotate it from the **Webhooks** integration panel; rotate programmatically with `POST /v1/agents/{agent}/hooks/{source}/secret/rotate`.
- Rotating invalidates the old secret immediately, so update your CI secret afterwards.

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
