# Readwise Reader

Automatically ingest articles you save in Readwise Reader into JoAi knowledge.

## Requirements

- A Readwise Reader account with webhook support
- An active JoAi agent

## Setup

1. Open **Agent settings → Integrations** → **Readwise Reader**
2. **Activate** the integration
3. Copy the **webhook URL** JoAi shows
4. In Readwise, configure that URL as the webhook destination
5. Add an **Authorization** header with the Bearer token JoAi displays

## How it works

- When you save an article in Readwise Reader, Readwise notifies JoAi
- JoAi ingests the content into structured knowledge for the agent

## Limits

- Ingest runs when Readwise successfully calls the webhook
- Deactivate in JoAi to stop automatic ingest

## Related

- [Knowledge](/knowledge)
- [Webhooks & hooks](/webhooks)
- [Integrations overview](/integrations/)
