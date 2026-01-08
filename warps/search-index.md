# The Search Index

The Warp Index is an off-chain service that provides powerful search capabilities for Warps registered in the registry. It continuously synchronizes with the registry to maintain an up-to-date searchable database of all registered Warps.

Using the index, clients can perform full-text search across Warp metadata, including names, descriptions, and more, making it easy to discover relevant Warps.

## Usage

The index is fully integrated into our SDKs, providing a seamless experience for searching and discovering Warps.

Javascript Example:

```ts
const index = new WarpIndex({
  indexUrl: '<url>',
  indexApiKey: '<key>',
  // ... other configuration
})

const hits = await index.search('your search term')
```

# First-Party Service

vLeap is hosting an early stage Warp Index available with the following configuration:

```ts
const index = new WarpIndex({
  indexUrl: 'https://warp-index.vleap.ai',
})
```

It currently does not require API keys or enforce strict rate limits, but this may change in the future. To stay updated on potential changes, reach out to us on [Telegram](https://telegram.vleap.ai).
