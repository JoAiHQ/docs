# Shortcuts, flows & automations

Quick actions and automation builders live under **Agent settings → Automations**:

| Tab | Purpose |
| --- | --- |
| **Shortcuts** | One-click warp launches in chat |
| **Alerts** | On-chain / warp event subscriptions — [Alerts](/alerts) |
| **Flows** | Visual / structured flow builder |
| **Hooks** | Internal event → warp, and outbound web hooks — [Webhooks](/webhooks) |

## Shortcuts

1. Open **Automations → Shortcuts**
2. **Create shortcut** — pick a warp (optional chat/presentation mode)
3. Shortcut appears for quick launch in the agent UI

Shortcuts are warp-backed quick actions — not a separate “Flow shortcut type” product. Flows have their own tab.

## Flows

1. Open **Automations → Flows**
2. Use **Flow builder** to create or edit flows
3. Publish / manage from the flows overview

Public flow pages can appear on the store host — see [Public surfaces](/apps/public-surfaces).

## Hooks

- **Internal** — e.g. `contact.created` → run a warp (MCP `create_hook` with `source=internal`)
- **Web** — agent output events → POST to your URL (`source=web`)

Manage under **Automations → Hooks**. Distinct from the **Webhooks** integration install under Integrations.

## Related

- [Agents](/agents)
- [Alerts](/alerts)
- [Tasks](/tasks)
- [Webhooks](/webhooks)
- [Warps](/warps/general)
- [Chat & Commands](/chat-commands)
