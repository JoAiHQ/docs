# Places

Places is the map-and-location native app. A team can keep **many places** — sights, businesses, playgrounds, viewpoints, venues — each with its own address, coordinates, opening hours, tags, and media.

Install **Places** under **Team settings → Apps**, then open **Places** in the sidebar. Agents only receive the Places MCP tools while the app is installed on the team.

## What it does

- Keeps a team-owned catalogue of places with stable slugs
- Stores public opening hours, address, coordinates, timezone, category, and tags
- Holds cover, gallery, audio-guide, and 3D-model media per place
- Publishes places to the public catalogue, hides them, or schedules them with `publishedAt`
- Feeds maps, city portals, and agents from one API instead of per-app constants

Places are **team-scoped, not policy-scoped**. There is no “primary place” on the appointment policy; a team can have as many places as it needs. Opening hours belong to the place; bookable availability belongs to [Appointments](/apps/appointments).

A place is the **subject or location**, not the organisation. Phone and website are place-specific (a venue’s own contact details), so they are independent from the team’s contact details. Team-level fields such as logo, socials, billing, and plan stay on the team. Do not add an email field to places; contact email remains a team/contact concern.

## In the app

1. Open **Places**
2. Add a place with name, slug, address, city, coordinates, and tags
3. Upload a **cover** and **gallery** photos
4. Publish or hide it from the public catalogue

| Field | Notes |
| --- | --- |
| **Slug** | Stable within the team; used by the public detail endpoint |
| **Name / tagline / description** | Tagline and description are stored in the team locale |
| **Coordinates** | Latitude, longitude, optional altitude |
| **Address** | Street, postal code, city, country, timezone |
| **Tags** | Free-form labels such as `poi`, `viewpoint`, `playground` |
| **Contact** | Optional place-specific website and phone; not copied from the team |
| **Opening hours** | JSON: provider `periods` or weekday ranges |
| **Media** | `cover` (one), `gallery`, `audio`, `models` |
| **Visibility** | `public` plus optional `publishedAt` |

## Opening hours vs. appointment availability

These are deliberately separate:

- **Place opening hours** say when the venue is open to visitors. They are display data and may come from Google.
- **Appointment policy availability** says when staff accepts bookings. It stays narrower: notice periods, buffers, slot intervals, blocked dates, holidays, capacity, and per-agent rules.

Opening hours are display data and are not copied into the appointment policy. Bookable availability is configured separately under [Appointments](/apps/appointments).

## API

| Method | Endpoint | Purpose |
| --- | --- | --- |
| `GET` | `/v1/places` | Public catalogue (`team`, `city`, `tag`, `search`, `limit`, `page`) |
| `GET` | `/v1/places/{slug}` | One published place; add `team` when slugs collide |
| `GET` | `/v1/places/manage?team={team}` | Every place of a team, including hidden and scheduled (team-manage) |
| `GET` | `/v1/places/providers` | Searchable import providers and labels (team-manage) |
| `GET` | `/v1/places/search?team={team}&provider={provider}&query={query}` | Search an external provider for a place to import (team-manage) |
| `POST` | `/v1/places/import` | Import a provider place by `provider` + `sourceId` (team-manage) |
| `POST` | `/v1/places` | Create a place (team-manage) |
| `PATCH` | `/v1/places/{id}` | Update fields, visibility, or media (team-manage) |
| `DELETE` | `/v1/places/{id}` | Delete a place and its media attachments (team-manage) |

Providers are abstracted: the Places domain does not branch on `google`. Add a provider by implementing the provider contract and registering it; search, import and refresh then work for it.

Media is passed on create and update, not through a separate endpoint:

```json
{
  "cover": ["media_hashid"],
  "gallery": ["media_hashid_1", "media_hashid_2"],
  "audio": [],
  "models": []
}
```

An empty array on update clears that collection. Media must belong to the same team.

Public responses expose `cover`, `gallery`, `audio`, and `models` URLs, plus the team summary. Hidden and future-dated places are excluded from the public list and detail endpoints.

## SDK

```ts
const places = await client.places.list({ team: 'hollabrunn-digital', city: 'Hollabrunn' })
const place = await client.places.get('koliskowarte', { team: 'hollabrunn-digital' })

await client.places.create({
  team: 'hollabrunn-digital',
  slug: 'koliskowarte',
  name: 'Koliskowarte',
  lat: 48.551522,
  lng: 16.108019,
  address: 'Kirchenwald, 2020 Hollabrunn',
  city: 'Hollabrunn',
  tags: ['poi', 'viewpoint'],
  cover: ['media_hashid'],
})

await client.places.update(place.id, { public: false, gallery: [] })

const providers = await client.places.providers()
const results = await client.places.search({ team: 'hollabrunn-digital', provider: 'google', query: 'Hauptplatz' })
await client.places.import({ team: 'hollabrunn-digital', provider: 'google', sourceId: results.data[0].sourceId })
```

Staff lists use `client.places.listManaged({ team })`; public catalogues use `list()`.

## For agents (MCP)

Requires **Places** installed.

| Tool | Purpose |
| --- | --- |
| `list_places` | List team places, including hidden and scheduled ones |
| `get_place` | Load one place by slug |
| `create_place` | Create a place with coordinates, tags, and media IDs |
| `update_place` | Update fields, publish/hide, or replace media |
| `delete_place` | Delete a place |

Media hashids are uploaded first (`media_upload`) and then passed to `create_place` / `update_place`. Live schemas: `tools/list`. See [MCP](/protocols/mcp) and [SKILL.md](https://joai.ai/SKILL.md).

## Related

- [Native apps](/apps/)
- [Appointments](/apps/appointments)
- [Teams](/teams)
- [Public surfaces](/apps/public-surfaces)
- [MCP](/protocols/mcp)
