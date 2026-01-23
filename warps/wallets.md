# Wallets

Warp Protocol uses wallet providers to sign and send transactions. This page covers how to configure wallets for Warp execution.

## Overview

Wallets in the Warps SDK are configured through the `WarpClientConfig`:

```typescript
const config = {
  env: 'mainnet',
  user: {
    wallets: {
      ethereum: { address: '0x...', provider: 'coinbase' },
      multiversx: { address: 'erd1...', provider: 'gaupa' }
    }
  },
  walletProviders: {
    ethereum: {
      coinbase: createCoinbaseWalletProvider({ ... })
    },
    multiversx: {
      gaupa: createGaupaWalletProvider({ ... })
    }
  }
}
```

## Wallet Interface

All wallet providers implement the `WalletProvider` interface:

```typescript
interface WalletProvider {
  getAddress(): Promise<string | null>
  getPublicKey(): Promise<string | null>
  signTransaction(tx: any): Promise<any>
  signMessage(message: string): Promise<string>
  generate(): Promise<WarpWalletDetails>
}
```

## Using Wallets

### Get Wallet

```typescript
const wallet = client.getWallet('ethereum')
```

### Sign Transactions

```typescript
const signedTxs = await wallet.signTransactions([tx])
```

### Send Transaction

```typescript
const hash = await wallet.sendTransaction(signedTx)
```

### Sign Message

```typescript
const signature = await wallet.signMessage('Hello, World!')
```

---

## Cloud Wallet Providers

Cloud wallets manage private keys in secure infrastructure, ideal for agentic and server-side applications.

### Coinbase Server Wallet

