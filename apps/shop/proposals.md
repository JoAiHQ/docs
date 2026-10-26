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

Authenticated team members can create and list proposals through `POST /v1/proposals` and `GET /v1/proposals`. The response includes a ready-to-share `shareUrl`; use it instead of constructing the URL yourself.

The SDK exposes the same interface:

```ts
client.proposals.create(team, input)
client.proposals.list(team)
client.proposals.getShared(slug, password?)
client.proposals.confirm(slug, password?, itemIds)
```

The client-facing endpoints are `GET /v1/proposals/shared/{slug}` and `POST /v1/proposals/shared/{slug}/confirm`.

## For agents (MCP)

Requires the **Shop** app. Proposal tools are part of Shop admin tooling:

| Tool | Purpose |
| --- | --- |
| `create_client_proposal` | Create a proposal from service/product variation IDs. Returns `id` and `shareUrl`; does **not** create a quote. |
| `list_client_proposals` | List proposals with status (`draft`, `sent`, `converted`, `expired`) and `quoteId`. |

Key inputs for `create_client_proposal`: `contactId`, `title`, `items` (`id`, `type: service|productVariation`, `required`, optional `quantity`/`position`), optional `objective`, `intro`, `nextStep`, `couponId`, `validUntil`, `password`, and `send` (default `true`).

Use the returned `shareUrl`; do not rebuild it. There is no MCP confirm tool — the client confirms on the public page, which creates the single quote idempotently.

## Shared page

The API returns a ready-to-share `shareUrl` for each proposal. The host and route are configured by the frontend deployment, not by JoAi. Treat the URL as opaque and always use the value returned by `create_client_proposal` or `GET /v1/proposals`.

The shared page renders the proposal copy in the team’s language (no per-visitor language switcher), with the required/optional items. Required items are locked; optional items are selectable. Confirmation opens a summary of the selection before submitting.

Do not construct or rewrite the share URL. Use the API value so environment and deployment routing stay correct.

DNS and hosting are deployment responsibilities; JoAi stores the proposal data.

## Automating from discovery notes

Use the **Create a client proposal** JoAi action after the notes have been reviewed. It accepts a contact, catalog item IDs, required flags, tailored copy, an optional coupon, expiry, and access code.

Prefer composing existing services/product variations over duplicating catalog data, and never invent contacts or customer emails for tests.
