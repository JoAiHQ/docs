# Sites

Sites turns Warp brands into live, branded web apps — booking pages, intake flows, CMS content, and more. Install **Sites** under **Team settings → Apps**, then open **Sites** in the sidebar (`/sites`).

## Overview

- Enable a **site** per brand for your team
- Public URL on **sites.joai.ai** (optional custom domain on premium)
- Edit **CMS content** and **elements** (pages, sections, variations)
- Same Warps power the browser UI and agent MCP calls — no duplicate logic
- Pair with [Appointments](/apps/appointments) for booking brands, [Forms](/apps/forms) for intake, [Contracts](/apps/contracts) for on-chain apps

## URL structure

Production:

```
https://sites.joai.ai/{teamSlug}/{brandSlug}
https://sites.joai.ai/{teamSlug}/{brandSlug}/configure
```

| Environment | Host |
| --- | --- |
| Mainnet | `sites.joai.ai` |
| Testnet | `testnet-sites.joai.ai` |
| Devnet | `devnet-sites.joai.ai` |

Optional **custom domain** (premium): point a CNAME at the Sites host for your environment. See [Public surfaces](/apps/public-surfaces).

> Older docs that mentioned `joai.ai/sites/{agent}` are outdated — Sites are team + brand path URLs on the Sites host.

## In the app

### Site manager (`/sites`)

1. Install **Sites**
2. Open **Sites**
3. Create / list sites for brands available to the team
4. Per site:
   - Copy or open the public URL
   - Toggle **enabled**
   - Set **custom domain** (premium) and follow CNAME instructions
5. Open **Content** (`/sites/content`) for CMS pages and elements

### Content and elements (`/sites/content`)

From Sites → **Content**:

1. **Create content** with a field schema (structured page data)
2. Edit drafts; **preview** before going live
3. **Publish** or **rollback** to a previous version
4. Manage **elements** and **variations** (reusable blocks; generate variations when supported)

These map 1:1 to the Sites MCP tools below.

### How routes work (brand config)

Brand configs in `joai--warps` map URL paths to Warps:

```json
{
  "enabled": true,
  "auth": false,
  "indexPath": "/",
  "routes": [
    { "path": "/", "warp": "book", "label": { "en": "Book" }, "nav": true },
    { "path": "/configure", "warp": "configure", "label": { "en": "Settings" }, "nav": false }
  ]
}
```

Warps can be standard collect/action forms or **Warp UI (ChatApps)** embedded with the MCP App Bridge (calendars, wizards, multi-step flows).

Team identity (name, logo, colors) comes from team / brand settings automatically.

## Authentication

When `auth: true` is set in the brand config, visitors sign in with JoAi branding. After login, the session token is passed to Warp actions for gated data. New users can sign up on the sign-in page; wallet and agent can be provisioned on first visit when required by the flow.

## AI-native by design

Every Warp behind a route is callable by agents via MCP / `execute`. A booking page that works in the browser also works when an agent books on the user’s behalf.

## From smart contract to app

1. Deploy a contract → generate Warps from ABI
2. Tune labels / hidden fields / gas
3. Define `brand.ts` `site` routes
4. Publish the brand
5. Enable the site for the team → live at `sites.joai.ai/{team}/{brand}`

See [Contracts](/apps/contracts) and [ChatApps](/chatapps).

## For agents (MCP)

Requires the **Sites** app.

| Tool | Purpose |
| --- | --- |
| `list_contents` / `get_content` / `create_content` / `update_content` | CMS pages |
| `preview_content` / `publish_content` / `rollback_content` | Lifecycle |
| `list_content_versions` | Version history |
| `list_elements` / `create_element` / `update_element` / `delete_element` | Elements |
| `list_element_variations` / `generate_element_variation` / `update_element_variation` / `delete_element_variation` | Variations |

Live schemas: `tools/list`. See [MCP](/protocols/mcp) and [SKILL.md](https://joai.ai/SKILL.md).

## Building your own brand

1. Add `joai--warps/warps/{brand}/`
2. Create `brand.ts` with a `site` config
3. Add Warp definitions (or generate from ABI)
4. Publish to the catalog
5. Agents/teams that install the brand can enable the site

## Related

- [Native apps](/apps/)
- [Public surfaces](/apps/public-surfaces)
- [Appointments](/apps/appointments)
- [Forms](/apps/forms)
- [ChatApps](/chatapps)
- [Contracts](/apps/contracts)
- [Warps](/warps/general)
