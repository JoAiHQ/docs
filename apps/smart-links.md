# Smart Links

Smart Links create branded short links with tracking — useful for campaigns, QR codes, store deep links, and per-table kiosk codes. Install **Smart Links** under **Team settings → Apps**, then open **Smart Links** in the sidebar (`/links`).

## Overview

- Create a link with a **title** and destination **URL**
- Optional **templates** (e.g. kiosk QR with placeholders)
- Create **variations** (e.g. one QR per table) with substituted values
- Copy short URLs; review usage from the links overview
- Plan limits apply — upgrade nudge when the link quota is reached

## In the app

1. Install **Smart Links**
2. Open **Smart Links** (`/links`)
3. Create a link (custom URL or start from a template)
4. If the template supports variations (kiosk tables), generate the next table QR after create
5. Copy short URLs for print / digital share
6. Review stats on the overview

Plan limits apply — when you hit the link quota, create shows an **upgrade** nudge instead of another link.

### Kiosk QR template

Built-in template builds a store kiosk URL shaped like:

```
https://store.joai.ai/en/{teamSlug}/kiosk?table={{table}}&lid={{link_variation_id}}
```

After create, use **Create Table N** to mint a variation (`table` value + unique `lid`). Print one QR per table. See [Kiosk](/kiosk).

### Forms and other apps

[Forms](/apps/forms) can generate a smart-link QR from form actions when Smart Links is available. [Campaigns](/campaigns) and marketing shares often use the same short URLs.

## For agents

There is **no dedicated Smart Links block** in the MCP access catalog today. Agents typically:

- Call the `joai-link-create` warp via `execute`, or
- Use the HTTP API (`v1/links`) with an API token

See [API](/api), [Warps](/warps/general), and [SKILL.md](https://joai.ai/SKILL.md).

## Related

- [Native apps](/apps/)
- [Kiosk](/kiosk)
- [Shop](/apps/shop)
- [Forms](/apps/forms)
- [Campaigns](/campaigns)
- [Public surfaces](/apps/public-surfaces)
