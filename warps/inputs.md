# Inputs

Inputs are the mechanism by which Warps collect data from users, the environment, or the URL to execute actions.

## Input Structure

```json
{
  "name": "Amount",
  "as": "amount",
  "label": "Enter Amount",
  "description": "The amount to transfer",
  "bot": "AI-only hint for this input",
  "type": "uint256",
  "position": "arg:1",
  "source": "field",
  "required": true,
  "min": 1,
  "max": 1000000,
  "pattern": "^[0-9]+$",
  "patternDescription": "Must be a positive number",
  "options": ["100", "500", "1000"],
  "modifier": "scale:18",
  "default": "100"
}
```

## Properties

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `name` | string | ✅ | Display name / query param key |
| `type` | string | ✅ | Data type (see below) |
| `source` | string | ✅ | Where value comes from |
| `as` | string | ❌ | Variable name for interpolation |
| `label` | WarpText | ❌ | Localized label |
| `description` | WarpText | ❌ | Help text |
| `bot` | string | ❌ | AI-only context |
| `position` | string | ❌ | Where value is used in the action |
| `required` | boolean | ❌ | Mandatory field |
| `min` | number | ❌ | Minimum value (numbers) or length (strings) |
| `max` | number | ❌ | Maximum value (numbers) or length (strings) |
| `pattern` | string | ❌ | Regex validation pattern |
| `patternDescription` | WarpText | ❌ | Error message for pattern mismatch |
| `options` | array/object | ❌ | Dropdown options |
| `modifier` | string | ❌ | Value transformation |
| `default` | any | ❌ | Default value |

## Sources

### `field`
Renders a form field for user input.
```json
{ "source": "field", "label": "Your Name" }
```

### `query`
Reads from the URL query parameters.
```json
// URL: ?token=USDC
{ "name": "token", "source": "query" }
```

### `user:wallet`
Auto-fills with the connected user's wallet address.
```json
{ "name": "sender", "type": "address", "source": "user:wallet" }
```

### `hidden`
A hardcoded internal value, not shown to the user.
```json
{ "name": "version", "source": "hidden", "default": "1.0.0" }
```

## Input Types

### Base Types
- **`string`**: Plain text.
- **`uint8`** - **`uint256`**: Unsigned integers.
- **`biguint`**: Arbitrary precision integers.
- **`bool`**: `true` or `false`.
- **`address`**: Blockchain specific address format.
- **`hex`**: Hexadecimal string data.
- **`token`**: Token identifier (e.g., `USDC-123`).

### Special UI Types
- **`nft`**: Renders an NFT picker.
- **`asset`**: Renders a generic asset/token selector.

## Positions

Positions dictate where the input value is applied in the action.

### Transaction Positions
- **`receiver`**: The recipient of a transfer.
- **`value`**: The amount of native currency to send.
- **`transfer`**: The token/asset object to transfer.
- **`data`**: The transaction data payload.
- **`chain`**: The target blockchain identifier.

### Contract Arguments
- **`arg:1`** ... **`arg:10`**: Maps to the Nth argument of the function call.

### Object Positions
For complex inputs like assets, you can map fields to multiple arguments:
```json
{
  "position": {
    "token": "arg:1",
    "amount": "arg:2"
  }
}
```

## Validation & Options

### Pattern (Regex)
```json
{
  "pattern": "^[A-Z]+-[a-f0-9]{6}$",
  "patternDescription": "Must be a valid token ID"
}
```

### Options
**Simple Array**:
```json
{ "options": ["1 day", "1 week"] }
```

**Labeled Object**:
```json
{
  "options": {
    "ethereum": "Ethereum Mainnet",
    "base": "Base Network"
  }
}
```

## Modifiers

Modifiers transform the value **after** collection but **before** execution.

### Scale
Multiplies the number by `10^decimals`.
```json
// Input: 1.5 -> Output: 1500000000000000000
{ "modifier": "scale:18" }
```

**Dynamic Scale**:
Reference another input variable for the decimals.
```json
{ "modifier": "scale:{{decimals}}" }
```

### Transform (JS)
Execute simple JavaScript to transform the value.
```json
{ "modifier": "transform:(value) => value.toUpperCase()" }
```
