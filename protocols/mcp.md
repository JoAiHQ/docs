# MCP

MCP (Model Context Protocol) connects JoAi agents to Cursor, Claude, ChatGPT, and other MCP clients. Tools are gated by installed [native apps](/apps/) plus core agent tooling.

## Endpoints

| Endpoint | Use |
| --- | --- |
| `https://cortex.joai.ai/mcp` | Unified MCP (OAuth; optional `?agent={uuid}` prefill) |
| `https://cortex.joai.ai/mcp/agents/{agentUuid}` | Agent-scoped (OAuth; `prompt_agent` may be [x402](/protocols/x402)-gated) |
| `https://cortex.joai.ai/mcp/apps/{appSlug}` | App / brand MCP |

Discover OAuth: `GET https://cortex.joai.ai/.well-known/oauth-authorization-server`

Full machine contract: [SKILL.md](https://joai.ai/SKILL.md).

## Two MCP ideas

1. **Agent MCP** — unified tool catalog for a team agent (this page)
2. **Dynamic MCP per Warp** — Warps/ChatApps can expose MCP servers for publishing into ChatGPT etc. — see [ChatApps](/chatapps)

## Core tools

Always useful (confirm with `tools/list`):

| Tool | Purpose |
| --- | --- |
| `prompt_agent` | Chat / instruct the agent (room-aware) |
| `joai_agent_info` / `joai_list_agents` | Agent metadata |
| `list_public_teams` | Public teams |
| `ingest_knowledge` | Queue ingestion |

## Team admin tools

`create_team`, `update_team`, `update_team_place`, `update_team_settings`

## Agent tooling (examples)

| Area | Tools |
| --- | --- |
| Studio | `studio_send`, `studio_produce`, `studio_wait`, `studio_export` |
| Memories | `create_memory`, `update_memory`, `search_memories` |
| Skills | `list_skills`, `create_skill`, `update_skill`, `delete_skill` |
| Documents / media | `list_documents`, `create_document`, … · `media_list`, `media_upload`, `media_delete` |
| Private warps / apps | `list_private_warps`, `create_private_warp`, … · `create_private_app` |
| Rooms | `list_rooms`, `get_room_messages` |
| Secrets | `secret_list`, `secret_status`, `secret_set`, `secret_clear` (keys/status only — never values) |
| Misc | `execute`, `search`, `character_update`, `create_api_token`, `check_warp_executions` |

Native-app tools (Board, Shop, Contacts, Forms, …) are documented on each [native app](/apps/) page.

## Rooms

Create/reuse durable MCP rooms:

`POST https://api.joai.ai/mcp/rooms`

Pass `room` into `prompt_agent`. Stream: `GET https://cortex.joai.ai/agents/stream/{roomId}?key={secKey}`

Manage rooms in product under **Agent settings → Rooms**.

## Credits & usage

MCP tool calls consume **credits** from your plan. See [Billing](/billing).

### Credit cost per call

| Call Type | Credits |
|-----------|---------|
| Read (query, data fetch) | 1 credit |
| Write (transfer, contract interaction) | 2 credits |

### Plan allowances

| Plan | MCP Credits / month |
|------|---------------------|
| Free | 50 |
| Starter | higher |
| Pro / Business | higher |

Exact numbers appear in-app under Usage & Billing. Credits reset each billing cycle.

## Related

- [MCP integration](/integrations/mcp) — connect from Agent settings
- [Agents](/agents)
- [Native apps](/apps/)
- [Billing](/billing)
- [x402](/protocols/x402)
- [Google A2A](/protocols/google-a2a)
- [ChatApps](/chatapps)
- [API](/api)
- [Integrations](/integrations/)
- [SKILL.md](https://joai.ai/SKILL.md)
