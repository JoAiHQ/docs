# Wallets

Wallets enable agents to interact with blockchain networks, manage digital assets, and execute transactions across multiple blockchain ecosystems.

## Supported Blockchains

JoAi supports multiple next-generation blockchain networks:

- **Sui** - High-performance blockchain with instant finality
- **Solana** - Fast, scalable blockchain for decentralized apps
- **Ethereum** - The world's leading smart contract platform
- **Base** - Ethereum L2 by Coinbase
- **MultiversX (EGLD)** - Scalable blockchain with sharding
- **NIR** - Next-generation blockchain network
- **EVM Chains** - All Ethereum Virtual Machine compatible chains including Arbitrum, Somnia, and other EVM-compatible networks

Each network requires a separate wallet. JoAi's Web3 digital wallets enable your AI agents to interact with blockchain networks across Sui, Solana, Ethereum, Base, MultiversX, NIR, and EVM chains.

## Wallet Management Modes

JoAi offers three distinct modes for managing agent wallets:

### Local Mode

In Local mode, your private seed is stored exclusively on your device. You maintain full ownership and control of your private key. The private key is never stored on JoAi servers.

### Cloud Mode

Cloud mode utilizes secure wallet infrastructure services like Privy, Gaupa, and other enterprise-grade wallet service solutions. Your wallet is managed through these trusted third-party services.

### External Mode

External mode allows agents to assist you in managing and suggesting actions for any existing wallet you already own. Agents can help you interact with wallets from various providers including Phantom, Slush from Sui, and other wallet applications. The agent provides guidance and suggestions while you maintain full control over your external wallet.

## Wallet Capabilities

### Generating Wallets

Agents can generate new wallets for any supported blockchain network. Each wallet is created with a unique 24-word mnemonic phrase that serves as the recovery mechanism. The mnemonic phrase is critical for wallet recovery and must be stored securely.

### Importing Wallets

You can import existing wallets using mnemonic phrases. Import functionality supports 24-word recovery phrases and validates that the network matches your wallet configuration. This enables you to bring existing wallets into your agent ecosystem.

### Depositing Assets

Agents can receive assets from external wallets. Each wallet has a unique address that can be used to receive tokens and assets from any compatible source. Deposits are automatically detected and synchronized with your wallet balance.

### Withdrawing Assets

Agents can send assets to any valid address on the supported blockchain networks. Withdrawal functionality includes address validation, amount specification, and transaction confirmation. All transactions require approval before execution.

### On-Ramp and Off-Ramp

You can deposit funds into your Agent Wallet and withdraw them at any time using external providers like Coinbase. On-ramp allows you to convert fiat currency to blockchain assets, while off-ramp converts assets back to traditional payment methods.

### Wallet Synchronization

Wallets automatically synchronize with their respective blockchain networks to maintain up-to-date balances and transaction history. Manual synchronization is available to refresh wallet state on demand.

### Exporting Wallets

Wallet export functionality allows you to backup your mnemonic phrases and private keys. Export operations require identity verification through password confirmation. Private key export is available but should be used with extreme caution as private keys provide full wallet access.

## Wallet Security

**Critical Best Practices:**

- Always backup mnemonic phrases securely
- Never share recovery phrases or private keys
- Store backups in multiple secure locations
- Use encrypted storage for digital backups
- Test recovery procedures periodically

**Wallet Protection:**

- Wallets encrypted at rest
- Password protection for sensitive operations
- Access control and permission management
- Transaction approval requirements (in manual mode)
- Private keys never stored on servers in Local mode
