# Sentry

Send Sentry error webhooks to JoAi so your agent can turn failures into actionable work (tasks / items).

## Requirements

- A Sentry project where you can configure webhooks
- An active JoAi agent

## Setup

1. Open **Agent settings → Integrations** → **Sentry**
2. **Activate** the Sentry integration
3. Copy the **webhook URL** JoAi shows
4. In Sentry, add that URL as a webhook destination
5. Add an **Authorization** header with the Bearer token JoAi displays
6. Save in Sentry and send a test event if available

## How it works

- Sentry POSTs error events to JoAi
- JoAi activates the matching webhook warp / handlers so errors become tasks or board items for the agent

## Limits

- Webhook URL and Bearer token must stay in sync with Sentry
- Deactivating the integration in JoAi stops processing until you activate again

## Related

- [Board](/apps/board)
- [Tasks](/tasks)
- [Webhooks & hooks](/webhooks)
- [Integrations overview](/integrations/)
