# Creating Warps

This guide covers how to create Warps programmatically using the SDK or with AI assistance.

## Using AI Skills

Install Warp Protocol skills in your project for AI-assisted Warp creation:

```bash
npx skills add JoAiHQ/skills
```

This adds skills for Cursor, Claude, and other AI coding assistants. Once installed, ask your AI:

> "Help me create a Warp to send USDC on Ethereum"

The AI will use the Warp Protocol skills to generate valid JSON.

## Using the SDK

### Installation

```bash
npm install @joai/warps
```

### WarpBuilder

Build Warps programmatically:

```typescript
import { WarpBuilder } from '@joai/warps'

const warp = new WarpBuilder()
  .setProtocol('warp:3.0.0')
  .setName('Token: Transfer USDC')
  .setTitle('Send USDC')
  .setDescription('Transfer USDC to any address.')
  .setChain('ethereum')
  .addContractAction({
    label: 'Send',
    abi: 'function transfer(address to, uint256 amount)',
    address: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
    func: 'transfer',
    gasLimit: 60000,
    inputs: [
      {
        name: 'Recipient',
        as: 'to',
        type: 'address',
        position: 'arg:1',
        source: 'field',
        required: true
      },
      {
        name: 'Amount',
        as: 'amount',
        type: 'uint256',
        position: 'arg:2',
        source: 'field',
        required: true,
        modifier: 'scale:6'
      }
    ]
  })
  .build()
```

### Raw JSON

Create Warps as JSON objects:

```json
{
  "protocol": "warp:3.0.0",
  "name": "Token: Transfer USDC",
  "title": "Send USDC",
  "description": "Transfer USDC to any address.",
  "chain": "ethereum",
  "actions": [
    {
      "type": "contract",
      "label": "Send",
      "abi": "function transfer(address to, uint256 amount)",
      "address": "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
      "func": "transfer",
      "gasLimit": 60000,
      "inputs": [
        {
          "name": "Recipient",
          "type": "address",
          "position": "arg:1",
          "source": "field",
          "required": true
        },
        {
          "name": "Amount",
          "type": "uint256",
          "position": "arg:2",
          "source": "field",
          "required": true,
          "modifier": "scale:6"
        }
      ]
    }
  ]
}
```

## Visual Editor

Use the UseWarp visual editor at [usewarp.to/create](https://usewarp.to/create) to create Warps without code.

## Validation

Validate your Warp JSON against the schema:

```typescript
import { WarpValidator } from '@joai/warps'

const validator = new WarpValidator()
const result = validator.validate(warpJson)

if (result.valid) {
  console.log('Warp is valid!')
} else {
  console.error('Errors:', result.errors)
}
```

## Publishing

After creating a Warp, publish it to the blockchain:

```typescript
import { WarpClient } from '@joai/warps'

const client = new WarpClient(config)
const { hash } = await client.publish(warp)

// Optionally register an alias
await client.registerAlias(hash, 'my-warp-alias')
```

Your Warp is now available at `usewarp.to/my-warp-alias`.

---

For complete documentation, see [Specifications](/warps/specifications).
