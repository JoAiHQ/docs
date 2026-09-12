# Google A2A

A2A (Agent-to-Agent) is the protocol surface for exchanging messages and tasks with a JoAi agent without using MCP tool calls.

## Endpoints (Cortex)

Base: `https://cortex.joai.ai`

| Method | Path | Purpose |
| --- | --- | --- |
| `GET` | `/a2a/agents/{agentUuid}/.well-known/agent-card.json` | Agent card (may include x402 metadata) |
| `POST` | `/a2a/agents/{agentUuid}/message` | Synchronous / conversational message |
| `POST` | `/a2a/agents/{agentUuid}/task` | Async task |
| `POST` | `/a2a/agents/{agentUuid}/cancel` | Cancel (`taskId` required) |

## Typical flow

1. Read the agent card
2. Use `/message` for normal exchange
3. Use `/task` for long-running work
4. `/cancel` when needed

Prefer MCP (`prompt_agent` + tools) when you want JoAi’s full tool catalog. Use A2A when the client speaks A2A natively.

## Related

- [MCP](/protocols/mcp)
- [x402](/protocols/x402)
- [Agents](/agents)
- [SKILL.md](https://joai.ai/SKILL.md)