[GitHub](https://github.com/JoAiHQ/warps-sdk-js/tree/main/packages/wallet-coinbase) | [NPM](https://www.npmjs.com/package/@joai/warps-wallet-coinbase)

Coinbase Server Wallet v2 for EVM and Solana chains. Keys are secured in Coinbase's Trusted Execution Environment (TEE).

#### Installation

```bash
npm install @joai/warps-wallet-coinbase
```

#### Configuration

```typescript
import { createCoinbaseWalletProvider } from '@joai/warps-wallet-coinbase'

const coinbaseProvider = createCoinbaseWalletProvider({
  apiKeyId: process.env.COINBASE_API_KEY_ID,
  apiKeySecret: process.env.COINBASE_API_KEY_SECRET,
  walletSecret: process.env.COINBASE_WALLET_SECRET,
})

const config = {
  env: 'mainnet',
  user: {
    wallets: {
      ethereum: { address: '0x...', provider: 'coinbase' }
    }
  },
  walletProviders: {
    ethereum: { coinbase: coinbaseProvider },
    base: { coinbase: coinbaseProvider },
    polygon: { coinbase: coinbaseProvider },
  }
}
```

#### Supported Chains

- **Ethereum**: `ethereum-mainnet`, `ethereum-sepolia`
- **Base**: `base-mainnet`, `base-sepolia`
- **Polygon**: `polygon-mainnet`, `polygon-amoy`
- **Arbitrum**: `arbitrum-mainnet`, `arbitrum-sepolia`
- **Solana**: `solana-mainnet`, `solana-devnet`

#### Resources

- [Coinbase Server Wallet v2 Docs](https://docs.cdp.coinbase.com/server-wallets/v2/introduction/welcome)
- [Coinbase Developer Platform](https://portal.cdp.coinbase.com/)

---

### Gaupa

[GitHub](https://github.com/JoAiHQ/warps-sdk-js/tree/main/packages/wallet-gaupa) | [NPM](https://www.npmjs.com/package/@joai/warps-wallet-gaupa)

Gaupa provides agentic wallets for MultiversX. Designed for AI agents and automated workflows.

#### Installation

```bash
npm install @joai/warps-wallet-gaupa
```

#### Configuration

```typescript
import { createGaupaWalletProvider } from '@joai/warps-wallet-gaupa'

const config = {
  env: 'mainnet',
  user: {
    wallets: {
      multiversx: { address: 'erd1...', provider: 'gaupa' }
    }
  },
  walletProviders: {
    multiversx: {
      gaupa: createGaupaWalletProvider({
        apiKey: process.env.GAUPA_API_KEY,
        publicKey: process.env.GAUPA_PUBLIC_KEY,
      })
    }
  }
}
```

#### Wallet Generation

Create new agentic wallets on-demand:

```typescript
const provider = createGaupaWalletProvider({
  apiKey: process.env.GAUPA_API_KEY,
  publicKey: process.env.GAUPA_PUBLIC_KEY,
})

const walletProvider = provider(config, chainInfo)
const wallet = await walletProvider.generate()
console.log('New wallet:', wallet.address)
```

#### Resources

- [Gaupa Website](https://gaupa.xyz)

---

### Privy

[GitHub](https://github.com/JoAiHQ/warps-sdk-js/tree/main/packages/wallet-privy) | [NPM](https://www.npmjs.com/package/@joai/warps-wallet-privy)

Privy wallets for EVM and Solana. Supports both Node.js server and React browser environments.

#### Installation

```bash
npm install @joai/warps-wallet-privy
```

#### Node.js Usage

```typescript
import { PrivyClient } from '@privy-io/server-sdk'
import { PrivyWalletProvider } from '@joai/warps-wallet-privy'

const privyServer = new PrivyClient(
  process.env.PRIVY_APP_ID,
  process.env.PRIVY_APP_SECRET
)

const privyClient = {
  getAddress: async () => {
    const user = await privyServer.getUser(userId)
    return user.wallet?.address || null
  },
  signTransaction: async (tx) => {
    return await privyServer.signTransaction(userId, tx)
  },
  signMessage: async (message) => {
    return await privyServer.signMessage(userId, message)
  },
}

const config = {
  env: 'mainnet',
  walletProviders: {
    ethereum: () => new PrivyWalletProvider({ privyClient }),
    solana: () => new PrivyWalletProvider({ privyClient }),
  }
}
```

#### Browser/React Usage

```typescript
import { PrivyWalletProvider } from '@joai/warps-wallet-privy'

// Create adapter from your Privy React instance
const privyClient = {
  getAddress: async () => privyInstance.user?.wallet?.address || null,
  signTransaction: async (tx) => await privyInstance.user?.wallet?.signTransaction(tx),
  signMessage: async (message) => await privyInstance.user?.wallet?.signMessage(message),
}

const config = {
  env: 'mainnet',
  walletProviders: {
    ethereum: () => new PrivyWalletProvider({ privyClient }),
  }
}
```

#### Resources

- [Privy Documentation](https://docs.privy.io)

---

## Custom Wallet Providers

Create custom wallet providers by implementing the `WalletProvider` interface:

```typescript
import { WalletProvider, WarpWalletDetails } from '@joai/warps'

class MyWalletProvider implements WalletProvider {
  async getAddress(): Promise<string | null> {
    return '0x...'
  }

  async getPublicKey(): Promise<string | null> {
    return null
  }

  async signTransaction(tx: any): Promise<any> {
    // Sign with your wallet
    return signedTx
  }

  async signMessage(message: string): Promise<string> {
    // Sign message
    return signature
  }

  async generate(): Promise<WarpWalletDetails> {
    // Generate new wallet
    return { address: '0x...', provider: 'my-provider' }
  }
}

const config = {
  walletProviders: {
    ethereum: () => new MyWalletProvider(),
  }
}
```

---

## Best Practices

1. **Never commit secrets**: Use environment variables for API keys and secrets
2. **Use cloud wallets for agents**: Server-side operations need cloud wallet providers
3. **Handle errors gracefully**: Wallet operations can fail due to network issues
4. **Check wallet availability**: Verify wallet is configured before executing Warps

```typescript
const walletAddress = config.user?.wallets?.[chain]?.address
if (!walletAddress) {
  throw new Error(`No wallet configured for ${chain}`)
}
```

---

For SDK setup, see [Quickstart](/warps/quickstart).
