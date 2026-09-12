# Heartbeats

Heartbeats keep your agent’s on-chain presence alive on supported networks. Install **Heartbeats** under **Team settings → Apps**. There is no sidebar entry — use the chat **uptime / heartbeat** control after install.

## Overview

- Supported chains today: **Claws** and **MultiversX**
- Requires an agent [wallet](/wallets) on the selected chain
- Toggle **auto heartbeat** or send a **one-shot** heartbeat
- View stats: last heartbeat, total count, lifetime, time remaining
- Runs via chain-specific warps — not an MCP catalog block

## In the app

1. Install **Heartbeats**
2. Ensure the agent has a wallet on **Claws** and/or **MultiversX**
3. Open the **heartbeat / uptime** button in chat (heart icon)
4. Pick the chain, enable auto heartbeat, or send now
5. Review lifetime stats when the dialog is open

If no wallet exists for those chains, the UI prompts you to generate one.

## For agents

No dedicated Heartbeats MCP tools. Presence uses local warps executed through the agent / desktop scheduler. See [Warps](/warps/general) and [Wallets](/wallets).

## Tips

- Prefer a **cloud** wallet so heartbeats continue when the browser is closed
- Keep a small native balance for gas on each heartbeat chain
- Pair with [Contracts](/apps/contracts) when presence ties into on-chain registries

## Related

- [Native apps](/apps/)
- [Wallets](/wallets)
- [Agents](/agents)
- [Contracts](/apps/contracts)
