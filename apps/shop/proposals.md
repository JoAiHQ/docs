# Client proposals

A client proposal is a configurable, shareable scope created after a discovery conversation. It is not a Document and it is not yet a formal quote.

## How it works

1. Compose a proposal for one JoAi contact from the team’s existing services or product variations. A coupon can be attached when it applies.
2. Mark foundation work as required. The client can review it but cannot remove it. Optional items remain selectable on the shared page.
3. Share the private link returned by the API. When an access code is configured, pass it only via the `X-Proposal-Password` header on the public endpoints.
4. The client reviews the selection in a confirmation dialog, then confirms once.
5. JoAi creates exactly one quote order with the chosen items and sends the quote-confirmation email to the contact, including a quote PDF.

Confirmation is idempotent: retrying the same confirmation returns the existing converted proposal and does not create a second quote.

## Quote behavior

A quote is a pre-order, not an invoice:

- No invoice number or invoice PDF is created at quote time.
- No subscription is created, even when the selected services are recurring.
- Inventory is not reserved at quote time.

The quote becomes an order when the team accepts/confirms it through the normal order status flow. Inventory, invoice, and billing behavior then apply according to the team’s stock and payment configuration.

## API and SDK

Authenticated team members can create, list, inspect, update, archive, publish, and delete proposals. Item editing is available through a dedicated item API. Team stats are available at `GET /v1/proposals/stats` (`totalCount`, `sentCount`, `convertedCount`, `pipelineValueCents`). Responses include a ready-to-share `shareUrl`; use it instead of constructing the URL yourself.

Proposal endpoints:

- `POST /v1/proposals` — create a proposal
- `GET /v1/proposals` — list proposals (archived proposals are hidden unless `includeArchived=true`)
- `GET /v1/proposals/{id}` — read one proposal with its items
- `PUT /v1/proposals/{id}` — update proposal metadata
- `DELETE /v1/proposals/{id}` — delete a draft, expired, or archived proposal
- `POST /v1/proposals/{id}/archive` — archive an editable proposal
- `POST /v1/proposals/{id}/publish` — mark a proposal ready to share; does not send an email
- `PUT /v1/proposals/{id}/items` — replace the complete item list
- `POST /v1/proposals/{id}/items` — add one item
- `PUT /v1/proposals/{id}/items/{itemId}` — update one item
- `DELETE /v1/proposals/{id}/items/{itemId}` — remove one item

Item price overrides are in cents. A proposal must keep at least one item. Removing the last member of a choice group clears that group.

Proposal admin endpoints are team-scoped. Create the client with the active team once and omit team arguments from the calls:

```ts
import { createClient } from '@joai/sdk'

const client = createClient({ apiToken, team })
client.proposals.create(input)
client.proposals.list({ page, perPage })
client.proposals.stats()
client.proposals.get(id)
client.proposals.archive(id)
client.proposals.publish(id)
client.proposals.delete(id)
client.proposals.setItems(id, items)
client.proposals.addItem(id, item)
client.proposals.updateItem(id, itemId, input)
client.proposals.removeItem(id, itemId)
client.proposals.getShared(slug, password?)
client.proposals.confirm(slug, password?, itemIds)
```

The client-facing endpoints are `GET /v1/proposals/shared/{slug}` and `POST /v1/proposals/shared/{slug}/confirm`.

## For agents (MCP)

Requires the **Shop** app. Proposal tools are part of Shop admin tooling:

| Tool | Purpose |
| --- | --- |
| `create_client_proposal` | Create a proposal from service/product variation IDs. Returns `id` and `shareUrl`; does **not** create a quote. |
| `list_client_proposals` | List proposals with status (`draft`, `sent`, `converted`, `expired`, `archived`) and `quoteId`. |
| `get_client_proposal` | Read one proposal with its items, status, share URL, and quote. |
| `set_client_proposal_items` | Replace the complete item list, for example to restructure a proposal or dissolve choice groups. |
| `add_client_proposal_item` | Add one service or product variation to a proposal. |
| `update_client_proposal_item` | Update required flag, quantity, minimum term, choice group, position, or price override. |
| `remove_client_proposal_item` | Remove one item. The last remaining item cannot be removed. |
| `archive_client_proposal` | Hide an editable proposal from the default list and public share page. |
| `publish_client_proposal` | Mark a proposal ready to share. This does not send an email. |
| `delete_client_proposal` | Delete a draft, expired, or archived proposal. Sent, converted, and quoted proposals cannot be deleted. |

Key inputs for `create_client_proposal`: `contactId`, `title`, `items` (`id`, `type: service|productVariation`, `required`, optional `quantity`/`position`/`minimumTermDays`/`choiceGroup`), optional `objective`, `intro`, `nextStep`, `agreements`, `couponId`, `validUntil`, `password`, and `send` (default `true`).

Item tools use `proposalId` plus `items` or `itemId`. `price` is an optional unit-price override in cents. `update_client_proposal_item` accepts `null` for `minimumTermDays`, `choiceGroup`, or `price` to clear the value and restore the catalog price for `price`.

Use the returned `shareUrl`; do not rebuild it. There is no MCP confirm tool — the client confirms on the public page, which creates the single quote idempotently.

## Shared page

The API returns a ready-to-share `shareUrl` for each proposal, pointing at JoAi's first-party offer page: `/{locale}/proposals?proposal={slug}`. Always use the value returned by `create_client_proposal` or `GET /v1/proposals`.

The shared page renders the proposal copy in the team’s language (no per-visitor language switcher), with the required/optional items. Required items are locked; optional items are selectable. Confirmation opens a summary of the selection before submitting. Converted proposals expose `selectedItemIds` so a revisit shows the accepted selection.

A `403` response includes `requiresPassword`: `true` means the access code is missing or wrong; `false` means the proposal is unavailable or expired, so do not show the password prompt.

Do not construct or rewrite the share URL. JoAi hosts the offer page and renders it with the team's branding and language.

## Automating from discovery notes

Use the **Create a client proposal** JoAi action after the notes have been reviewed. It accepts a contact, catalog item IDs, required flags, tailored copy, an optional coupon, expiry, and access code.

Prefer composing existing services/product variations over duplicating catalog data, and never invent contacts or customer emails for tests.
