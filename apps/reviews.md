# Reviews

Reviews is the reputation native app: request feedback after completed work, collect a rating, and route unhappy customers to the team before they go public.

Install it under **Team settings → Apps**, then open **Reviews** in the sidebar.

## What it does

- Sends a review request after a finished appointment or a delivered shop order
- Collects a 1–5 rating and optional private feedback
- Shows the public review link for every rating
- Notifies the team of every submitted review
- Routes low ratings to a contact follow-up
- Tracks sent, responded, and follow-up counts

Do not gate the public review link by rating and do not offer incentives for reviews. The public link is always available; low ratings additionally trigger a private follow-up.

## Settings

1. Open **Reviews**
2. Turn on review requests
3. Add the public review link (for example a Google Business review URL)
4. Choose the delay after completion
5. Choose email, SMS, WhatsApp, or a combination
6. Set the private follow-up threshold (default: 3)

Requests respect the team timezone and avoid sending overnight.

## Triggers

- **Appointment** — after `scheduled_end_at` plus the configured delay
- **Shop order** — after the order is marked delivered plus the configured delay

Both triggers create the same review request shape, so the feature is not tied to appointments.

## Public review page

The customer receives a tokenized link:

```text
https://joai.ai/{locale}/review?token={token}
```

No login is required. The token expires after 60 days. The page shows the business, subject, and first name only — never contact details.

### API

| Method | Endpoint | Purpose |
| --- | --- | --- |
| `GET` | `/v1/reviews/{token}` | Load the public review page |
| `POST` | `/v1/reviews/{token}` | Submit rating and feedback |
| `POST` | `/v1/reviews/{token}/destination-click` | Track the public review click |
| `GET` | `/v1/teams/{team}/reviews` | List team reviews |
| `GET` | `/v1/teams/{team}/reviews/stats` | Review totals and average rating |

## For agents (MCP)

Requires **Reviews** installed.

| Tool | Purpose |
| --- | --- |
| `list_reviews` | List review requests and responses with filters |

Typical agent flow:

1. List recent reviews, optionally filtered by rating or status
2. Summarize negative feedback and the customers who need follow-up
3. Open the contact or review in the app for the actual follow-up

Live schemas: `tools/list`. See [MCP](/protocols/mcp) and [SKILL.md](https://joai.ai/SKILL.md).

## Smart Links

Use [Smart Links](/apps/smart-links) for aggregate review links such as a counter QR code, social post, or email footer. Per-customer review links use the review token and are tracked by the Review domain; do not create a Smart Link for every request.
