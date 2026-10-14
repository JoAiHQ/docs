# Contacts

Contacts is the CRM native app: people and companies you work with, their properties, activities, and segments. Install **Contacts** under **Team settings → Apps**, then open **Contacts** in the sidebar. Points and wallet passes live in the separate [Loyalty](/apps/loyalty) app.

## Overview

- Store **name, email, phone**, tags, avatars, and custom properties
- Log **activities**, view **timeline**, and browse **memories** / **orders** on a contact
- Link contacts with **relations** — family, social, organization, business, and referrals
- Message contacts (email / WhatsApp / SMS when integrations allow)
- Build **segments** for [Campaigns](/campaigns) audiences (segment UI lives under Campaigns)
- Per-contact **Loyalty** membership when [Loyalty](/apps/loyalty) is installed
- Agents manage contacts over **MCP** — always prefer find-or-create over blind create; leave **company** empty unless verified

## In the app

### List

1. Open **Contacts**
2. Search; filter by tags; use overdue / waiting / engagement filters when shown
3. Create a contact or open an existing one

On **mobile**, you can import from the device address book when available (not a CSV bulk import).

### Contact profile

| Area | What it shows |
| --- | --- |
| **Details** | Name, email, phone, tags, social links, consent, custom properties |
| **Activity / timeline** | Logged activities and history (notes, calls, meetings, messages, orders, loyalty, …) |
| **Memories** | Agent memories tied to the contact |
| **Orders** | Shop orders for this contact (when [Shop](/apps/shop) is installed) |
| **Loyalty** | Membership, points, enroll / add / redeem / adjust / history |
| **Relations** | Links to other contacts — family, social, organization, business, referrals |
| **Send message** | Reach out on an available channel |

### Relationships between contacts

Contacts can be linked to each other with a typed relation, which lets you model family trees, friendships, company structures, business networks, and referral chains. Add and remove them from a contact’s **Relations** tab; links are grouped by category, and clicking one opens the linked contact.

| Group | Relation types |
| --- | --- |
| **Family** | `parent_of`, `child_of`, `spouse_of`, `sibling_of`, `aunt_of`, `nibling_of` (niece/nephew) |
| **Social** | `friend_of` |
| **Organization** | `manages`, `reports_to`, `colleague_of` |
| **Business** | `partner_of`, `client_of`, `supplier_of` |
| **Referral** | `referred_by`, `referred` |

Relations are **read from the first contact’s point of view** and stored once in a canonical direction:

- `parent_of` means the first contact is the parent of the second
- `referred_by` means the second contact referred the first
- Adding the inverse (for example `child_of` where `parent_of` already exists) reuses the same link instead of creating a duplicate
- Both contacts must belong to the same team

Each relation appears on both contacts, with the type shown from that contact’s perspective. Each relation can also carry an optional short **note** — for example how the two people met or what a referral was about — which you can add or edit inline. Agents (MCP) can additionally change a relation’s type or clear its note.

### Segments

Reusable audiences for campaigns. **Create and manage segments in [Campaigns](/campaigns)** (list + inline creator while building a campaign). MCP segment tools still require the **Contacts** app installed.

### Loyalty

Program settings, scanner, and members live in **[Loyalty](/apps/loyalty)**. On a contact’s **Loyalty** tab you can still enroll, add/redeem points, adjust balances, and view history when Loyalty is installed.

## Never create duplicates

Creating a second contact for the same person is a data-integrity failure.

- Pass **email and/or phone** whenever known
- Prefer find-or-create (warps / MCP flows) over blind create
- If a contact exists, **update** missing fields — do not invent a second row
- Social inbound (Instagram comments, Telegram, …) matches an existing contact by profile URL, username handle, or a **unique** name before creating a new row
- When two rows still exist for one person, **merge** the thin duplicate into the fuller contact

### Merge contacts

Open a contact → **Merge** → pick the contact to keep. Activities, conversations, tags, and social links move onto the keeper; empty fields are filled from the duplicate; the duplicate is deleted.

Agents: `joai-contact-merge` / MCP merge tool — pass the duplicate as `contactId` and the keeper as `intoId`.

## Research before creating from thin context

When an inbound message or a name-only lead is all you have:

1. Research may fill **verified** employer, title, website, and socials — never invent them
2. Put networking groups, events, communities, and interests in **tags** or **notes** — never in **company**
3. Leave fields empty when unsure — a sparse accurate contact beats a wrong one

## For agents (MCP)

Requires the **Contacts** app.

| Tool | Purpose |
| --- | --- |
| `list_contacts` / `create_contact` / `update_contact` / `delete_contact` | CRUD |
| `joai-contact-merge` (warp) | Absorb a duplicate into another contact |
| `set_contact_property` | Custom properties |
| `create_contact_activity` / `list_contact_activities` / `delete_contact_activity` | Activities |
| `list_contact_timeline` | Timeline |
| `create_contact_relation` / `list_contact_relations` / `update_contact_relation` / `delete_contact_relation` | Link contacts, change a relation’s type, add notes, or remove a relation |
| `list_segments` / `create_segment` / `delete_segment` | Segments (no `update_segment` — edit in Campaigns UI) |

Warps such as `joai-contact-find-or-create` are preferred for onboarding. Pass `team` when operating outside the agent’s default team.

Sending a message to a contact is UI/HTTP today (no dedicated MCP send-message tool in the contacts catalog).

Live schemas: `tools/list`. See [MCP](/protocols/mcp) and [SKILL.md](https://joai.ai/SKILL.md).

## Tips

- Tag consistently — tags power filters and segments (Automations enroll from props/segments/webhooks, not tags alone)
- Use segments for recurring [campaign](/campaigns) audiences and [automation](/automations) segment triggers
- Attach contacts to [Shop](/apps/shop) orders and [Forms](/apps/forms) submissions
- CLI also supports contacts — see [CLI](/cli)

## Related

- [Native apps](/apps/)
- [Campaigns](/campaigns)
- [Automations](/automations)
- [Forms](/apps/forms)
- [Loyalty](/apps/loyalty)
- [Shop](/apps/shop)
- [Public surfaces](/apps/public-surfaces)
- [Teams](/teams)
