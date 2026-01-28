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
| `{{USER_WALLET}}` | The currently connected wallet address. |
| `{{CHAIN_API}}` | The API URL for the current chain. |
| `{{CHAIN_EXPLORER}}` | The block explorer URL for the current chain. |

## Using Variables (Interpolation)

Use the mustache syntax `{{variableName}}` to inject values.

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
