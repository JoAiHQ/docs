# Integrate Warps

The primary objective of clients is to bring Warps closer to the end user and minimize friction in the user experience.

To achieve this, we recommend adding support for as many of the following features as you deem relevant and useful:

## Link Detection in URLs

Client applications can accept encoded Warp identifiers or aliases through the query parameter `warp`.

The URL-encoded value of the `warp` parameter is typically prefixed with the identifier type (`alias:`, `hash:`), defaulting to `alias:` if no type is specified.

### Identifier Types

- **`alias:`** - Use this prefix for alias identifiers.
- **`hash:`** - Use this prefix for transaction hash identifiers.
- **No Prefix** - Defaults to `alias:` if no prefix is specified.

### Super Clients

Super Clients are similar to other clients but accept Warp identifiers directly within the URL path for cleaner URLs. For example: `usewarp.to/create-token`, where `create-token` represents the Warp identifier.

You can propose to register your Super Client by submitting the URL of your web app via a pull request.

### Examples

- **Using `hash` prefix**:
  `https://yourapp.com?warp=hash%3Ad08a405f6d11b5506889bf6cd822fec2a8ef826c170fd1920ff5241f3883adb9`

- **Using `alias` prefix**:
  `https://yourapp.com?warp=alias%3Amyalias`

- **No prefix (defaults to `alias`)**:
  `https://yourapp.com?warp=myalias`

Clients fetch Warp information from the blockchain using the identifier and generate a UI with actions based on the parameters. When a user clicks an action, the client responds based on the Action Type. For transactions, it constructs the transaction based on defined parameters and prompts the user to sign and broadcast it to the blockchain network.

vLeap provides an advanced full-featured default client called `UseWarp`:
`https://usewarp.to?warp=<your-warp-id>`

Warps can also be integrated into other clients like wallets:

- **[xPortal](https://xportal.com)**: Accepts links like `https://xportal.com?warp=delegate` to display a UI in-app.
- **[MultiversX Browser Extension](https://chromewebstore.google.com/detail/multiversx-wallet/dngmlblcodfobpdpecaadgfbcggfjfnm)**: Unwraps Warp links shared on X.com and injects a UI with on-chain actions directly within posts.

Our [TypeScript SDK](/warps/sdks#typescript) includes utilities that handle link detection in URLs for you:

```typescript
const warpLink = new WarpLink(config)
const result = await warpLink.detect(warpLinkUrlOrId)
```

## Link Detection in User Content

User-generated content should be continuously screened for valid Warp Links of any kind, including Warp Links from [Super Clients](#super-clients).

Our [TypeScript SDK](/warps/sdks#typescript) includes utilities that handle link detection in HTML content for you:

```typescript
const warpLink = new WarpLink(config)
const result = await warpLink.detectFromHtml(contentWithHtml)
```

## Unwrapping Warps

Warps can be sent anywhere on the internet. To reduce user friction, we strongly recommend unwrapping Warps within your client. Unwrapping involves using a Warp Link to fetch complete Warp information from the blockchain and replacing the link with an injected UI to represent the Warp and perform actions directly within your client.

If your client is a wallet, ensure that you handle any transactions emitted from Warp actions of type contract.
Use the following utilities from our TypeScript SDK to simplify the integration process:

```typescript
const actionExecutor = new WarpActionExecutor(warpConfig, window.location.href)
const tx = actionExecutor.createTransactionForExecute(
  warpAction,
  inputArgs,
  inputTransfers
)
```

## Settings Toggle

While Warp Unwrapping significantly enhances the user experience, not all users may prefer it. Therefore, we recommend adding a toggle in your application settings to allow users to turn off unwrapping of Warp links.

If your client is a browser extension, consider providing this setting toggle per visited site.

## Conclusion

Integrating Warps into client applications enhances user experience by simplifying blockchain interactions and reducing friction. Utilize our TypeScript SDK for streamlined integration and contribute feedback or improvements through our community channels.
