# Action Types Reference

Warp Protocol v3 supports 7 action types, each designed for specific use cases.

## Overview

| Type | Purpose | Creates Transaction |
|------|---------|---------------------|
| `transfer` | Send tokens/assets | ✅ Yes |
| `contract` | Execute smart contract | ✅ Yes |
| `query` | Read contract state | ❌ No |
| `collect` | HTTP data collection | ❌ No |
| `link` | Navigate to URL | ❌ No |
| `mcp` | Execute MCP tools | ❌ No |
| `prompt` | AI text generation | ❌ No |

## Transfer

Send native tokens or assets to an address.

```json
{
  "type": "transfer",
  "label": "Send Tokens",
  "address": "0xRecipient...",
  "value": "1000000000000000000",
  "transfers": ["TOKEN-abc123|0|1000000"]
}
```

**Key Properties:**
- `address` - Recipient address
- `value` - Native token amount (in smallest unit)
- `transfers` - Token transfers (format: `token|nonce|amount`)
- `data` - Additional transaction data

## Contract

Execute a smart contract function.

```json
{
  "type": "contract",
  "label": "Stake",
  "abi": "function stake(uint256 amount)",
  "address": "0xContract...",
  "func": "stake",
  "gasLimit": 200000,
  "args": ["uint256:1000000000000000000"]
}
```

**Key Properties:**
- `address` - Contract address
- `func` - Function name
- `args` - Typed function arguments
- `gasLimit` - Gas limit (required)
- `abi` - Function signature or ABI URL
- `value` - Native token to send with call
- `transfers` - Tokens to transfer with call

## Query

Read data from a contract (no transaction).

```json
{
  "type": "query",
  "label": "Check Balance",
  "abi": "function balanceOf(address) view returns (uint256)",
  "address": "0xToken...",
  "func": "balanceOf",
  "args": ["address:{{USER_WALLET}}"],
  "auto": true
}
```

**Key Properties:**
- `address` - Contract address
- `func` - View function name
- `args` - Typed function arguments
- `abi` - Function signature or ABI URL
- `auto` - Auto-execute on load

## Collect

Send data to an HTTP endpoint.

```json
{
  "type": "collect",
  "label": "Submit",
  "destination": {
    "url": "https://api.example.com/submit",
    "method": "POST",
    "headers": {
      "Authorization": "Bearer {{API_KEY}}"
    }
  },
  "inputs": [
    {
      "name": "Email",
      "as": "email",
      "type": "string",
      "source": "field",
      "required": true
    }
  ]
}
```

**Key Properties:**
- `destination.url` - Endpoint URL
- `destination.method` - HTTP method (GET, POST, PUT, DELETE)
- `destination.headers` - HTTP headers

## Link

Navigate to a URL or another Warp.

```json
{
  "type": "link",
  "label": "View Documentation",
  "url": "https://docs.joai.ai"
}
```

**Key Properties:**
- `url` - Target URL (supports `{{variables}}`)

## MCP (Model Context Protocol)

Execute tools on MCP servers for AI integrations.

```json
{
  "type": "mcp",
  "label": "Analyze",
  "destination": {
    "url": "https://mcp.example.com/sse",
    "tool": "analyze_sentiment",
    "headers": {
      "Authorization": "Bearer {{MCP_TOKEN}}"
    }
  },
  "inputs": [
    {
      "name": "Text",
      "as": "text",
      "type": "string",
      "source": "field"
    }
  ]
}
```

**Key Properties:**
- `destination.url` - MCP server SSE endpoint
- `destination.tool` - Tool name to execute
- `destination.headers` - Authentication headers

See [MCP Actions](/warps/mcp-actions) for detailed documentation.

## Prompt

Generate text using AI/LLM models.

```json
{
  "type": "prompt",
  "label": "Generate",
  "prompt": "Write a {{style}} story about {{topic}}.",
  "inputs": [
    {
      "name": "Topic",
      "as": "topic",
      "type": "string",
      "source": "field",
      "required": true
    },
    {
      "name": "Style",
      "as": "style",
      "type": "string",
      "source": "field",
      "options": ["funny", "dramatic", "mysterious"]
    }
  ]
}
```

**Key Properties:**
- `prompt` - Prompt template with `{{variables}}`

See [Prompt Actions](/warps/prompt-actions) for detailed documentation.

## Common Properties

All action types support:

| Property | Type | Description |
|----------|------|-------------|
| `type` | string | Action type (required) |
| `label` | WarpText | Button text (required) |
| `description` | WarpText | Additional context |
| `inputs` | array | User inputs |
| `primary` | boolean | Primary action styling |
| `auto` | boolean | Auto-execute |
| `next` | string | Next Warp after execution |
| `when` | string | Conditional expression |

---

For complete specifications, see [Specifications](/warps/specifications).
