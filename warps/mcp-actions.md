# MCP Actions

MCP (Model Context Protocol) actions execute tools on MCP servers, enabling AI tool integrations in Warps.

## Overview

MCP is a standard protocol for AI tool execution. MCP actions allow Warps to:

- Execute AI analysis and generation tools
- Integrate with external AI services
- Orchestrate multi-step AI workflows
- Connect to any MCP-compatible server

## Basic Structure

```json
{
  "type": "mcp",
  "label": "Run Tool",
  "destination": {
    "url": "https://mcp.example.com/sse",
    "tool": "tool_name",
    "headers": {
      "Authorization": "Bearer {{API_KEY}}"
    }
  },
  "inputs": [
    {
      "name": "Input",
      "as": "input",
      "type": "string",
      "source": "field"
    }
  ]
}
```

## Properties

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `type` | string | ✅ | Must be `"mcp"` |
| `label` | WarpText | ✅ | Button text |
| `destination` | object | ❌ | MCP server configuration |
| `inputs` | array | ❌ | Tool arguments |
| `auto` | boolean | ❌ | Auto-execute |
| `next` | string | ❌ | Next Warp after execution |

### Destination Object

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `url` | string | ✅ | MCP server SSE endpoint |
| `tool` | string | ✅ | Tool name to execute |
| `headers` | object | ❌ | HTTP headers for authentication |

## Examples

### Simple Tool Call

```json
{
  "type": "mcp",
  "label": "Analyze Sentiment",
  "destination": {
    "url": "https://mcp.example.com/sse",
    "tool": "analyze_sentiment"
  },
  "inputs": [
    {
      "name": "Text",
      "as": "text",
      "type": "string",
      "source": "field",
      "required": true
    }
  ]
}
```

### JoAi MCP Integration

```json
{
  "protocol": "warp:3.0.0",
  "name": "AI: Create Warp",
  "title": "AI Warp Generator",
  "description": "Generate a Warp using AI.",
  "vars": {
    "MCP_URL": "env:MCP_URL",
    "MCP_TOKEN": "env:MCP_TOKEN"
  },
  "actions": [
    {
      "type": "mcp",
      "label": "Generate",
      "destination": {
        "url": "{{MCP_URL}}",
        "tool": "create_warp",
        "headers": {
          "Authorization": "Bearer {{MCP_TOKEN}}"
        }
      },
      "inputs": [
        {
          "name": "Description",
          "as": "description",
          "type": "string",
          "source": "field",
          "required": true,
          "description": "Describe the Warp you want to create"
        }
      ]
    }
  ]
}
```

### Chained MCP + Contract

```json
{
  "protocol": "warp:3.0.0",
  "name": "AI: Analyze and Trade",
  "title": "Smart Trading",
  "description": "AI analyzes, you trade.",
  "output": {
    "RECOMMENDATION": "out.recommendation",
    "AMOUNT": "out.suggestedAmount"
  },
  "actions": [
    {
      "type": "mcp",
      "label": "Analyze Market",
      "auto": true,
      "destination": {
        "url": "https://mcp.example.com/sse",
        "tool": "analyze_market"
      },
      "inputs": [
        {
          "name": "Token",
          "as": "token",
          "type": "string",
          "source": "field",
          "required": true
        }
      ]
    },
    {
      "type": "contract",
      "label": "Execute Trade",
      "when": "{{RECOMMENDATION}} === 'buy'",
      "address": "0xDEX...",
      "func": "swap",
      "gasLimit": 300000,
      "args": ["address:{{token}}", "uint256:{{AMOUNT}}"]
    }
  ]
}
```

## Setting Up MCP Servers

### JoAi MCP Server

Install the JoAi MCP package:

```bash
npm install @joai/warps-mcp
```

Run the server:

```typescript
import { WarpMcpServer } from '@joai/warps-mcp'

const server = new WarpMcpServer({
  config: warpConfig,
  tools: [/* your tools */]
})

server.listen(3000)
```

### Compatible Tools

MCP actions work with any MCP-compatible server:

- JoAi MCP Server (`@joai/warps-mcp`)
- Claude MCP integration
- ChatGPT plugins
- Custom MCP implementations

## Use Cases

- **Market Analysis**: Get AI insights before trading
- **Content Generation**: Create text, images, code
- **Data Processing**: Transform and analyze data
- **Automation**: Trigger complex AI workflows
- **Multi-Agent Systems**: Coordinate AI agents

## Best Practices

1. **Secure your endpoints**: Use authentication headers
2. **Handle errors gracefully**: MCP calls can fail
3. **Use environment variables**: Never hardcode tokens
4. **Set reasonable timeouts**: MCP calls may take time
5. **Validate outputs**: Verify AI responses before use

---

For general action documentation, see [Action Types](/warps/action-types).
