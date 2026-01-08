# The Registry

The registry smart contract manages a directory of Warp hosts and their trustworthiness, maintained by the vLeap Group (MultiSig), the parent organization of [PeerMe](https://peerme.io), [Tagrity](https://tagrity.io), and [Spawnable](https://spawnable.io).

Clients can use this registry to resolve Warp aliases and look up information, such as trust status, to influence how they display a Warp, including potential scam alerts.

Public Endpoints:

- Register Warp: `registerWarp@<warp-hash>@<optional-alias>@<optional-brand-hash>`
- Unregister Warp: `unregisterWarp@<warp-hash>`
- Upgrade Warp: `upgradeWarp@<alias>@<new-warp-hash>`
- Set Warp Alias: `setWarpAlias@<warp-hash>@<alias>`
- Publish Warp to Gallery: `publishWarp@<warp-hash>`

Views:

- Retrieve all registered Warps by user: `getUserWarps(address) -> WarpInfo[]`
- Retrieve Warp info by alias: `getInfoByAlias(alias) -> WarpInfo`
- Retrieve Warp info by hash: `getInfoByHash(hash) -> WarpInfo`
- Retrieve configuration of a whitelisted [LightSpeed Chain]: `getChain(name, environment) -> ChainInfo`

Find the type definitions in the GitHub repository.

You can interact with those endpoints directly on the [Contract Page](https://spawnable.io/contracts/warp-registry) or use user-friendly UIs provided by supported clients, such as [UseWarp](https://usewarp.to/create).

**Our [SDKs](/warps/sdks) provide easy-to-use functions to interact with the registry.**
