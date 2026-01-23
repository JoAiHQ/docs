# Warps Specifications

A Warp is an encoded JSON object, known as a **Blueprint**, stored onchain of the dedicated blockchain. The transaction hash acts as the unique identifier for each Warp. The [Registry](/warps/registry) can be used to assign aliases for easier sharing.

Storing the Warp on the blockchain ensures security and immutability, as its actions cannot be altered once shared.

## Where Warps Are Stored

- **MultiversX:** Warps are stored as smart contract inscriptions in the `txData` field of a transaction on the MultiversX network. The transaction hash of this transaction represents its ID and can be registered in the global Registry smart contract to assign an alias and make it accessible for others.
- **Sui:** Warps are stored as on-chain objects managed by the Warp Protocol's SUI smart contracts. The object ID serves as the Warp ID and can also be registered in the global Registry smart contract for aliasing and easier sharing.
- **EVM Chains:** Warps can be registered and stored on Ethereum, Base, Arbitrum, Polygon, and other EVM-compatible chains.

## Warp Blueprint JSON Schema

The JSON schemas for validating Blueprints are available in the [GitHub repository's schemas directory](https://github.com/JoAiHQ/warps-specs/tree/main/schemas).

The current version is **`warp:3.0.0`**.

## Warp Blueprint Structure

```json
{
  "protocol": "warp:3.0.0",
  "name": "Category: Action Name",
  "title": "User-Facing Title",
  "description": "Description for the user.",
  "chain": "ethereum",
  "bot": "AI-only instructions (hidden from user)",
  "preview": "https://example.com/preview.png",
  "vars": {},
  "actions": [],
  "output": {},
  "messages": {},
  "alerts": {},
  "next": "next-warp-id",
  "related": ["related-warp-id"]
}
```

### Required Fields

- **`protocol`**: Must be `"warp:3.0.0"`.
- **`name`**: Internal identifier, format `Category: Name` (e.g., `Token: Transfer`).
- **`title`**: Displayed to the user. Supports [localization](#internationalization).
- **`description`**: Provides details to the user. Supports localization.
- **`actions`**: Array of at least one action.

### Optional Fields

- **`chain`**: Default blockchain for actions (see [Supported Chains](#supported-chains)).
- **`bot`**: AI-only metadata (hidden from users).
- **`preview`**: URL to a preview image.
- **`vars`**: Static or dynamic variables.
- **`output`**: Result extraction mappings.
- **`messages`**: Custom success/error messages.
- **`alerts`**: Notification triggers.
- **`next`**: Warp ID or URL for next step.
- **`related`**: Array of related Warp IDs.
- **`ui`**: Custom UI identifier.

## Supported Chains

Warp Protocol v3 supports 11 blockchain networks:

| Chain | Identifier | Type |
|-------|------------|------|
| MultiversX | `multiversx` | Native |
| VibeChain | `vibechain` | MultiversX LightSpeed |
| Sui | `sui` | Native |
| Ethereum | `ethereum` | EVM |
| Base | `base` | EVM (L2) |
| Arbitrum | `arbitrum` | EVM (L2) |
| Polygon | `polygon` | EVM (L2) |
| Somnia | `somnia` | EVM |
| Fastset | `fastset` | Network |
| Solana | `solana` | Native |
| NEAR | `near` | Native |

## Actions

Actions are rendered as buttons below the Warp information. Warp Protocol v3 supports 7 action types:

### Transfer

Sends native tokens or assets to an address:

- **`type`**: `transfer`
- **`label`**: Text displayed on the action button.
- **`address`**: Recipient address.
- **`value`**: Amount of native tokens in smallest unit.
- **`transfers`**: Array of token transfers (format: `token|nonce|amount`).
- **`data`**: Additional transaction data.
- **`inputs`**: User-defined inputs.

### Smart Contract Call

Executes a smart contract function:

- **`type`**: `contract`
- **`label`**: Text displayed on the action button.
- **`address`**: Smart contract address.
- **`func`**: Function to call.
- **`args`**: Fixed set of typed arguments.
- **`value`**: Amount of native tokens to transfer.
- **`gasLimit`**: Gas limit for the transaction (required).
- **`abi`**: Function ABI signature or URL to ABI file.
- **`transfers`**: Token transfers with the call.
- **`inputs`**: User-defined inputs.

### Smart Contract Query

Fetches results from a contract view function (read-only):

- **`type`**: `query`
- **`label`**: Text displayed on the action button.
- **`address`**: Smart contract address.
- **`func`**: Function to call.
- **`args`**: Fixed set of typed arguments.
- **`abi`**: Function ABI signature or URL to ABI file.
- **`inputs`**: User-defined inputs.

### Data Collection

Collects data and sends it to an HTTP endpoint:

- **`type`**: `collect`
- **`label`**: Text displayed on the action button.
- **`destination`**: HTTP configuration:
  - **`url`**: Endpoint URL
  - **`method`**: HTTP method (`GET`, `POST`, `PUT`, `DELETE`)
  - **`headers`**: Key-value pairs of HTTP headers
- **`inputs`**: User-defined inputs which will be sent to `destination`.

### Link

Navigates to any web resource or another Warp:

- **`type`**: `link`
- **`label`**: Text displayed on the action button.
- **`url`**: URL to navigate to.

### MCP (Model Context Protocol)

Executes tools on MCP servers for AI integrations:

- **`type`**: `mcp`
- **`label`**: Text displayed on the action button.
- **`destination`**: MCP server configuration:
  - **`url`**: MCP server SSE endpoint
  - **`tool`**: Tool name to execute
  - **`headers`**: Optional authentication headers
- **`inputs`**: Tool arguments.

### Prompt

Generates text using AI/LLM models:

- **`type`**: `prompt`
- **`label`**: Text displayed on the action button.
- **`prompt`**: Prompt template with `{{variables}}`.
- **`inputs`**: Variables for the prompt.

## Common Action Properties

All action types support these optional properties:

- **`description`**: Additional context for the user.
- **`primary`**: Mark as primary action (boolean).
- **`auto`**: Auto-execute without user click (boolean).
- **`next`**: Next Warp ID after execution.
- **`when`**: Conditional expression for showing the action.

## Argument and Input Types

### Base Types

- **`string`**: Text string. Example: `string:hello`
- **`uint8`** to **`uint256`**: Unsigned integers. Example: `uint64:1234567890`
- **`biguint`**: Arbitrarily large unsigned integer.
- **`bool`**: Boolean value. Example: `bool:true`
- **`address`**: Blockchain address. Example: `address:0x...`
- **`hex`**: Hexadecimal encoded string. Example: `hex:1234`
- **`token`**: Token identifier. Example: `token:USDC-c76f1f`

### Input-Only Types

- **`nft`**: NFT selector (displays picker UI).
- **`asset`**: Generic asset selector.

### Nested Types

- **`option`**: Nullable value. `option:string:hello` or `option:string`
- **`list`**: Multiple values. `list:string:a,b,c`
- **`variadic`**: Variable arguments. `variadic:uint64:1,2,3`
- **`composite`**: Multiple types combined. `composite(string|uint64):hello|123`

## User Inputs

Inputs define how data is collected and where it's used.

### Input Properties

```json
{
  "name": "Amount",
  "as": "amount",
  "label": "Enter Amount",
  "description": "Help text",
  "bot": "AI-only hint",
  "type": "uint256",
  "position": "arg:1",
  "source": "field",
  "required": true,
  "min": 1,
  "max": 1000,
  "pattern": "^[0-9]+$",
  "patternDescription": "Must be a number",
  "options": ["100", "500", "1000"],
  "modifier": "scale:18",
  "default": "100"
}
```

### Sources

- **`field`**: User input field.
- **`query`**: URL query parameter.
- **`user:wallet`**: Connected wallet address.
- **`hidden`**: Hardcoded/internal value.

### Positions

- **`receiver`**: Recipient address.
- **`value`**: Native token amount.
- **`transfer`**: Token/asset to transfer.
- **`arg:1`** to **`arg:10`**: Contract function arguments.
- **`chain`**: Target blockchain.
- **`data`**: Transaction data.
- **`destination`**: URL/address target.

### Modifiers

- **`scale:{number}`**: Scale by decimals. `scale:18` converts `1.5` to `1500000000000000000`.
- **`scale:{fieldName}`**: Dynamic scaling from another input.

## Variables

Define variables in the `vars` field:

```json
{
  "vars": {
    "CONTRACT_ADDRESS": "0x...",
    "API_URL": "env:API_URL",
    "TOKEN_ID": "query:token"
  }
}
```

Use `{{variableName}}` anywhere in the Warp.

### Dynamic Sources

- **`query:param`**: From URL query parameter.
- **`env:VAR_NAME`**: From environment variable.

### Global Variables

- **`{{USER_WALLET}}`**: Connected wallet address.
- **`{{CHAIN_API}}`**: Chain's API URL.
- **`{{CHAIN_EXPLORER}}`**: Chain's block explorer URL.

## Bot Metadata

The `bot` field provides AI-only instructions:

```json
{
  "bot": "Help the user complete this onboarding. Ask for their name first.",
  "actions": [
    {
      "inputs": [
        {
          "name": "Name",
          "bot": "The user's full name for identification."
        }
      ]
    }
  ]
}
```

## Output & Results

Extract values from execution for use in messages and chained Warps:

```json
{
  "output": {
    "TX_HASH": "out.hash",
    "BALANCE": "out.1",
    "TOKEN_ID": "event.Transfer.3",
    "USER_ID": "out.data.id"
  }
}
```

### Resolution Paths

- **`out.N`**: Nth return value from contract/query.
- **`event.{Name}.N`**: Nth argument from named event.
- **`out.{path}`**: Nested path in HTTP response.

### Transform Results

Compute derived values:

```json
{
  "output": {
    "RAW": "out.1",
    "FORMATTED": "transform:() => { return (result.RAW / 1e18).toFixed(4) }"
  }
}
```

## Messages

Custom feedback after execution:

```json
{
  "messages": {
    "success": "Sent {{amount}} to {{recipient}}!",
    "error": "Transaction failed. Please try again.",
    "bot": "AI-only: suggest checking balance"
  }
}
```

## Alerts

Trigger notifications:

```json
{
  "alerts": {
    "payment_sent": {
      "label": "Payment Sent",
      "trigger": "on_success",
      "subject": "Payment Confirmed",
      "body": "You sent {{amount}} to {{recipient}}",
      "action": "view-history"
    }
  }
}
```

Triggers: `on_success`, `on_failure`, `on_complete`.

## Internationalization

Text fields support localization:

```json
{
  "title": {
    "en": "Send Tokens",
    "de": "Token senden",
    "es": "Enviar Tokens"
  }
}
```

Supported fields: `title`, `description`, `label`, `patternDescription`, messages.

## Next Step (Chaining)

Link Warps together:

```json
{
  "output": {
    "RAFFLE_ID": "event.Created.1"
  },
  "next": "view-raffle?id={{RAFFLE_ID}}"
}
```

Can be a Warp ID, hash (`hash:abc123`), or external URL.

---

For more examples, see the [specifications repository](https://github.com/JoAiHQ/warps-specs/tree/main/examples).

## Related Pages

- [Quickstart](/warps/quickstart) - Get started with the SDK
- [Action Types](/warps/action-types) - Detailed reference for all actions
- [MCP Actions](/warps/mcp-actions) - AI tool integrations
- [Prompt Actions](/warps/prompt-actions) - AI text generation
- [Supported Chains](/warps/chains) - All 11 networks
