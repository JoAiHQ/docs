# Supported Blockchains

Warp Protocol v3 supports 11 blockchain networks, enabling flexible and powerful cross-chain interactions.

## EVM Chains

Warps support all major EVM chains. Actions on these chains use standard `abi` signatures and `wei` for values.

### Ethereum
- **Identifier**: `ethereum`
- **Native Token**: ETH (18 decimals)
- **Explorer**: [etherscan.io](https://etherscan.io)

### Base
- **Identifier**: `base`
- **Native Token**: ETH (18 decimals)
- **Explorer**: [basescan.org](https://basescan.org)

### Arbitrum
- **Identifier**: `arbitrum`
- **Native Token**: ETH (18 decimals)
- **Explorer**: [arbiscan.io](https://arbiscan.io)

### Polygon
- **Identifier**: `polygon`
- **Native Token**: POL (18 decimals)
- **Explorer**: [polygonscan.com](https://polygonscan.com)

### Somnia
- **Identifier**: `somnia`
- **Native Token**: STT (18 decimals)

## MultiversX Ecosystem

### MultiversX
- **Identifier**: `multiversx`
- **Native Token**: EGLD (18 decimals)
- **Address Format**: `erd1...` (bech32)
- **Explorer**: [explorer.multiversx.com](https://explorer.multiversx.com)
- **Notes**: High gas limits (millions) are standard. Token transfers use the `transfers` array property.

### VibeChain (LightSpeed)
- **Identifier**: `vibechain`
- **Native Token**: VIBE
- **Explorer**: [vibeox-explorer.multiversx.com](https://vibeox-explorer.multiversx.com)
- **Notes**: LightSpeed chains are inscribed on MultiversX mainnet but execute on their own sub-networks.

## Other Chains

### Sui
- **Identifier**: `sui`
- **Native Token**: SUI (9 decimals / MIST)
- **Address Format**: `0x...` (32 bytes hex)
- **Explorer**: [suiscan.xyz](https://suiscan.xyz)

### Solana
- **Identifier**: `solana`
- **Native Token**: SOL (9 decimals / lamports)
- **Address Format**: Base58
- **Explorer**: [solscan.io](https://solscan.io)

### NEAR
- **Identifier**: `near`
- **Native Token**: NEAR (24 decimals / yoctoNEAR)
- **Address Format**: `account.near`

### Fastset
- **Identifier**: `fastset`

## Chain-Specific configurations

### Gas Limit Guidelines

Different chains require different gas limits for similar operations.

| Operation Type | EVM Chains | MultiversX |
|---------------|------------|------------|
| Simple transfer | 21,000 | 50,000+ |
| Token transfer | 50,000 - 100,000 | 500,000+ |
| Contract call | 100,000+ | 6,000,000+ |
| Complex DeFi | 300,000+ | 20,000,000+ |

### Address Formats

- **EVM / Sui**: `0x` prefix (e.g. `0x123...`)
- **MultiversX**: `erd1` prefix (e.g. `erd1...`)
- **Solana**: Base58 string (e.g. `H7b...`)
- **NEAR**: Account ID (e.g. `alice.near` or 64-char hex)

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
