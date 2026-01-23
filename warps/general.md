# Warp Protocol

Warps are executable actions that enable cross-chain transactions, smart contract interactions, off-chain API calls, and AI tool integrations through a standardized JSON format. They bridge the gap between AI agents and blockchain execution.

## What Are Warps?

A Warp is a declarative JSON object that describes:

- **What** action to perform (transfer, contract call, API request, AI prompt)
- **How** to collect inputs from users or AI agents
- **Where** to execute (across 11 supported blockchains)
- **What** to do with results (chain to other Warps, display messages)

Warps can be stored on-chain for immutability, shared via links, and executed by humans or AI agents.

## Why Warps?

### For AI Agents

Warps give AI agents the ability to execute blockchain transactions. Instead of just generating text, agents can:

- **Execute trades** on decentralized exchanges
- **Stake tokens** and manage DeFi positions
- **Mint NFTs** and interact with smart contracts
- **Collect data** from APIs and process with AI
- **Chain actions** into complex multi-step workflows

### For Developers

Warps simplify blockchain UX. Instead of building custom transaction flows:

- **Portable**: Share complex transactions as simple links
- **Multi-chain**: One format works across 11 blockchains
- **Composable**: Chain Warps together for workflows
- **Verifiable**: On-chain storage ensures immutability

### For Users

Users interact with intuitive UIs without understanding blockchain complexity:

- **Click a link** → Execute a swap, stake, or mint
- **Scan a QR code** → Complete a payment
- **Chat with AI** → Agent executes transactions on your behalf

## Key Features

- **7 Action Types**: Transfer, Contract, Query, Collect, Link, MCP, Prompt
- **11 Blockchains**: Ethereum, Base, Arbitrum, Polygon, Sui, Solana, MultiversX, and more
- **AI-Native**: MCP tool integration and prompt actions for AI workflows
- **Cloud Wallets**: Coinbase, Privy, and Gaupa for agentic execution
- **i18n Support**: Localized content for global applications
- **Chaining**: Link Warps for multi-step workflows

## Quick Start

### Share Transactions

```
usewarp.to/your-alias
```

Create Warps at [usewarp.to/create](https://usewarp.to/create) and share the link.

### Build with SDK

```typescript
import { WarpClient } from '@joai/warps'

const result = await client.executeWarp('stake-egld', [
  'uint256:1000000000000000000'
])
```

### AI Agent Execution

```typescript
// AI agent analyzes user request and executes Warp
const warp = await client.detectWarp('send-usdc')
const result = await client.executeWarp(warp, userInputs)
```

## Use Cases

### Payments
Share a link or QR code for instant crypto payments.

### DeFi Automation
AI agents manage staking, swaps, and yield optimization.

### NFT Minting
One-click minting experiences across chains.

### DAO Operations
Voting, proposals, and treasury management via Warps.

### AI-Powered Workflows
Chain AI prompts with blockchain actions for intelligent automation.

## Documentation

- [Quickstart](/warps/quickstart) - Get started in minutes
- [Creating Warps](/warps/creating-warps) - Build Warps with SDK or AI
- [Specifications](/warps/specifications) - Complete JSON specification
- [Action Types](/warps/action-types) - All 7 action types
- [MCP Actions](/warps/mcp-actions) - AI tool integrations
- [Prompt Actions](/warps/prompt-actions) - AI text generation
- [Chains](/warps/chains) - All 11 networks
- [SDKs](/warps/sdks) - TypeScript, React, PHP
- [Wallets](/warps/wallets) - Cloud wallet providers
- [Integrations](/warps/integrations) - Integrate into your app
- [Registry](/warps/registry) - Managing aliases

## Resources

- **Try it**: [usewarp.to](https://usewarp.to)
- **Dev Series**: [YouTube Tutorials](https://www.youtube.com/watch?v=_FLahYKlIJk)
- **Examples**: [GitHub](https://github.com/JoAiHQ/warps-specs/tree/main/examples)

## Community

- **Telegram**: [telegram.usewarp.to](https://telegram.usewarp.to)
- **GitHub**: [github.com/JoAiHQ](https://github.com/JoAiHQ)
- **X/Twitter**: [@JoAiAgents](https://x.com/JoAiAgents)
