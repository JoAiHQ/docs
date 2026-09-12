# Wallets

Wallets let agents hold keys, receive and send assets, and sign on-chain actions across supported chains. Install the **Wallets** native app under **Team settings → Apps**. Day-to-day wallet UI lives under **agent settings** and **team settings**, not a main sidebar item.

## Overview

- Generate, import, or connect wallets per chain
- Modes: **local**, **cloud**, and **external**
- Deposit / withdraw / sync; optional on-ramp providers
- Cloud wallets enable autonomous multi-step warp execution without browser signing
- Agents get wallet MCP tools when **Wallets** is installed

Deep product detail (chains, security, export) stays on this page. Install context: [Native apps](/apps/).

## Where to open wallets

| Surface | Path / place |
| --- | --- |
| **Agent wallets** | Agent settings → Wallets (`/agents/settings/wallets`) — generate, import, cloud/local/external per chain |
| **Your personal wallet** | Settings → Wallets (`/teams/settings/wallets`) — user wallet prefs (not the agent’s chain wallets) |
| **Install** | Team settings → Apps → **Wallets** (required for MCP wallet tools) |

For autonomous execution, ensure the agent has a **cloud** wallet on the target chain and Auto Mode is on — otherwise warps fall back to local browser signing.

## Supported blockchains

- **Sui**, **Solana**, **Ethereum**, **Base**, **MultiversX (EGLD)**, **NIR**
- Other **EVM** chains (Arbitrum, Somnia, and compatible networks)

Each network needs its own wallet entry.

## Management modes

### Local

Private seed stays on the device. Full ownership; key never stored on JoAi servers.

### Cloud

Managed through trusted wallet infrastructure (e.g. Privy, Gaupa, and related providers). Required for reliable agent auto-execution of multi-step chain warps.

### External

Agent assists with an existing wallet (Phantom, Slush, etc.). You keep signing control; the agent proposes actions.

## Capabilities

| Capability | Notes |
| --- | --- |
| **Generate** | New wallet + 24-word mnemonic — store securely |
| **Import** | Existing 24-word phrase; network must match |
| **Deposit / withdraw** | Address receive; validated send with approval rules |
| **On-ramp / off-ramp** | External providers (e.g. Coinbase) where available |
| **Sync** | Auto + manual refresh of balances / history |
| **Export** | Backup phrase / key with password confirmation — use carefully |
| **Multi-wallet** | Extra wallets often plan-gated (`wallet-multi`) |

## Security

- Backup mnemonics offline; never share phrases or private keys
- Prefer encrypted backups; test recovery
- Local mode: keys stay on device
- Cloud / external: follow provider + JoAi approval prompts
- Sensitive export always requires identity confirmation

## For agents (MCP)

Requires the **Wallets** app.

| Tool | Purpose |
| --- | --- |
| `list_wallets` | List wallets for the agent / team context |
| `create_wallet` | Create a wallet on a chain |
| `get_wallet_assets` | Balances / assets |
| `fund_wallet` | Fund / top-up flows where supported |

Warps such as `joai-wallet-create` also appear in product shortcuts. Live schemas: `tools/list`. See [MCP](/protocols/mcp) and [SKILL.md](https://joai.ai/SKILL.md).

## Related

- [Native apps](/apps/)
- [Contracts](/apps/contracts)
- [Heartbeats](/apps/heartbeats)
- [Agents](/agents)
- [Warps wallets](/warps/wallets)
- [Sites](/sites)
