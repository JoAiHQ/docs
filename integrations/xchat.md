# XChat

Connect an encrypted XChat bot so your agent can receive and answer messages through XChat.

## Requirements

- XChat bot credentials: OAuth access token, bot user ID, consumer secret, and PIN
- An active JoAi agent

See also the [XChat adapter requirements](https://chat-sdk.dev/adapters/official/xchat).

## Setup

1. Open **Agent settings → Integrations** → **XChat**
2. Enter access token, bot user ID, consumer secret, and PIN
3. Click **Connect XChat**
4. Register the webhook URL JoAi shows in your XChat app configuration

The PIN is stored as an agent secret and used only by the XChat adapter.

## How it works

- **Inbound:** XChat delivers messages into JoAi via the registered webhook
- **Outbound:** agent replies go back through the XChat adapter

## Limits

- Distinct from [X (Twitter)](/integrations/x) mention ingest
- Keep the PIN and tokens confidential

## Related

- [X (Twitter)](/integrations/x)
- [Integrations overview](/integrations/)
