# Contracts

Contracts is the smart-contract native app: author, deploy, version, and call on-chain contracts from JoAi. Install **Contracts** under **Team settings → Apps**, then open **Agent settings → Contracts** (`/agents/settings/contracts`). Contracts also appears in the dashboard sidebar when installed.

## Overview

- Create and version contract definitions (source / ABI / WASM)
- **Deploy**, **upgrade**, switch versions, or **set address** for an existing deployment
- View ABI; **query** readable functions; execute writes with [Wallets](/wallets)
- Generate Warps from ABI → optional [Sites](/sites) brand for a public UI
- Agents get contract MCP tools when the app is installed (**agent tooling** access, not plain team-manage)

## In the app

1. Install **Contracts**
2. Open **Agent settings → Contracts** (or the Contracts sidebar entry)
3. Create or import a contract definition
4. Deploy (needs a funded wallet on the target chain) or attach an existing address
5. Browse versions / WASM builds; query or call methods
6. Optionally publish Warps / a Sites brand so humans and agents share the same actions

## For agents (MCP)

Requires **Contracts**. Tools use **AgentToolingAccess** (agent may call them when Contracts is installed).

| Tool | Purpose |
| --- | --- |
| `create_contract` / `update_contract` / `delete_contract` | Definitions |
| `list_contracts` / `get_contract` / `get_contract_abi` / `list_contract_versions` | Read |
| `deploy_contract` / `upgrade_contract` / `set_contract_address` | Deploy lifecycle |
| `query_contract` | Read on-chain |

Writes that change chain state typically go through wallet-backed warps / approvals. Live schemas: `tools/list`. See [MCP](/protocols/mcp) and [SKILL.md](https://joai.ai/SKILL.md).

## Tips

- Use a **cloud** wallet for smoother deploy/upgrade automation
- Keep ABIs and versions tidy — agents rely on accurate method names
- Prefer Sites + Warps for customer-facing contract UX instead of raw hex calls

## Related

- [Native apps](/apps/)
- [Wallets](/wallets)
- [Sites](/sites)
- [Warps](/warps/general)
- [Heartbeats](/apps/heartbeats)
