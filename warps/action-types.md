# Action Types Reference

Warp Protocol v3 supports 7 action types, each designed for specific use cases. This guide provides detailed specifications for each action.

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

---

## Transfer

The `transfer` action type sends native tokens, ERC20/SPL tokens, or NFTs to an address.

### Structure

```json
{
  "type": "transfer",
  "label": "Send Funds",
  "address": "0xRecipientAddress...",
  "value": "1000000000000000000"
}
```

### Properties

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `type` | string | ✅ | Must be `"transfer"` |
| `label` | WarpText | ✅ | Button text |
| `address` | string | ❌ | Recipient address (can use input) |
| `value` | string | ❌ | Native token amount in smallest unit (wei/lamports) |
| `transfers` | string[] | ❌ | Token transfers (format: `token\|nonce\|amount`) |
| `data` | string | ❌ | Additional transaction data |
| `inputs` | WarpActionInput[] | ❌ | User inputs |

### Chain-Specific Notes

- **EVM Chains (Ethereum, Base, etc.)**: 
  - `value` is in **wei** (18 decimals).
  - ERC20 tokens usually require a `contract` action (calling `transfer`), unless the chain supports native token transfers in the protocol layer.
- **MultiversX**: 
  - `value` is in **wei** (18 decimals for EGLD).
  - Use `transfers` array for ESDT/NFTs: `["TOKEN-ID|nonce|amount"]`. Nonce is `0` for fungible tokens.
- **Solana**:
  - `value` is in **lamports** (9 decimals).
- **Sui**:
  - `value` is in **MIST** (9 decimals).

---

## Contract

The `contract` action type executes smart contract functions on the blockchain.

### Structure

```json
{
  "type": "contract",
  "label": "Execute",
  "address": "0xContractAddress...",
  "func": "functionName",
  "gasLimit": 100000
}
```

### Properties

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `type` | string | ✅ | Must be `"contract"` |
| `label` | WarpText | ✅ | Button text |
| `gasLimit` | number | ✅ | Gas limit for transaction |
| `address` | string | ❌ | Contract address |
| `func` | string | ❌ | Function name to call |
| `args` | string[] | ❌ | Fixed typed arguments (e.g. `["uint256:100"]`) |
| `value` | string | ❌ | Native token amount to send with call |
| `transfers` | string[] | ❌ | Token transfers with call (MultiversX) |
| `abi` | string | ❌ | Function ABI signature (EVM) or URL |
| `inputs` | WarpActionInput[] | ❌ | User inputs mapped to arguments |

### Argument Types

Arguments in `args` and input `type` must use the typed format `type:value`.

**Basic Types:**
| Type | Example | Description |
|------|---------|-------------|
| `string` | `string:hello` | Text string |
| `uint256` | `uint256:1000` | Unsigned integer (8-256 bits) |
| `bool` | `bool:true` | Boolean |
| `address` | `address:0x...` | Blockchain address |
| `bytes` | `hex:1234ab` | Hex encoded bytes |
| `token` | `token:USDC-123` | Token Identifier |

**Advanced Types:**
| Type | Syntax | Example | Description |
|------|--------|---------|-------------|
| **Option** | `option:type:val` | `option:u64:123` | Nullable value. Use `option:type` for null. |
| **List** | `list:type:val,val` | `list:u8:1,2,3` | Array of values. |
| **Variadic** | `variadic:type:val` | `variadic:u64:1,2` | Variable arguments (last arg). |
| **Composite** | `composite(t1|t2):v1|v2` | `composite(u8|u8):1|2` | Complex/Struct types. |

---

## Query

The `query` action type reads data from smart contracts without creating a transaction.

### Structure

```json
{
  "type": "query",
  "label": "Check Balance",
  "address": "0xContractAddress...",
  "func": "balanceOf"
}
```

### Properties

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `type` | string | ✅ | Must be `"query"` |
| `label` | WarpText | ✅ | Button text |
| `address` | string | ❌ | Contract address |
| `func` | string | ❌ | View function name |
| `args` | string[] | ❌ | Fixed typed arguments |
| `abi` | string | ❌ | Function ABI signature |
| `auto` | boolean | ❌ | Auto-execute on load |

### Output Mapping

Query results are captured in the root `output` object.

```json
{
  "output": {
    "BALANCE": "out.1"
  }
}
```

---

## Collect

The `collect` action type sends HTTP requests to external endpoints.

### Structure

```json
{
  "type": "collect",
  "label": "Submit Form",
  "destination": {
    "url": "https://api.example.com/submit",
    "method": "POST"
  }
}
```

### Properties

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `type` | string | ✅ | Must be `"collect"` |
| `label` | WarpText | ✅ | Button text |
| `destination` | object | ❌ | HTTP config (url, method, headers) |
| `inputs` | WarpActionInput[] | ❌ | User inputs (sent as body or query params) |

### Destination Config

```json
{
  "destination": {
    "url": "https://api.example.com/endpoint",
    "method": "POST",
    "headers": {
      "Authorization": "Bearer {{API_KEY}}",
      "Content-Type": "application/json"
    }
  }
}
```

---

## Link

The `link` action type navigates to an external URL or another Warp.

### Structure

```json
{
  "type": "link",
  "label": "Learn More",
  "url": "https://example.com"
}
```

### Properties

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `type` | string | ✅ | Must be `"link"` |
| `label` | WarpText | ✅ | Button text |
| `url` | string | ✅ | Target URL |

### URL Patterns
- **Global Variables**: `{{CHAIN_EXPLORER}}`, `{{USER_WALLET}}`
- **Warp Links**: `https://usewarp.to/alias`

---

## MCP

The `mcp` action type executes tools on Model Context Protocol servers.

### Structure

```json
{
  "type": "mcp",
  "label": "Run Tool",
  "destination": {
    "url": "http://localhost:3000/sse",
    "tool": "my_tool"
  }
}
```

See [MCP Actions](/warps/mcp-actions) for full details.

---

## Prompt

The `prompt` action type generates text using AI/LLM models.

### Structure

```json
{
  "type": "prompt",
  "label": "Generate",
  "prompt": "Write a story about {{topic}}."
}
```

See [Prompt Actions](/warps/prompt-actions) for full details.

---

## Common Action Properties

All actions support these properties:

| Property | Type | Description |
|----------|------|-------------|
| `description` | WarpText | Additional context displayed to user |
| `primary` | boolean | Highlights the action as the main call-to-action |
| `auto` | boolean | Executes automatically when the Warp loads |
| `next` | string | Warp ID or URL to navigate to after success |
| `when` | string | Conditional expression (e.g. `{{VAL}} > 0`) |
