# Instagram

Connect an Instagram **professional** account so your agent can receive and answer Direct Messages.

## Requirements

- Instagram professional account linked to a Meta app
- Access token, Instagram account ID, app secret, and webhook verify token
- An active JoAi agent

## Setup

1. Open **Agent settings → Integrations** → **Instagram**
2. Enter access token, account ID, app secret, and webhook verify token
3. Click **Connect Instagram**
4. Set the callback URL JoAi shows in the Meta app’s Instagram webhook settings

## How it works

- **Inbound:** Instagram DMs arrive through Meta webhooks into Instagram rooms
- **Outbound:** replies from those rooms go through the Instagram adapter

## Limits

- Professional / business Instagram only (not personal consumer accounts without Meta app wiring)
- Webhook verify token and callback URL must match Meta’s settings

## Related

- [WhatsApp Business](/integrations/whatsapp) — also Meta-based
- [Integrations overview](/integrations/)
