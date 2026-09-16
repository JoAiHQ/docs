# Contacts

Contacts is the CRM native app: people and companies you work with, their properties, activities, segments, and optional loyalty. Install **Contacts** under **Team settings → Apps**, then open **Contacts** in the sidebar.

## Overview

- Store **name, email, phone**, tags, avatars, and custom properties
- Log **activities**, view **timeline**, and browse **memories** / **orders** on a contact
- Link contacts with **relations** — family, organization, business, and referrals
- Message contacts (email / WhatsApp / SMS when integrations allow)
- Build **segments** for [Campaigns](/campaigns) audiences (segment UI lives under Campaigns)
- Optional **loyalty** program, scanner, and customer wallet passes
- Agents manage contacts over **MCP** — always prefer find-or-create over blind create

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
| **Relations** | Links to other contacts — family, organization, business, referrals |
| **Send message** | Reach out on an available channel |

### Relationships between contacts

Contacts can be linked to each other with a typed relation, which lets you model family trees, company structures, business networks, and referral chains. Add and remove them from a contact’s **Relations** tab; links are grouped by category, and clicking one opens the linked contact.

| Group | Relation types |
| --- | --- |
| **Family** | `parent_of`, `child_of`, `spouse_of`, `sibling_of` |
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

Open **Contacts** in the sidebar → **Loyalty** tab (scanner button is in the Contacts header):

| Area | What you configure |
| --- | --- |
| **Members** | Enrolled contacts, points, tier, last activity |
| **Rewards** | Redeemable rewards (`discount_amount`, `discount_percent`, `free_item`, …) |
| **Tiers** | Min points, multiplier, color, benefits |
| **Promotions** | Time-bound bonus accrual rules |
| **Settings** | Point name; accrual `per_visit` / `per_spend` / `per_item` / `per_category`; min spend; point expiry months |
| **Scanner** | Native **Loyalty scanner** (QR stamp) on supported devices |

On a contact’s **Loyalty** tab you can enroll, add/redeem points, adjust balances, and view history.

#### Customer pass

Members get a public pass page:

```
https://store.joai.ai/{locale}/pass/{contactId}
```

The pass shows points, tier, next reward, a QR code, and **Add to Apple Wallet / Google Wallet** when generation succeeds. See [Public surfaces](/apps/public-surfaces).

There are **no loyalty MCP tools** today — manage loyalty in the UI or via HTTP/SDK.

## Never create duplicates

Creating a second contact for the same person is a data-integrity failure.

- Pass **email and/or phone** whenever known
- Prefer find-or-create (warps / MCP flows) over blind create
- If a contact exists, **update** missing fields — do not invent a second row

## For agents (MCP)

Requires the **Contacts** app.

| Tool | Purpose |
| --- | --- |
| `list_contacts` / `create_contact` / `update_contact` / `delete_contact` | CRUD |
| `set_contact_property` | Custom properties |
| `create_contact_activity` / `list_contact_activities` / `delete_contact_activity` | Activities |
| `list_contact_timeline` | Timeline |
| `create_contact_relation` / `list_contact_relations` / `update_contact_relation` / `delete_contact_relation` | Link contacts, change a relation’s type, add notes, or remove a relation |
| `list_segments` / `create_segment` / `delete_segment` | Segments (no `update_segment` — edit in Campaigns UI) |

Warps such as `joai-contact-find-or-create` are preferred for onboarding. Pass `team` when operating outside the agent’s default team.

Sending a message to a contact is UI/HTTP today (no dedicated MCP send-message tool in the contacts catalog).

Live schemas: `tools/list`. See [MCP](/protocols/mcp) and [SKILL.md](https://joai.ai/SKILL.md).

## Tips

- Tag consistently — tags power filters, segments, and automations
- Use segments for recurring [campaign](/campaigns) audiences
- Attach contacts to [Shop](/apps/shop) orders and [Forms](/apps/forms) submissions
- CLI also supports contacts — see [CLI](/cli)

## Related

- [Native apps](/apps/)
- [Campaigns](/campaigns)
- [Forms](/apps/forms)
- [Shop](/apps/shop)
- [Public surfaces](/apps/public-surfaces)
- [Teams](/teams)
