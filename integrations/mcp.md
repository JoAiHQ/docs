# MCP

Connect this JoAi agent to MCP clients (Cursor, Claude, ChatGPT, and other MCP-capable tools) so the agent’s tools are available outside the JoAi UI.

## Requirements

- An active JoAi agent
- An MCP client that can add a remote / HTTP MCP server

## Setup

1. Open **Agent settings → Integrations** → **MCP** (or use the agent connect panel)
2. Copy the MCP connection URL / setup prompt JoAi shows for this agent
3. Add the server in your MCP client (server name hint is shown in the UI)
4. Authenticate as instructed by the client and JoAi connect flow

For protocol details, auth, and credits, see [MCP](/protocols/mcp).

## How it works

- MCP clients call JoAi’s agent MCP endpoint
- Tool availability often depends on which [Native apps](/apps/) are installed on the team
- Use live `tools/list` on the agent endpoint for current schemas

## Limits

- This page is the **installer / connect** guide — deep protocol docs live at [MCP](/protocols/mcp)
- Do not confuse with [ChatApps](/chatapps) store publishing

## Related

- [MCP protocol](/protocols/mcp)
- [ChatApps](/chatapps)
- [Native apps](/apps/)
- [SKILL.md](https://joai.ai/SKILL.md)
- [Integrations overview](/integrations/)
