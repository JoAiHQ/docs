# Sites

Sites are website instances belonging to a team. A team can have many sites.

## With or without a brand

A site can optionally link a Warp **brand** (`brandSlug`):

- **With brand** — live app on sites.joai.ai at `/{teamSlug}/{brandSlug}`
- **Without brand** — site record only (e.g. agency portfolio / external websites), with optional client contact, metrics source/resource, and monthly reports

Create without a brand from **Sites → Create site**, or via `POST /v1/sites` / warp `joai/site-create` with `team` + `slug`. Provisioning a brand still creates/links a brand-backed site (`joai/site-provision`).

Install **Sites** under **Team settings → Apps**, then open **Sites** in the sidebar (`/sites`).

## Overview

- Many **sites** per team (`slug` is unique per team)
- Brand-backed sites: live URL on **sites.joai.ai** (optional custom domain on premium)
- Brandless sites: portfolio records, contact linkage, metrics source + resource, optional monthly report
- Edit **CMS content** and **elements** on brand-backed sites
- Same Warps power the browser UI and agent MCP calls — no duplicate logic
- Pair with [Appointments](/apps/appointments) for booking brands, [Forms](/apps/forms) for intake, [Contracts](/apps/contracts) for on-chain apps

## URL structure

Brand-backed sites (production):

```
https://sites.joai.ai/{teamSlug}/{brandSlug}
https://sites.joai.ai/{teamSlug}/{brandSlug}/configure
```

| Environment | Host |
| --- | --- |
| Mainnet | `sites.joai.ai` |
| Testnet | `testnet-sites.joai.ai` |
| Devnet | `devnet-sites.joai.ai` |

Optional **custom domain** (premium, brand-backed sites): point a CNAME at the Sites host for your environment. See [Public surfaces](/apps/public-surfaces).

Brandless sites are **not** published on sites.joai.ai.

## In the app

### Site manager (`/sites`)

1. Install **Sites**
2. Open **Sites**
3. **Create site** (slug only) for portfolio / external sites, or use **Add brand** for live Warp brands
4. Per site:
   - Toggle **enabled**
   - Link a **contact** and a **metrics source** + **resource** (same pair as `metrics-query`)
   - Optionally enable **monthly report** (platform job on the 1st at 09:00; queues last month’s requests and page views for approval via the same contact-message warp as campaigns — not “visitors”)
5. Per brand-backed site:
   - **Add brand** → provision missing brands, then copy/open the public URL
   - Set **custom domain** (premium) and follow CNAME instructions
6. Open **Content** (`/sites/content`) for CMS pages and elements

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

Related Warps: `joai/site-create`, `joai/site-update`, `joai/site-provision`, `joai/metrics-query`, `joai/contact-message-send` (monthly reports queue this warp for approval, same path as campaigns).

Live schemas: `tools/list`. See [MCP](/protocols/mcp) and [SKILL.md](https://joai.ai/SKILL.md).

## Building your own brand

1. Add `joai--warps/warps/{brand}/`
2. Create `brand.ts` with a `site` config
3. Publish the brand catalog
4. Teams enable the site from Sites settings

See contributor docs in `joai--warps`.
