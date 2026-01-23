# Supported Blockchains

Warp Protocol v3 supports 11 blockchain networks, enabling flexible and powerful cross-chain interactions.

## EVM Chains

### Ethereum

The original smart contract platform.

- **Identifier**: `ethereum`
- **Native Token**: ETH (18 decimals)
- **Explorer**: [etherscan.io](https://etherscan.io)

### Base

Coinbase's L2 built on the OP Stack.

- **Identifier**: `base`
- **Native Token**: ETH (18 decimals)
- **Explorer**: [basescan.org](https://basescan.org)

### Arbitrum

Optimistic rollup L2 for Ethereum.

- **Identifier**: `arbitrum`
- **Native Token**: ETH (18 decimals)
- **Explorer**: [arbiscan.io](https://arbiscan.io)

### Polygon

Ethereum sidechain and L2 network.

- **Identifier**: `polygon`
- **Native Token**: POL (18 decimals)
- **Explorer**: [polygonscan.com](https://polygonscan.com)

### Somnia

High-performance EVM chain.

- **Identifier**: `somnia`
- **Native Token**: STT (18 decimals)

## MultiversX Ecosystem

### MultiversX

High-performance sharded blockchain.

- **Identifier**: `multiversx`
- **Native Token**: EGLD (18 decimals)
- **Address Format**: `erd1...`
- **Explorer**: [explorer.multiversx.com](https://explorer.multiversx.com)

### VibeChain

MultiversX LightSpeed Chain.

- **Identifier**: `vibechain`
- **Native Token**: VIBE
- **Explorer**: [vibeox-explorer.multiversx.com](https://vibeox-explorer.multiversx.com)

## Other Chains

### Sui

Move-based L1 blockchain.

- **Identifier**: `sui`
- **Native Token**: SUI (9 decimals / MIST)
- **Address Format**: `0x...` (32 bytes hex)
- **Explorer**: [suiscan.xyz](https://suiscan.xyz)

### Solana

High-performance L1 blockchain.

- **Identifier**: `solana`
- **Native Token**: SOL (9 decimals / lamports)
- **Address Format**: Base58
- **Explorer**: [solscan.io](https://solscan.io)

### NEAR

Sharded proof-of-stake blockchain.

- **Identifier**: `near`
- **Native Token**: NEAR (24 decimals / yoctoNEAR)
- **Address Format**: `account.near`

### Fastset

Native network with fast finality.

- **Identifier**: `fastset`

## Using Chain in Warps

### Root-Level Default

Set the default chain for the entire Warp:

```json
{
  "protocol": "warp:3.0.0",
  "chain": "ethereum",
  "name": "ETH: Stake",
  "actions": [...]
}
```

### Per-Action Override

Override chain for specific actions:

```json
{
  "chain": "ethereum",
  "actions": [
    {
      "type": "query",
      "chain": "base",
      "label": "Check Balance on Base"
    },
    {
      "type": "contract",
      "label": "Execute on Ethereum"
    }
  ]
}
```

### Dynamic Chain Selection

Let users choose the chain:

```json
{
  "actions": [
    {
      "type": "transfer",
      "label": "Send",
      "inputs": [
        {
          "name": "Network",
          "type": "string",
          "position": "chain",
          "source": "field",
          "options": {
            "ethereum": "Ethereum",
            "base": "Base",
            "arbitrum": "Arbitrum"
          }
        }
      ]
    }
  ]
}
```

## Cross-Chain Warps

Query or interact with multiple chains in a single Warp:

```json
{
  "actions": [
    {
      "type": "query",
      "chain": "ethereum",
      "label": "ETH Balance",
      "auto": true
    },
    {
      "type": "query",
      "chain": "base",
      "label": "Base Balance",
      "auto": true
    },
    {
      "type": "query",
      "chain": "arbitrum",
      "label": "Arbitrum Balance",
      "auto": true
    }
  ]
}
```

## Global Chain Variables

Use these globals to reference chain-specific URLs:

- `{{CHAIN_API}}` - Chain's API endpoint
- `{{CHAIN_EXPLORER}}` - Chain's block explorer URL

```json
{
  "type": "link",
  "label": "View on Explorer",
  "url": "{{CHAIN_EXPLORER}}/tx/{{TX_HASH}}"
}
```

## LightSpeed Chains (MultiversX)

LightSpeed Chains are customizable sub-networks within the MultiversX ecosystem:

```json
{
  "actions": [
    {
      "type": "contract",
      "chain": "vibechain",
      "address": "erd1...",
      "func": "execute",
      "gasLimit": 10000000
    }
  ]
}
```

Warps are inscribed on the MultiversX main network and can execute on whitelisted LightSpeed Chains.

To register your LightSpeed chain, contact us via [Telegram](https://telegram.usewarp.to).

---

For SDK integration, see [SDKs](/warps/sdks).
