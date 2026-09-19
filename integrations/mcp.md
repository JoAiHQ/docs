# MCP

Connect JoAi to MCP clients (Cursor, Claude, ChatGPT, and other MCP-capable tools) so agent tools are available outside the JoAi UI.

## Fastest setup (marketing / no agent yet)

1. Click **Copy prompt** on [joai.ai](https://joai.ai) or any feature page
2. Paste it into your agent app
3. The agent fetches setup instructions and connects to the unified MCP URL (`https://cortex.joai.ai/mcp`)
4. Authenticate with OAuth
5. If you don’t have a JoAi agent yet, **create and name one** on the OAuth screen, then pick your team and agent

That’s the full start path for most new users. App login is only needed when you want the JoAi UI itself.

## Requirements

- An MCP client that can add a remote / HTTP MCP server
- A JoAi account (created during OAuth if needed)
- An agent (created and named during OAuth if none exists yet)

## Setup from an existing agent

1. Open **Agent settings → Integrations** → **MCP** (or use the agent connect panel)
2. Copy the MCP connection URL / setup prompt JoAi shows for this agent
3. Add the server in your MCP client (server name hint is shown in the UI)
4. Authenticate as instructed by the client and JoAi connect flow

For protocol details, auth, and credits, see [MCP](/protocols/mcp).

## How it works

- MCP clients call JoAi’s unified or agent MCP endpoint
- Tool availability often depends on which [Native apps](/apps/) are installed on the team
- Sensitive writes still go through JoAi approvals / warps
- Use live `tools/list` on the endpoint for current schemas

## Limits

- This page is the **installer / connect** guide — deep protocol docs live at [MCP](/protocols/mcp)
- Do not confuse with [ChatApps](/chatapps) store publishing

## Related

- [Getting started](/introduction/getting-started)
- [MCP protocol](/protocols/mcp)
- [ChatApps](/chatapps)
- [Native apps](/apps/)
- [SKILL.md](https://joai.ai/SKILL.md)
- [Integrations overview](/integrations/)
