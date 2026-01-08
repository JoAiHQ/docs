# Warps Specifications

A Warp is an encoded JSON object, known as a **Blueprint**, stored onchain of the dedicated blockchain. The transaction hash acts as the unique identifier for each Warp. The [Registry](/warps/registry) can be used to assign aliases for easier sharing.

Storing the Warp on the blockchain ensures security and immutability, as its actions cannot be altered once shared.

## Where Warps Are Stored

- **MultiversX:** Warps are stored as smart contract inscriptions in the `txData` field of a transaction on the MultiversX network. The transaction hash of this transaction represents its ID and can be registered in the global Registry smart contract to assign an alias and make it accessible for others.
- **Sui:** Warps are stored as on-chain objects managed by the Warp Protocol's SUI smart contracts. The object ID serves as the Warp ID and can also be registered in the global Registry smart contract for aliasing and easier sharing.

## Warp Blueprint JSON Schema

The JSON schemas for validating Blueprints are available in the [GitHub repository's schemas directory](https://github.com/vLeapGroup/warps-specs/tree/main/schemas).

## Warp Blueprint Structure

- **`protocol`**: Specifies the protocol and version (e.g., `warp:0.1.0`).
- **`name`**: Identifies the Warp, used in public galleries.
- **`title`**: Displayed to the user.
- **`description`**: Provides details to the user.
- **`preview`**: URL to a preview image.

## Actions

Actions are rendered as buttons below the Warp information. They achieve different outcomes and are categorized as follows:

### Smart Contract Call

Prompts the user to sign a transaction with a smart contract:

- **`type`**: `contract`
- **`label`**: Text displayed on the action button.
- **`address`**: Smart contract address.
- **`func`**: Function to call in the smart contract.
- **`args`**: Fixed set of typed arguments for the contract.
- **`value`**: Amount of native tokens to transfer (e.g., EGLD).
- **`gasLimit`**: Gas limit for the transaction.
- **`inputs`**: User-defined inputs for `value` or positional `args`.

### Smart Contract Queries

Fetches results from a smart contract view function:

- **`type`**: `query`
- **`label`**: Text displayed on the action button.
- **`address`**: Smart contract address.
- **`func`**: Function to call in the smart contract.
- **`args`**: Fixed set of typed arguments for the query.
- **`abi`**: URL to the ABI file. Needed if contract is not verified on Explorer.
- **`inputs`**: User-defined inputs for positional `args`.

### Data Collection

Collect data from the user and send it to a defined destination (HTTP endpoint, ...):

- **`type`**: `collect`
- **`label`**: Text displayed on the action button.
- **`destination`**: Text displayed on the action button.
  - **`url`**: Your custom HTTP endpoint
  - **`method`**: HTTP method Example: `GET`, `POST`
  - **`headers`**: Key-value pairs of HTTP headers.
- **`inputs`**: User-defined inputs which will be sent to `destination`.
  - **Example**: `{ "inputs": { "a": 1, "b": 2 } }`

### Link

Creates a button linking to any web resource, including other Warps:

- **`type`**: `link`
- **`label`**: Text displayed on the action button.
- **`url`**: URL to link to.

## Argument and Input Types

Warps utilize an advanced typing system for both arguments and inputs, allowing for flexibility and precision in smart contract interactions. Below are the base types available, along with descriptions and examples for nested types.

### Base Types

- **`string`**: Represents a sequence of characters. Example: `string:hello`
- **`uint8`**: An 8-bit unsigned integer. Example: `uint8:255`
- **`uint16`**: A 16-bit unsigned integer. Example: `uint16:789`
- **`uint32`**: A 32-bit unsigned integer. Example: `uint32:456`
- **`uint64`**: A 64-bit unsigned integer, suitable for larger numbers. Example: `uint64:1234567890`
- **`biguint`**: An arbitrarily large unsigned integer. Example: `biguint:123456789012345678901234567890`
- **`bool`**: A boolean value, either `true` or `false`. Example: `bool:true`
- **`address`**: Represents a blockchain address. Example: `address:erd1qqqqqqqqqqqqqqqpqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqplllst77y4l`
- **`token`**: Represents a token identifier. Example: `token:TOKEN-123456`
- **`codemeta`**: Metadata for smart contract deployments, typically in hexadecimal. Example: `codemeta:0106`
- **`hex`**: A hexadecimal encoded string. Example: `hex:1234`
- **`esdt`**: Represents an ESDT (eStandard Digital Token) transfer in the form of `token|nonce|amount`. Example: `esdt:AAA-123456|5|100`

### Input Types Only

- **`nft`**: Displays an NFT selector to the user and is treated as `esdt`.

### Nested Types

The base types can be combined and nested with the following variations:

#### Option

An `option` type can either contain a value or be empty. It is useful for optional fields.

- **Example with value**: `option:string:hello`
- **Example without value**: `option:string`

#### Optional

Similar to `option`, but specifically used for fields that might not be provided.

- **Example with value**: `optional:string:hello`
- **Example without value**: `optional:string`

#### List

A `list` type holds multiple values of the same type, separated by commas.

- **Example with values**: `list:string:hello,world`
- **Example without values**: `list:string:`

#### Variadic

A `variadic` type allows for a variable number of arguments, often used for functions that can take multiple inputs.

- **Example of uint64**: `variadic:uint64:123,456,789`
- **Example of composite**: `variadic:composite(string|uint64):abc|123,def|456,ghi|789`

#### Composite

A `composite` type combines multiple different types into a single value, allowing for complex data structures.

- **Example**: `composite(string|uint64):hello|123`

## User Inputs

User-defined inputs allow customization of smart contract calls and queries. Inputs have various sources and positions.

### Sources

- **`field`**: Value from a user-generated text input field.
- **`query`**: Value from a URL query parameter.
- **`user_wallet`**: The wallet address of the connected user wallet.

### Positions

Defines the use of an input value:

- **`value`**: Used as the native value in a smart contract call.
- **`arg:{1,2,3,...}`**: Used at a specific position in the `args` array.

### Modifiers

Modify inputs before executing a transaction:

- **`scale:{number}`**: Scales input values by a fixed number of decimals (e.g., `scale:18`).
- **`scale:{Input Field Name}`**: Scales based on another input field (e.g., `scale:Decimals`).

### Input Fields

Define custom user inputs for actions:

- **`name`**: Display text for fields or URL query parameter name.
- **`description`**: Details displayed to the user.
- **`type`**: Input type.
- **`position`**: Input position.
- **`source`**: Input source.
- **`modifier`**: Optional modifier for the input.
- **`required`**: Indicates if the input is mandatory.
- **`min`**: Minimum value or length.
- **`max`**: Maximum value or length.

## Variables

To make your Warps more flexible and adaptive, you can use variables via the `vars` field in the root of your Warp:

```json
{
  "vars": {
    "MY_VARIABLE": "value"
  }
}
```

Once defined, you can then use the `MY_VARIABLE` **anywhere** inside the Warp contents:

```json
{
  "vars": {
    "EGLD_VALUE": "1000000000000000000",
    "ANY_ARG": "first-arg"
  },
  "actions": [
    {
      "type": "contract",
      "func": "pay",
      "value": "{{EGLD_VALUE}}",
      "args": ["string:{{ANY_ARG}}"]
    }
  ]
}
```

Variables can be set once and reused multiple times.

### Dynamic Variables from External Sources

Variables can also be dynamically set based on external sources, allowing Warps to adapt to different environments and user inputs.

#### From URL Query Parameters

A variable can be populated dynamically from a query parameter in the URL.

```json
{
  "vars": {
    "USER_ADDRESS": "query:address"
  },
  "actions": [
    {
      "type": "contract",
      "func": "register",
      "args": ["address:{{USER_ADDRESS}}"]
    }
  ]
}
```

In this example, `USER_ADDRESS` will be populated from the address query parameter in the URL (`?address=erd1...`).

## Globals

Globals are pre-defined, globally available constants that can be used similarly to [variables](#variables) without needing to define them. They are accessible anywhere within a Warp.

The following globals are available:

- **`USER_WALLET`**: The wallet address of the currently connected user.
- **`CHAIN_API`**: The blockchain API URL fetched from the registry, based on the blockchain specified in the action via `chain`.
- **`CHAIN_EXPLORER`**: The blockchain Explorer URL fetched from the registry, based on the blockchain specified in the action via `chain`.

##### Usage Example:

```json
{
  "actions": [
    {
      "type": "contract",
      "func": "register",
      "args": ["address:{{USER_WALLET}}"],
      "chain": "multiversx",
      "endpoint": "{{CHAIN_API}}/transaction"
    }
  ]
}
```

## Bot Metadata

The `bot` field provides additional information intended for AI agents or other automated systems. It is hidden from the user and does not affect the Warp's UI or behavior.

This field can be used in two places:

1. **At the Warp Root** – Provides a general description of the Warp for AI agents.
2. **Inside Inputs** – Helps AI understand how to process and interpret user inputs.

---

### 1. Warp-Level `bot` Field

At the root level, `bot` can describe the overall purpose of the Warp in a way that AI systems can interpret.

##### Example:

```json
{
  "protocol": "warp:0.4.0",
  "name": "JoAi: User Onboarding",
  "bot": "This Warp is designed to onboard new JoAi users by collecting essential information.",
  "actions": [...]
}
```

### 2. Input-Level bot Field

Within inputs, bot provides AI-specific instructions on handling user-provided data.

```json
{
  "name": "User Name",
  "bot": "The user's name for further identification.",
  "type": "string",
  "required": true
}
```

Another example with more context:

```json
{
  "name": "Source",
  "bot": "How the user discovered JoAi. Give examples like Google search, friend recommendation, blog post, etc.",
  "type": "string"
}
```

By using `bot` in these specific locations, AI agents can better understand the intent behind a Warp and how to handle user inputs efficiently.

---

## Results

Results define how to extract and reference data returned by a Warp execution. This includes responses from `contract`, `query`, or `collect` actions.

Declare a `results` object at the root level of the Warp. Each key represents a named result, and the value is a resolution path using dot notation.

```json
{
  "results": {
    // Extracts the first return value from the contract call
    "RAFFLE_ID": "out.1",

    // Extracts the second argument from the event named 'raffleCreated'
    "RAFFLE_ID_FROM_EVENT": "event.raffleCreated.2",

    // Extracts the third output from a query
    "STAKE_AMOUNT": "out.3",

    // Extracts a nested field from an HTTP response
    "USER_ID": "out.data.userId"
  }
}
```

Use the following prefixes:

- **`out`** – For smart contract output or HTTP response data.
- **`event`** – For smart contract event arguments.

Indexing starts from 1. Use dot notation to access nested values.

---

## Transform Results

The `transform` feature lets you compute dynamic results in the `results` object using JavaScript functions. Use it when you need to combine, format, or post-process extracted results.

- **Syntax:** Use `transform:` followed by a JavaScript function as a string. The function receives a `result` object with all previously computed results.
- **Order:** Transforms are evaluated in order, after all static and input-based results.
- **Dependencies:** Each transform can use results defined before it (including other transforms). Circular dependencies are not allowed.
- **Error Handling:** If a transform throws, its result is set to `null`.
- **Security:** Code runs in a sandboxed environment with access only to the `result` object. Async code is not supported.

**Example:**

```json
{
  "results": {
    "BASE": "out.value",
    "DOUBLED": "transform:() => { return result.BASE * 2 }"
  }
}
```

---

## Messages

Messages provide user-facing feedback after Warp execution. Define them using a `messages` object at the root level.

You can insert values dynamically using `{{RESULT_NAME}}` syntax.

```json
{
  "messages": {
    // Shown on success
    "success": "Raffle with ID {{RAFFLE_ID}} created successfully.",

    // Shown on failure
    "error": "Something went wrong. Please try again.",

    // Custom message (optional)
    "custom": "Your stake of {{STAKE_AMOUNT}} EGLD has been recorded."
  }
}
```

### Reserved Keys

- **`success`** – Displayed when the Warp executes successfully.
- **`error`** – Displayed when the Warp execution fails.
- **`bot`** – Hidden message for AI systems (optional).

Messages help deliver a smooth user experience with dynamic content.

---

## Next Step

The `next` field defines what happens after a Warp finishes. It can be a Warp ID or an external URL.

You can inject [Results](#results) into the next step as query parameters:

```json
{
  // Navigates to another Warp with a dynamic query param
  "next": "next-warp-id?raffle_id={{RAFFLE_ID}}"
}
```

This allows chaining Warps or redirecting users based on execution results.

You can define `next` at the root level or override it inside specific actions.

---
