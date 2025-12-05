# Wallets

Wallets enable agents to interact with blockchain networks, manage digital assets, and execute transactions.

## Wallet Types

- **Agent Wallets** - Belong to individual agents, encrypted storage, Web3 digital wallets
- **User Wallets** - Your personal wallets, connect via wallet extensions

## Supported Blockchains

JoAi supports multiple next-generation blockchain networks:

- **Sui** - High-performance blockchain with instant finality
- **Solana** - Fast, scalable blockchain for decentralized apps
- **Ethereum** - The world's leading smart contract platform
- **Base** - Ethereum L2 by Coinbase
- **MultiversX (EGLD)** - Scalable blockchain with sharding
- **EVM Chains** - All Ethereum Virtual Machine compatible chains

Each network requires a separate wallet. JoAi's Web3 digital wallets mean your AI agents can interact with blockchain networks across Sui, Solana, Ethereum, Base, MultiversX, and EVM chains.

## Generating Wallets

1. Go to **Agent Settings > Wallets**
2. Click **"Generate Wallet"**
3. Select blockchain network
4. **CRITICAL:** Save the 24-word mnemonic phrase securely
5. Confirm you've saved the phrase
6. Wallet is created and activated

**Security:** The mnemonic phrase is the only way to recover your wallet. Store it securely and never share it.

## Importing Wallets

1. Go to **Agent Settings > Wallets**
2. Click **"Import Wallet"**
3. Select **"Import from Mnemonic"**
4. Enter your 24-word recovery phrase
5. Select blockchain network
6. Wallet is imported

**Requirements:**

- 24 words in correct order
- Network must match your wallet
- Valid mnemonic phrase

## Wallet Operations

### Depositing Assets

1. Go to **Agent Settings > Wallets**
2. Select wallet
3. Click **"Deposit"**
4. Copy wallet address
5. Send assets from external wallet
6. Wait for blockchain confirmation

### Withdrawing Assets

1. Select wallet
2. Click **"Withdraw"**
3. Enter recipient address
4. Specify amount
5. Review and confirm
6. Approve transaction

### Wallet Synchronization

Wallets sync automatically, but you can manually sync:

1. Select wallet
2. Click **"Sync"** or **"Refresh"**
3. Wallet state updates

### Exporting Wallets

**Export Mnemonic:**

1. Select wallet
2. Click **"Export"** or **"Backup"**
3. Choose **"Export Mnemonic"**
4. Verify identity (password)
5. View and save phrase securely

**Export Private Key:**

- Available but use with extreme caution
- Private keys give full wallet access
- Store extremely securely

## Multi-Wallet Management

Agents can have multiple wallets:

- Different networks (one per blockchain)
- Multiple per network (premium plans)
- Wallet priority (set which wallet to use first)
- Easy switching between wallets

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
- Access control
- Transaction approval (in manual mode)

**If Wallet Compromised:**

1. Immediately move funds to new wallet if possible
2. Revoke all connected services
3. Change all related passwords
4. Report incident
5. Create new secure wallet
