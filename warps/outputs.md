# Output & Results

The `output` field allows you to extract values from Warp execution (smart contract returns, events, or API responses) and use them in messages, chained Warps, or logic transforms.

## Basic Structure

```json
{
  "output": {
    "RESULT_NAME": "resolution.path"
  }
}
```

## Resolution Paths

### Contract & Query Returns (`out.N`)
Extracts the Nth return value from a function call.
- `out.1`: First return value.
- `out.2`: Second return value.

```json
{
  "output": {
    "BALANCE": "out.1"
  }
}
```

### Event Data (`event.Name.N`)
Extracts arguments from emitted blockchain events.
- Format: `event.{EventName}.{ArgumentIndex}`

```json
{
  "output": {
    "TOKEN_ID": "event.Transfer.3",
    "FROM": "event.Transfer.1"
  }
}
```

### API Responses (`out.path`)
For `collect` actions, traverse the JSON response object.

```json
{
  "output": {
    "USER_ID": "out.data.id",
    "PRICE": "out.market_data.current_price.usd"
  }
}
```

## Transforms

You can compute derived values using JavaScript. Transforms run in a sandboxed environment.

### Syntax
`transform:() => { ... }`

### Accessing Previous Results
The `result` object contains all previously resolved outputs.

```json
{
  "output": {
    "RAW_BALANCE": "out.1",
    "FORMATTED": "transform:() => { return (result.RAW_BALANCE / 1e18).toFixed(2) }",
    "IS_ELIGIBLE": "transform:() => { return result.RAW_BALANCE > 100 ? 'Yes' : 'No' }"
  }
}
```

### Transform Rules
- **Order Matters**: Transforms execute sequentially. You can rely on values defined earlier in the object.
- **Synchronous**: Functions must be synchronous.
- **Sandboxed**: No access to `window`, `document`, or external APIs.

## Using Outputs

### In Messages
```json
{
  "messages": {
    "success": "Balance: {{FORMATTED}} Tokens"
  }
}
```

### In Chained Warps (Next URL)
Pass results as query parameters to the next Warp.
```json
{
  "next": "view-profile?id={{USER_ID}}"
}
```
