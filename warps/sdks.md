# SDKs for Warps

Warps come with SDKs for several languages to help you integrate them with minimal effort.

## TypeScript

[GitHub](https://github.com/JoAiHQ/warps-sdk-js/tree/main/packages/core) | [NPM](https://www.npmjs.com/package/@joai/warps)

Install the SDK via npm:

```bash
npm install @joai/warps
```

### Packages

The SDK is organized as a monorepo with the following packages:

#### Core
- `@joai/warps` - Core SDK functionality

#### Chain Adapters
- `@joai/warps-adapter-evm` - Ethereum, Base, Arbitrum, Polygon, Somnia
- `@joai/warps-adapter-multiversx` - MultiversX, VibeChain
- `@joai/warps-adapter-solana` - Solana
- `@joai/warps-adapter-sui` - Sui
- `@joai/warps-adapter-near` - NEAR
- `@joai/warps-adapter-fastset` - Fastset

#### Wallet Integrations
- `@joai/warps-wallet-coinbase` - Coinbase Wallet
- `@joai/warps-wallet-gaupa` - Gaupa Wallet
- `@joai/warps-wallet-privy` - Privy

#### Utilities
- `@joai/warps-mcp` - MCP (Model Context Protocol) server
- `@joai/warps-vm-browser` - Browser VM for transforms
- `@joai/warps-vm-node` - Node.js VM for transforms

### Quick Start

```typescript
import { WarpBuilder, WarpConfig } from '@joai/warps'

// Configure the SDK
const config: WarpConfig = {
  env: 'mainnet',
  chainAdapters: {
    ethereum: new EvmAdapter({ /* ... */ }),
    multiversx: new MultiversXAdapter({ /* ... */ })
  }
}

// Build a Warp
const warp = new WarpBuilder()
  .setProtocol('warp:3.0.0')
  .setName('Token: Transfer')
  .setTitle('Send Tokens')
  .setDescription('Transfer tokens to any address.')
  .addTransferAction({ label: 'Send' })
  .build()
```

## TypeScript (React)

[GitHub](https://github.com/JoAiHQ/warps-sdk-js/tree/main/packages/react) | [NPM](https://www.npmjs.com/package/@joai/warps-react)

React components and hooks for Warp integration:

```bash
npm install @joai/warps-react
```

```tsx
import { WarpProvider, useWarp } from '@joai/warps-react'

function App() {
  return (
    <WarpProvider config={config}>
      <WarpComponent />
    </WarpProvider>
  )
}

function WarpComponent() {
  const { execute, loading } = useWarp('my-warp-alias')
  return <button onClick={execute} disabled={loading}>Execute</button>
}
```

## PHP

[GitHub](https://github.com/JoAiHQ/warps-sdk-php) | [Packagist](https://packagist.org/packages/joai/warps)

Install the SDK via Composer:

```bash
composer require joai/warps
```

```php
use JoAi\Warps\WarpBuilder;

$warp = WarpBuilder::create()
    ->setProtocol('warp:3.0.0')
    ->setName('Token: Transfer')
    ->setTitle('Send Tokens')
    ->addTransferAction(['label' => 'Send'])
    ->build();
```

---

For full documentation, visit [docs.joai.ai](https://docs.joai.ai).

## Getting Started

- [Quickstart](/warps/quickstart) - Get started in minutes
- [Creating Warps](/warps/creating-warps) - Build Warps with SDK or AI
