# Variables

Variables enable dynamic values in Warps, allowing you to pass data between actions, from URLs, or from the environment.

## Defining Variables

Variables are defined in the root-level `vars` object.

```json
{
  "vars": {
    "CONTRACT_ADDRESS": "0x1234...",
    "DEFAULT_AMOUNT": "1000000000000000000"
  }
}
```

## Variable Sources

### Static Values
Hardcoded strings or numbers.
```json
"TOKEN_NAME": "USDC"
```

### URL Query Parameters (`query:`)
Extracts values from the Warp URL.
```json
// URL: usewarp.to/send?recipient=0x123
"RECIPIENT": "query:recipient"
```

### Environment Variables (`env:`)
Resolves variables from the client's environment (e.g., API keys).
**Note:** These are resolved at execution time by the client application.
```json
"API_KEY": "env:WARP_API_KEY"
```

### Input Variables (`as`)
When you define an input with the `as` property, it becomes a variable available for subsequent use.
```json
{
  "name": "Amount",
  "as": "userAmount",
  "type": "uint256"
}
```

## Global Variables

These are pre-defined and available in all Warps without declaration:

| Variable | Description |
|----------|-------------|
| <span v-pre>`{{USER_WALLET}}`</span> | The currently connected wallet address. |
| <span v-pre>`{{CHAIN_API}}`</span> | The API URL for the current chain. |
| <span v-pre>`{{CHAIN_EXPLORER}}`</span> | The block explorer URL for the current chain. |

## Agent Context Variables

When a warp runs inside a JoAi agent (web PWA or social integration), these additional variables are injected automatically:

| Variable | Description |
|----------|-------------|
| <span v-pre>`{{JOAI_MESSAGE_TEXT}}`</span> | The raw text of the message that triggered execution. |
| <span v-pre>`{{JOAI_SENDER_NAME}}`</span> | Display name of the user who sent the message. |
| <span v-pre>`{{JOAI_SENDER_ID}}`</span> | Unique identifier of the sender. |
| <span v-pre>`{{JOAI_ROOM_ID}}`</span> | The room/conversation where execution is taking place. |
| <span v-pre>`{{JOAI_AGENT_UUID}}`</span> | UUID of the current agent. |

These are especially useful in [`compute`](/warps/action-types#compute) and [`state`](/warps/action-types#state) actions:

```json
{
  "type": "compute",
  "label": "Evaluate guess",
  "inputs": [
    {
      "name": "correct",
      "type": "bool",
      "source": "hidden",
      "modifier": "transform:() => parseInt('{{JOAI_MESSAGE_TEXT}}') === {{state.secret}}"
    }
  ]
}
```

## State Variables

After a [`state` read action](/warps/action-types#state), the retrieved keys become available as `state.KEY`:

| Variable | Description |
|----------|-------------|
| <span v-pre>`{{state.KEY}}`</span> | Value for `KEY` from the most recent `state` read in this execution. |

```json
{ "type": "state", "op": "read", "store": "game", "keys": ["secret", "active"] }
```

Then use <span v-pre>`{{state.secret}}`</span> and <span v-pre>`{{state.active}}`</span> in subsequent actions.

## Using Variables (Interpolation)

Use the mustache syntax <span v-pre>`{{variableName}}`</span> to inject values.

### Valid Locations
You can use variables in:
- `title` and `description`
- Action `label`, `description`, and `address`
- Contract `args` and `inputs` default values
- HTTP `destination` URLs and headers
- Prompt action text
- `next` URL strings
- `messages` content

### Example: Dynamic Contract Call

```json
{
  "vars": {
    "TOKEN": "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48"
  },
  "actions": [
    {
      "type": "contract",
      "label": "Approve {{TOKEN}}",
      "address": "{{TOKEN}}",
      "func": "approve",
      "args": ["address:{{USER_WALLET}}", "uint256:{{MAX_AMOUNT}}"]
    }
  ]
}
```

## Variable Scope

1. **Root Scope**: Variables in `vars` are available everywhere.
2. **Input Scope**: Variables defined by `as` in inputs are available **after** that input is collected (in the same action or subsequent ones).
3. **Output Scope**: Results defined in `output` are available in `messages`, `next`, or `alerts`.
