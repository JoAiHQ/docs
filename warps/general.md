# Warps: Share Transactions via Links

Warps are on-chain data structures that provide all necessary information to construct complex UIs for generating transactions on supported blockchains. By sending a Warp to a friend or customer, they can easily access a generated UI to execute the intended transaction, such as swaps, staking, or smart contract interactions.

Warps can be shared through any medium capable of encoding or displaying URLs, including web platforms, QR codes, NFC tags, etc.

## Key Features

- **Multi-Chain Support**: Execute actions across 11 blockchains including Ethereum, Base, Solana, Sui, MultiversX, and more.
- **7 Action Types**: Transfer, Contract, Query, Collect, Link, MCP, and Prompt actions.
- **AI Integration**: Built-in support for AI agents via bot metadata and MCP actions.
- **Internationalization**: Localized titles, descriptions, and messages.
- **Chaining**: Link Warps together for multi-step workflows.

## Create Warps

Create Warps using the UseWarp client at [usewarp.to/create](https://usewarp.to/create).

Or build programmatically with our [SDKs](/warps/sdks):

```typescript
import { WarpBuilder } from '@joai/warps'

const warp = new WarpBuilder()
  .setProtocol('warp:3.0.0')
  .setName('Payment: Send USDC')
  .setTitle('Send USDC')
  .setDescription('Transfer USDC to any address.')
  .addContractAction({
    label: 'Send',
    abi: 'function transfer(address to, uint256 amount)',
    address: '0xUSDC...',
    func: 'transfer',
    gasLimit: 60000
  })
  .build()
```

## Quick Start

1. **Create a Warp**: Use [usewarp.to/create](https://usewarp.to/create) or the SDK
2. **Register**: Assign an alias via the [Registry](/warps/registry)
3. **Share**: Send the link `usewarp.to/your-alias`

## Learn from Videos

Watch the Warp Dev Series on YouTube: [Warp Dev Series](https://www.youtube.com/watch?v=_FLahYKlIJk).

## Examples

Explore Warp examples on GitHub in the [specifications repository](https://github.com/JoAiHQ/warps-specs/tree/main/examples).

Browse live Warps on [usewarp.to](https://usewarp.to) and inspect their Blueprints via the "Inspect" button.

## Documentation

- [Quickstart](/warps/quickstart) - Get started in minutes
- [Creating Warps](/warps/creating-warps) - Build Warps with SDK or AI
- [Specifications](/warps/specifications) - Complete JSON specification
- [Action Types](/warps/action-types) - All 7 action types reference
- [MCP Actions](/warps/mcp-actions) - AI tool integrations
- [Prompt Actions](/warps/prompt-actions) - AI text generation
- [Supported Chains](/warps/chains) - All 11 blockchain networks
- [SDKs](/warps/sdks) - TypeScript, React, and PHP SDKs
- [Integrations](/warps/integrations) - Integrate Warps into your app
- [Registry](/warps/registry) - Managing Warp aliases

## Join the Community

- **Telegram**: [telegram.usewarp.to](https://telegram.usewarp.to)
- **GitHub**: [github.com/JoAiHQ](https://github.com/JoAiHQ)
- **Documentation**: [docs.joai.ai](https://docs.joai.ai)
