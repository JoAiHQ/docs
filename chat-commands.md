# Chat and commands

Chat with your agent in natural language, use voice, or type slash commands for precise actions. All commands start with `/`.

## Overview

- Natural language chat in rooms
- Slash commands for warps, desk, secrets, discovery, and approvals
- Some commands are **local** (client-side UI) — `warp-test`, `warp-bulk`, `multi`

## Warp commands

| Command | Purpose |
| --- | --- |
| `/warp <id> [inputs…]` | Run a warp (alias / identifier) |
| `/warp-direct <id> [inputs…]` | Run with direct execution path |
| `/warp-create <chain> <name>` | Create a new warp on a chain |
| `/warp-input <id> [inputs…]` | Supply inputs for a waiting warp |
| `/warp-select` / `/warp-select-none` | Selection helpers in warp UI flows |
| `/warp-approve` / `/warp-always-approve` / `/warp-decline` | Respond to approval prompts |
| `/warp-test` | **Local** — open warp test UI |
| `/warp-batch` / `/warp-bulk` | Batch / bulk warp runs (`warp-bulk` is the local bulk UI) |

Examples:

```
/warp @transfer
/warp-create multiversx MyCustomWarp
/warp-test
/warp-bulk
```

## Desk commands

Session media workbench — see [Desk](/desk).

```
/desk-add <media-id>
/desk-list
/desk-sync
/desk-remove <item-id>
/desk-clear
/desk-pin <item-id>
/desk-unpin <item-id>
```

## Secrets

| Command | Purpose |
| --- | --- |
| `/secret-set` | Set a secret via the secrets flow |
| `/secret-approve` / `/secret-decline` | Approve or decline secret prompts |

## Other

| Command | Purpose |
| --- | --- |
| `/discover` | Discovery flows |
| `/adapt` | Adapt / transform flows |
| `/multi` | **Local** multi-step helper UI |
| `/swarm-proposal-activate` | Activate a swarm proposal |

There is **no** `/flow` command. Chat-based warps use `/warp` (and related) or shortcuts under [Automations](/shortcuts).

## Tips

- Test unfamiliar warps with `/warp-test` before production amounts
- Use `/warp-bulk` for many input rows
- After chain actions, agents can confirm with `check_warp_executions` over MCP

## Related

- [Desk](/desk)
- [Agents](/agents)
- [Warps](/warps/general)
- [Shortcuts](/shortcuts)
- [CLI](/cli)
- [MCP](/protocols/mcp)
