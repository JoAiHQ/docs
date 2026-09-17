# News

News publishes customer-facing **updates** (deals, events, news posts). Install **News** under **Team settings → Apps**, then open **News** in the sidebar (product route label: **Updates**).

Installing News unlocks the Updates UI. MCP update tools are gated by **Board** (usually already installed) — News alone does not add a separate MCP gate.

## Overview

- Create updates with title, body, images, optional link, and schedule window
- Types: **deal**, **event**, **news**
- Statuses: **draft**, **published**, **archived**
- Published updates can surface on the **storefront** (including store **events** listings) and brand [Sites](/sites) where configured

## In the app

1. Install **News**
2. Open **News** / **Updates**
3. Create an update — pick type and status
4. Add media, link URL, and start/end times when relevant (events / deals)
5. Publish when ready; archive when finished
6. Review the overview list (status badges)

### Types

| Type | Typical use |
| --- | --- |
| **deal** | Promotions and offers |
| **event** | Time-bound happenings (use starts / ends) |
| **news** | General announcements |

### Statuses

| Status | Meaning |
| --- | --- |
| **draft** | Not public |
| **published** | Live on configured public surfaces |
| **archived** | Hidden from active feeds |

## Public surfaces

Published updates appear on `store.joai.ai` team pages (catalog / events areas) and other brand surfaces when those apps are installed. See [Public surfaces](/apps/public-surfaces) and [Shop](/apps/shop).

## For agents (MCP)

Update tools are gated by the **Board** app in MCP:

`list_updates`, `create_update`, `update_update`, `delete_update`, `get_update_stats`

`list_updates` mirrors `@joai/sdk` `client.updates.list`:

- `tags` (e.g. `hollabrunn-digital`) — city-wide public feed across teams; `team` not required
- `team` — scope to one team slug
- Optional: `type` (`deal` | `event` | `news`), `status`, `active` (default true), `with` (e.g. `["team"]`)

Install Board (usually already present) and call these tools, or manage updates in the News UI.

Live schemas: `tools/list`. See [MCP](/protocols/mcp).

## Related

- [Native apps](/apps/)
- [Board](/apps/board)
- [Shop](/apps/shop)
- [Sites](/sites)
- [Campaigns](/campaigns)
- [Public surfaces](/apps/public-surfaces)
