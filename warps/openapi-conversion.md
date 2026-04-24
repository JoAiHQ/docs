# OpenAPI Conversion

The `@joai/warps-openapi` package converts OpenAPI 3.x specifications into executable Warps with `collect` actions. This enables any REST API with an OpenAPI spec to be used as a Warp source.

## Installation

```bash
npm install @joai/warps-openapi
```

Requires `@joai/warps` ^3.2.0 as a peer dependency.

## Usage

### From URL

```typescript
import { WarpOpenApi } from '@joai/warps-openapi'

const openApi = new WarpOpenApi(config)
const warps = await openApi.getWarpsFromUrl('https://api.example.com/openapi.json')
```

### From Parsed Spec

```typescript
import { WarpOpenApi } from '@joai/warps-openapi'

const openApi = new WarpOpenApi(config)
const warps = await openApi.getWarpsFromSpec(parsedSpec, {
  sourceUrl: 'https://api.example.com/openapi.json',
  endpoints: ['getUser', 'createUser'],
  chain: 'multiversx',
})
```

### Standalone Helpers

```typescript
import { convertOpenApiToWarps, extractOpenApiEndpoints, extractOpenApiOperations } from '@joai/warps-openapi'

// List available endpoints (for UI pickers)
const endpoints = extractOpenApiEndpoints(spec)
// => ['getUser', 'createUser', 'GET /status']

// Get full operation details
const operations = extractOpenApiOperations(spec, 'https://api.example.com/openapi.json')

// Convert to Warps
const warps = await convertOpenApiToWarps(config, spec, {
  sourceUrl: 'https://api.example.com/openapi.json',
  endpoints: ['getUser'],
})
```

## Options

| Option | Type | Description |
|---|---|---|
| `sourceUrl` | `string` | Source URL for base URL resolution and identifier scoping |
| `endpoints` | `string[]` | Filter to specific operations by `operationId` or `METHOD /path` |
| `chain` | `WarpChainName` | Default chain for warp metadata (defaults to `multiversx`) |

## Parameter Mapping

OpenAPI parameters are mapped to Warp action inputs based on their location:

| OpenAPI Location | Warp Input Position | Example |
|---|---|---|
| `path` | `url:{name}` | `/users/{id}` → `url:id` |
| `query` | `query:{name}` | `?limit=10` → `query:limit` |
| Request body property | `payload:{name}` | `{ "text": "..." }` → `payload:text` |

Path parameters are always marked as required. Query and payload parameters use the `required` field from the OpenAPI spec.

## Type Mapping

| OpenAPI Type | Warp Type |
|---|---|
| `boolean` | `bool` |
| `integer` | `number` |
| `number` | `number` |
| `string` (default) | `string` |

## Generated Identifiers

Each converted Warp receives a deterministic private identifier in the format:

```
private_src_{slug}_{hash}
```

- **slug**: Normalized display name (max 24 characters, lowercase, dash-separated)
- **hash**: 12-character hex hash of the scope (`type|url|contract|operationKey`)

This ensures the same operation always produces the same identifier, while different source URLs or operations produce unique identifiers.

You can check if a warp was generated from a source using:

```typescript
import { isGeneratedSourcePrivateIdentifier } from '@joai/warps'

if (isGeneratedSourcePrivateIdentifier(warp.meta?.identifier)) {
  // This warp was generated from an OpenAPI or ABI source
}
```

## How It Works

1. The OpenAPI spec's `paths` object is parsed to extract operations (GET, POST, PUT, DELETE)
2. For each operation:
   - Path, query, and request body parameters are extracted and typed
   - A URL is constructed with <span v-pre>`{{paramName}}`</span> template syntax for path parameters
   - A Warp with a `collect` action is created
   - POST/PUT operations with request bodies get `Content-Type: application/json` headers
3. A deterministic identifier is generated from the source URL and operation key
4. Warp metadata is stamped with the identifier and chain info
