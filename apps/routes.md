# Routes

Routes is the ordered-tour native app. A route is a team-owned sequence of stops, and every stop references a place from [Places](/apps/places).

Install **Routes** under **Team settings → Apps**. Routes depends on Places for its stop picker, and its MCP tools require both apps installed.

## What it does

- Builds ordered routes through a team’s places
- Stores per-stop day, duration, leg mode and localized notes
- Keeps route media, tags, translations and publication state
- Exposes public route data and ordered stops to apps and agents

It does not duplicate place data. Stop resources resolve the current place, address, coordinates, cover and Google guide.

## API

| Method | Endpoint | Purpose |
| --- | --- | --- |
| `GET` | `/v1/routes` | Routes (`team`, `city`, `tag`, `search`, `limit`, `page`); team members with view access also receive hidden and scheduled routes |
| `GET` | `/v1/routes/{slug}` | One route with ordered stops; hidden and scheduled routes are returned to team members with view access |
| `POST` | `/v1/routes` | Create a route |
| `PATCH` | `/v1/routes/{route}` | Update route fields, visibility or media |
| `DELETE` | `/v1/routes/{route}` | Delete a route and its stops |
| `POST` | `/v1/routes/{route}/stops` | Append a place as a stop |
| `PATCH` | `/v1/route-stops/{routeStop}` | Update stop day, duration, leg mode, notes or meta |
| `DELETE` | `/v1/route-stops/{routeStop}` | Remove a stop and renumber the rest |
| `PUT` | `/v1/routes/{route}/stops/order` | Set the order of every stop |

Route and stop identifiers are hashids. Write endpoints require team-manage permission and a place from the same team. List and detail requests are permission-aware: with a valid session or agent key, team members with view access receive hidden and scheduled routes; everyone else gets only published routes.

## SDK

```ts
const routes = await client.routes.list({ team: 'hollabrunn-digital', city: 'Hollabrunn' })
const route = await client.routes.get('kellergassen-route', { team: 'hollabrunn-digital' })

await client.routes.addStop(route.id, {
  placeId: 'place_hashid',
  day: 1,
  durationMinutes: 30,
  legMode: 'walk',
  notes: 'Start at the main square',
})

await client.routes.reorderStops(route.id, [
  { id: 'stop_hashid_2', position: 1 },
  { id: 'stop_hashid_1', position: 2 },
])
```

## MCP

Requires **Routes** and **Places** installed.

| Tool | Purpose |
| --- | --- |
| `list_routes` | List routes; hidden included with team access |
| `get_route` | Load one route with stops (hidden routes included with team access) |
| `create_route` | Create a route |
| `update_route` | Update fields, visibility or media |
| `delete_route` | Delete a route |
| `add_route_stop` | Append a place as a stop |
| `update_route_stop` | Update stop metadata |
| `remove_route_stop` | Remove a stop |
| `reorder_route_stops` | Set the complete stop order |

Live schemas: `tools/list`. See [MCP](/protocols/mcp) and [SKILL.md](https://joai.ai/SKILL.md).

## Related

- [Native apps](/apps/)
- [Places](/apps/places)
- [Appointments](/apps/appointments)
- [Teams](/teams)
