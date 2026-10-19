# Shortcuts, flows & automations

Quick actions and builders live under **Agent settings → Automations**. Contact **Journeys** and team **Hooks** live in the [Automations](/automations) native app.

| Tab | Purpose |
| --- | --- |
| **Shortcuts** | One-click warp launches in chat |
| **Alerts** | On-chain / warp event subscriptions — [Alerts](/alerts) |
| **Flows** | Visual / structured flow builder |
| **Hooks** | Internal event → warp (also under **Automations → Hooks**) — [Webhooks](/webhooks) |

## Shortcuts

1. Open **Agent settings → Automations → Shortcuts**
2. **Create shortcut** — pick a warp (optional chat/presentation mode)
3. Shortcut appears for quick launch in the agent UI

Shortcuts are warp-backed quick actions — not a separate “Flow shortcut type” product. Flows have their own tab.

## Flows

1. Open **Agent settings → Automations → Flows**
2. Use **Flow builder** to create or edit flows
3. Publish / manage from the flows overview

Public flow pages can appear on the store host — see [Public surfaces](/apps/public-surfaces).

## Hooks

- **Internal** — e.g. `contact.created` → run a warp (MCP `create_hook` with `source=internal`)
- **Web** — agent output events → POST to your URL (`source=web`)

Prefer **Automations → Hooks** for team management; Agent settings still exposes Hooks for the active agent. Distinct from the **Webhooks** integration under Integrations, and from Automations **Journeys**.

## Related

- [Agents](/agents)
- [Automations](/automations) — Journeys + Hooks native app
- [Alerts](/alerts)
- [Tasks](/tasks)
- [Webhooks](/webhooks)
- [Warps](/warps/general)
- [Chat & Commands](/chat-commands)
