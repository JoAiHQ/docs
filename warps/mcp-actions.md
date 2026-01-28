# MCP Actions

The `mcp` action type executes tools on **Model Context Protocol (MCP)** servers. This feature enables Warps to integrate directly with AI agents, external data processors, and complex off-chain logic.

## Overview

MCP is a standard protocol for AI tool execution. MCP actions allows a Warp to "call out" to an AI agent or tool server to perform a task and return data.

## Structure

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
| `destination` | object | ✅ | MCP server configuration (see below) |
| `inputs` | array | ❌ | Tool arguments mapped to inputs |
| `auto` | boolean | ❌ | Auto-execute on load |
| `next` | string | ❌ | Next Warp after execution |

### Destination Configuration

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `url` | string | ✅ | The MCP server's SSE (Server-Sent Events) endpoint. |
| `tool` | string | ✅ | The name of the tool to execute on the server. |
| `headers` | object | ❌ | HTTP headers (e.g., for authentication). |

## How It Works

1. **Connection**: The client connects to the `url` via SSE.
2. **Execution**: The client sends a JSON-RPC request to execute the specified `tool` with the provided `inputs`.
3. **Response**: The server processes the request and streams the result back.
4. **Output**: The result is captured in the Warp's `output` (if mapped) or displayed.

## Examples

### Sentiment Analysis Tool
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

### Chained Workflow (AI -> Blockchain)
1. AI analyzes market data via MCP.
2. Logic gates check the recommendation.
3. User executes a trade if recommended.

```json
{
  "protocol": "warp:3.0.0",
  "name": "AI: Analyze and Trade",
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
      "inputs": [{ "name": "Token", "source": "field" }]
    },
    {
      "type": "contract",
      "label": "Execute Trade",
      "when": "{{RECOMMENDATION}} === 'buy'",
      "address": "0xDEX...",
      "func": "swap",
      "args": ["uint256:{{AMOUNT}}"]
    }
  ]
}
```

## JoAi MCP Server Integration

You can easily spin up your own MCP server using the `@joai/warps-mcp` package to host custom tools.

```bash
npm install @joai/warps-mcp
```

This allows you to build custom TypeScript tools that your Warps can interact with securely.
