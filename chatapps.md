# ChatApps

ChatApps is a framework for building native web3 AI applications that integrate supported blockchain networks (Sui, Solana, Ethereum, Base, MultiversX, NIR, and EVM chains) into popular AI platforms like ChatGPT, Claude, Cursor, and other MCP-enabled interfaces.

## What are ChatApps?

ChatApps are web3-native AI applications that can be published to app stores like the ChatGPT App Store. They turn conversations into on-chain and off-chain execution across all supported chains.

ChatApps combine:

- **Warps**: Open-source protocol for skills that act on-chain and off-chain
- **Dynamic MCP**: JoAi automatically spins up MCP servers per Warp on demand. See [MCP documentation](/protocols/mcp) for details on Dynamic MCP
- **Warp UI**: Visual representation for Warps, compatible with the ChatGPT Apps SDK
- **Cloud Wallet**: Full abstraction with Warp Wallets via cloud wallet providers (TEEs for wallet signatures)
- **Open-source ChatApp framework**: For building Warp UIs

## Key Features

- **Fast Development**: Because of the ease of use and speed in creating Warps, ChatApps may be the fastest and most scalable way to create web3-native ChatGPT Apps today
- **Multi-Client Support**: Works with ChatGPT, Claude, Cursor, and other MCP-enabled interfaces
- **Secure Authentication**: Cloud wallets + OAuth handle authentication and hosted execution; TEEs secure signatures
- **Native Blockchain Integration**: Warp UI renders inside ChatGPT Apps for state, actions, confirmations with verified on-chain execution

## Example ChatApps

- Blockchain account info and delegations across supported chains
- Staking and liquid staking integrations
- Resend email sending
- Typefully scheduled posts
- Cursor cloud agents
- Native blockchain actions (transfers, swaps, staking, etc.) on all supported chains

## Publishing to App Stores

ChatApps can be published to the ChatGPT App Store and other compatible platforms. Publishing tooling helps ship ChatApps at scale.

## Getting Started

To build ChatApps:

1. Create Warps using the [Warps framework](/warps/general)
2. Dynamic MCP endpoints are automatically configured by JoAi (see [MCP documentation](/protocols/mcp))
3. Build Warp UI components compatible with ChatGPT Apps SDK
4. Set up Cloud Wallet integration
5. Publish to app stores

## Resources

- **GitHub Repository**: [https://github.com/JoAiHQ](https://github.com/JoAiHQ) - Open-source ChatApp framework and examples
- **Warps Documentation**: [Warps framework](/warps/general)
- **MCP Documentation**: [Dynamic MCP details](/protocols/mcp)
