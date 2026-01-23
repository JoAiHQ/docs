# Quickstart

Get started with Warp Protocol in minutes.

## Installation

```bash
npm install @joai/warps
```

Install chain adapters for the networks you want to support:

```bash
# EVM chains (Ethereum, Base, Arbitrum, Polygon)
npm install @joai/warps-adapter-evm

# MultiversX
npm install @joai/warps-adapter-multiversx

# Solana
npm install @joai/warps-adapter-solana

# Sui
npm install @joai/warps-adapter-sui

# NEAR
npm install @joai/warps-adapter-near
```

## Setup

### Basic Configuration

```typescript
import { WarpClient, WarpChainName } from '@joai/warps'
import { getAllEvmAdapters } from '@joai/warps-adapter-evm'
import { getAllMultiversxAdapters, MultiversxAdapter } from '@joai/warps-adapter-multiversx'

const config = {
  env: 'mainnet', // or 'devnet', 'testnet'
  currentUrl: 'https://yourapp.com',
  user: {
    wallets: {
      ethereum: { address: '0x...', provider: walletProvider },
      multiversx: { address: 'erd1...', provider: walletProvider }
    }
  }
}

const client = new WarpClient(config, {
  chains: [
    ...getAllMultiversxAdapters(),
    ...getAllEvmAdapters(MultiversxAdapter)
  ]
})
```

## Execute a Warp

### From Warp ID or URL

```typescript
// Execute by alias
const result = await client.executeWarp('my-warp-alias', [
  'string:multiversx',
  'address:erd1...',
  'asset:EGLD|0.001'
])

// Handle transactions
if (result.chain) {
  const signedTxs = await client.getWallet(result.chain.name).signTransactions(result.txs)
  const hashes = await Promise.all(
    signedTxs.map(tx => client.getWallet(result.chain.name).sendTransaction(tx))
  )
  console.log('Transaction hashes:', hashes)
}
```

### From Warp JSON

```typescript
const warp = {
  protocol: 'warp:3.0.0',
  name: 'Token: Transfer',
  title: 'Send Tokens',
  description: 'Transfer tokens to another address.',
  actions: [{
    type: 'transfer',
    label: 'Send',
    inputs: [
      { name: 'Receiver', type: 'address', position: 'receiver', source: 'field', required: true },
      { name: 'Amount', type: 'asset', position: 'transfer', source: 'field', required: true }
    ]
  }]
}

const result = await client.executeWarp(warp, [
  'address:0xRecipient...',
  'asset:USDC|100'
])
```

## Create a Warp

### Using WarpBuilder

```typescript
const builder = client.createBuilder(WarpChainName.Ethereum)

const warp = await builder.createFromRaw(JSON.stringify({
  protocol: 'warp:3.0.0',
  name: 'DeFi: Stake',
  title: 'Stake ETH',
  description: 'Stake your ETH to earn rewards.',
  chain: 'ethereum',
  actions: [{
    type: 'contract',
    label: 'Stake',
    abi: 'function stake()',
    address: '0xStakingContract...',
    func: 'stake',
    gasLimit: 200000,
    inputs: [{
      name: 'Amount',
      type: 'uint256',
      position: 'value',
      source: 'field',
      required: true,
      modifier: 'scale:18'
    }]
  }]
}))
```

## Publish a Warp

```typescript
// Create inscription transaction
const tx = await client.createInscriptionTransaction(WarpChainName.Multiversx, warp)

// Sign and send
const wallet = client.getWallet(WarpChainName.Multiversx)
const signedTx = await wallet.signTransactions([tx])
const hash = await wallet.sendTransaction(signedTx[0])

console.log('Warp published with hash:', hash)

// Register an alias (optional)
const registry = await client.getRegistry(WarpChainName.Multiversx)
await registry.registerAlias(hash, 'my-custom-alias')
```

## Detect Warps in Content

```typescript
import { WarpLinkDetecter } from '@joai/warps'

const detecter = new WarpLinkDetecter(config, client.chains)

// Detect from URL or ID
const result = await detecter.detect('https://usewarp.to/my-warp')
if (result.warp) {
  console.log('Found warp:', result.warp.name)
}

// Detect from HTML content
const htmlResult = await detecter.detectFromHtml('<p>Check out usewarp.to/stake-egld</p>')
```

## Execution Handlers

Track execution progress with callbacks:

```typescript
const result = await client.executeWarp(warp, inputs, {
  onActionExecuted: (result) => {
    console.log('Action completed:', result)
  },
  onExecuted: (result) => {
    console.log('Warp completed:', result)
  },
  onError: (error) => {
    console.error('Error:', error)
  }
})
```

## View Transaction on Explorer

```typescript
const explorer = client.getExplorer(WarpChainName.Ethereum)
const url = explorer.getTransactionUrl(txHash)
console.log('View on explorer:', url)
```

## Examples

### Transfer Warp

```json
{
  "protocol": "warp:3.0.0",
  "name": "Asset: Transfer",
  "title": "Transfer assets",
  "description": "Transfer an asset from one account to another.",
  "actions": [{
    "type": "transfer",
    "label": "Transfer now",
    "inputs": [
      { "name": "Blockchain", "as": "chain", "type": "string", "position": "chain", "source": "field", "required": true },
      { "name": "Receiver", "as": "receiver", "type": "address", "position": "receiver", "source": "field", "required": true },
      { "name": "Asset", "as": "asset", "type": "asset", "position": "transfer", "source": "field", "required": true }
    ]
  }]
}
```

### Prompt Warp

```json
{
  "protocol": "warp:3.0.0",
  "name": "AI: Simple Prompt",
  "title": "Simple Prompt",
  "description": "A prompt action example.",
  "actions": [{
    "type": "prompt",
    "label": "Generate",
    "prompt": "Hello! This is a simple prompt."
  }],
  "output": { "RESULT": "out" },
  "messages": { "success": "Prompt completed!" }
}
```

## Using AI Skills

For AI-assisted Warp creation, install Warp Protocol skills:

```bash
npx skills add JoAiHQ/skills
```

Then ask your AI assistant:

> "Help me create a Warp to swap tokens on Uniswap"

---

For full documentation, see [Specifications](/warps/specifications).
