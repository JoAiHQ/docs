# Action Types Reference

Warp Protocol v3 supports 12 action types, each designed for specific use cases. This guide provides detailed specifications for each action.

## Overview

| Type | Purpose | Creates Transaction |
|------|---------|---------------------|
| `transfer` | Send tokens/assets | ✅ Yes |
| `contract` | Execute smart contract | ✅ Yes |
| `query` | Read contract state | ❌ No |
| `collect` | HTTP data collection | ❌ No |
| `compute` | Local-only transform execution | ❌ No |
| `state` | Read/write key-value store | ❌ No |
| `mount` | Activate a warp trigger in a room | ❌ No |
| `unmount` | Deactivate a warp trigger in a room | ❌ No |
| `loop` | Re-execute the warp continuously | ❌ No |
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

## Compute

The `compute` action type executes local-only JavaScript transforms. It never makes HTTP requests or blockchain calls — all logic runs client-side. Always returns `success`, making it ideal for hidden input derivation, conditional value computation, and pure data transformation steps inside a warp chain.

### Structure

```json
{
  "type": "compute",
  "label": "Calculate",
  "inputs": [
    {
      "name": "result",
      "as": "result",
      "type": "uint64",
      "source": "hidden",
      "modifier": "transform:() => Math.floor(Math.random() * 100) + 1"
    }
  ]
}
```

### Properties

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `type` | string | ✅ | Must be `"compute"` |
| `label` | WarpText | ✅ | Button/step label |
| `inputs` | WarpActionInput[] | ❌ | Hidden inputs with `transform:` modifiers to derive values |
| `description` | WarpText | ❌ | Additional context |
| `primary` | boolean | ❌ | Marks this as the primary action |
| `auto` | boolean | ❌ | Auto-execute on load |
| `next` | string | ❌ | Warp ID or URL to navigate to after success |
| `when` | string | ❌ | Conditional expression — skips this action if false |

### Key Differences from `collect`

| | `compute` | `collect` |
|--|-----------|-----------|
| Execution | Always local | Sends HTTP request if `destination` is set |
| Result status | Always `success` | `unhandled` if no destination |
| Use case | Pure transforms, derivations | Submitting data to an endpoint |

### Example: Random Number Generation

```json
{
  "type": "compute",
  "label": "Generate secret",
  "inputs": [
    {
      "name": "secret",
      "as": "secret",
      "type": "uint64",
      "source": "hidden",
      "modifier": "transform:() => Math.floor(Math.random() * 100) + 1"
    }
  ]
}
```

After execution, <span v-pre>`{{secret}}`</span> is available in all subsequent actions.

---

## State

The `state` action type reads from or writes to a persistent key-value store scoped to the current room and agent. Backed by the existing store infrastructure — no external services required.

### Structure

```json
{ "type": "state", "op": "write", "store": "game", "data": { "secret": "{{secret}}", "active": true } }
{ "type": "state", "op": "read",  "store": "game", "keys": ["secret", "active"] }
{ "type": "state", "op": "clear", "store": "game" }
```

### Properties

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `type` | string | ✅ | Must be `"state"` |
| `op` | string | ✅ | Operation: `"read"`, `"write"`, or `"clear"` |
| `store` | string | ✅ | Store namespace (e.g. `"game"`, `"quiz"`) |
| `keys` | string[] | ❌ | Keys to read (required for `op: "read"`) |
| `data` | object | ❌ | Key-value pairs to write (required for `op: "write"`) |
| `when` | string | ❌ | Conditional expression |

### Reading State

After a `read`, all keys merge into the injectable context as `state.KEY` — available as <span v-pre>`{{state.KEY}}`</span> in all subsequent actions within the same execution.

```json
{
  "type": "state",
  "op": "read",
  "store": "guessing-game",
  "keys": ["secret", "active"]
}
```

Use the values in later actions:

```json
{
  "modifier": "transform:() => parseInt('{{JOAI_MESSAGE_TEXT}}') === {{state.secret}}"
}
```

### Writing State

```json
{
  "type": "state",
  "op": "write",
  "store": "guessing-game",
  "data": { "secret": "{{secret}}", "active": true }
}
```

### Clearing State

```json
{
  "type": "state",
  "op": "clear",
  "store": "guessing-game"
}
```

---

## Mount / Unmount

The `mount` and `unmount` action types manage warp triggers in a specific room. When a warp is mounted, its `trigger` pattern is tested against every incoming message in that room — if it matches, the warp executes automatically (suppressing the LLM for that turn).

### Mount

Activates a warp's trigger in the current room:

```json
{
  "type": "mount",
  "warp": "check-guess"
}
```

### Unmount

Deactivates a previously mounted trigger:

```json
{
  "type": "unmount",
  "warp": "check-guess"
}
```

### Properties

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `type` | string | ✅ | `"mount"` or `"unmount"` |
| `warp` | string | ✅ | The warp identifier to mount/unmount |
| `when` | string | ❌ | Conditional expression |

### Trigger Declaration

The mounted warp must declare a `trigger` at the root level:

