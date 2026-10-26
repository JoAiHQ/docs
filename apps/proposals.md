# Client proposals

A client proposal is a configurable, shareable scope created after a discovery conversation. It is not a Document and it is not yet a formal quote.

## How it works

1. Compose a proposal for one JoAi contact from the team’s existing services or product variations. A coupon can be attached when it applies.
2. Mark foundation work as required. The client can review it but cannot remove it. Optional items remain selectable on the shared page.
3. Share the private link, with a separate access code when one is configured.
4. When the client confirms the selection, JoAi creates one quote order with the chosen items and immediately sends its usual quote-confirmation email to the contact.

The quote is deliberately created at confirmation time, so its selected items, attached coupon, and email reflect what the client actually chose.

## API and SDK

Authenticated team members can create and list proposals through `POST /v1/proposals` and `GET /v1/proposals`. The SDK exposes the same interface through `client.proposals.create(team, input)` and `client.proposals.list(team)`.

The client-facing endpoints are `GET /v1/proposals/shared/{slug}` and `POST /v1/proposals/shared/{slug}/confirm`. If a proposal has a password, pass it only in the `X-Proposal-Password` header. Do not put it in the URL.

## Sharing surface

vLeap renders the customer page and controls its presentation. In production, use `vleap.at/angebot/` and preserve the `proposal` query parameter, for example:

```
https://vleap.at/angebot/?proposal=the-proposal-slug
```

DNS and hosting mapping are deployment responsibilities; JoAi stores the proposal data and is not coupled to the vLeap domain.

## Automating from discovery notes

Use the **Create a client proposal** JoAi action after the notes have been reviewed. It accepts a contact, catalog item IDs, required flags, tailored copy, an optional coupon, expiry, and access code. The local `vleap-proposals` Codex skill follows the same guardrails when converting a transcript into a proposal draft.