```json
{
  "protocol": "warp:3.0.0",
  "name": "check-guess",
  "trigger": { "type": "message", "pattern": "^\\d+$" },
  "actions": [...]
}
```

| Field | Type | Description |
|-------|------|-------------|
| `type` | string | `"message"` — pattern-matched against incoming message text |
| `pattern` | string | Regular expression (anchored as needed) |

### How It Works

1. `mount` stores `(room_id → warp_identifier)` in the room-scoped cache
2. On every incoming message, the system checks mounted warps for the room
3. If `trigger.pattern` matches the message text → execute the warp, skip the LLM
4. `unmount` removes the entry from the cache

Triggers only fire in rooms where `mount` was explicitly called — no background noise in other rooms.

See [Mini-Apps](/warps/mini-apps) for a complete example using `state`, `mount`, `unmount`, and `compute` together.

---

## Loop

The `loop` action type re-executes the entire warp after each iteration. It is a cortex-native action — no transaction is created. Use it for continuous polling, recurring sends, or any pattern that needs to keep running until a condition changes.

### Structure

```json
{
  "type": "loop",
  "label": "Keep sending",
  "delay": 0,
  "maxIterations": 10000
}
```

### Properties

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `type` | string | ✅ | Must be `"loop"` |
| `label` | WarpText | ✅ | Step label |
| `when` | string | ❌ | Condition evaluated before each iteration. Loop stops when falsy. Omit to run indefinitely. |
| `delay` | number | ❌ | Milliseconds to wait between iterations. Default: `0` (runs as fast as possible). |
| `maxIterations` | number | ❌ | Hard cap on total iterations as a safety stop. Default: `10000`. |

### How It Works

Each time the loop action is reached, it schedules a full re-execution of the same warp — including re-reading all state, re-evaluating all `when` conditions, and re-running all SDK actions. This means every iteration picks up the latest state.

The `when` condition is evaluated against the current output bag (including values from `state` reads and previous action outputs). When it evaluates to false, the loop stops cleanly and resets its counter — so it can restart if conditions change later.

### Example: Conditional Continuous Transfer

Send tokens on every iteration while a state flag is active. Stop when it flips to inactive.

```json
{
  "protocol": "warp:3.0.0",
  "name": "continuous-send",
  "chain": "multiversx",
  "actions": [
    {
      "type": "state",
      "label": "Load active flag",
      "op": "read",
      "store": "control",
      "keys": ["active"]
    },
    {
      "type": "transfer",
      "label": "Send EGLD",
      "address": "erd1target...",
      "value": "native:0.001",
      "when": "{{state.active}} == 1"
    },
    {
      "type": "loop",
      "label": "Repeat",
      "maxIterations": 10000
    }
  ]
}
```

Another warp (e.g. triggered by a webhook) writes `active = 0` to the same store to stop the loop on the next iteration.

### Notes

- `loop` is a **cortex-native** action — the SDK skips it automatically (`auto: false`). It only executes inside the JoAi agent runtime.
- With `delay: 0`, iterations run back-to-back as fast as the event loop allows.
- The iteration counter is scoped to `warpIdentifier + roomId`. It resets when `when` evaluates to false, allowing the loop to restart later.

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
- **Global Variables**: <span v-pre>`{{CHAIN_EXPLORER}}`</span>, <span v-pre>`{{USER_WALLET}}`</span>
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

## Inline

The `inline` action type executes another Warp as a sub-action within the current flow. The sub-warp runs its full action chain, and its outputs are available to subsequent actions.

This enables composition — you can chain generic warps together without duplicating logic.

### Structure

```json
{
  "type": "inline",
  "label": "Create Contact",
  "warp": "@joai/contact-create",
  "when": "{{hours}} > 0"
}
```

### Properties

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `warp` | string | ✅ | Identifier of the warp to execute |
| `output` | object | ❌ | Map sub-warp outputs to named variables (see below) |
| `when` | string | ❌ | Conditional expression to skip this action |
| `silent` | boolean | ❌ | Suppress WARP_VIEW events for this action |

### Output Mapping

Use the `output` field to extract values from the sub-warp's execution result and make them available to subsequent actions via `{{variable}}` placeholders.

```json
{
  "type": "inline",
  "warp": "@joai/service-create?name=Hourly%20Rate&price={{hourlyRate}}",
  "when": "hourlyRate !== '0'",
  "output": {
    "newServiceId": "out.id",
    "serviceName": "out.name"
  }
}
```

The path follows the same resolution rules as the warp-level [`output`](/warps/outputs) field — `out.data.id` traverses the sub-warp's response.

### Append to Array (`append:`)

To add the resolved value to an existing array instead of replacing it, prefix the path with `append:`.

```json
{
  "type": "inline",
  "warp": "@joai/service-create?name=Hourly%20Rate&price={{hourlyRate}}",
  "when": "hourlyRate !== '0'",
  "output": {
    "serviceIds": "append:out.id"
  }
}
```

When the `when` condition is `false` (the action is skipped), no output mapping occurs and the existing variable stays untouched.

### Passing Inputs

Query parameters in the `warp` identifier are passed as inputs to the sub-warp. Template variables in query values are resolved from the parent warp's accumulated outputs.

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
