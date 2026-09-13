# WhatsApp Business

Connect WhatsApp via Meta’s Cloud API for business messaging, support, and [Campaigns](/campaigns).

This is **not** the same as [WhatsApp Personal](/integrations/whatsapp-personal) (desktop CLI pairing).

## Requirements

- A Meta Business / WhatsApp Business account
- Access to Embedded Signup (or equivalent) for the JoAi agent

## Setup

1. Open **Agent settings → Integrations** and choose **WhatsApp Business**
2. Start **Connect** / Embedded Signup and complete Meta’s flow
3. When connected, JoAi shows the business number (if available) and webhook status
4. Use **Reconfigure** if Meta webhooks need to be refreshed after credential changes

You can open a `wa.me` link for the connected number from the integration panel when a phone number is present.

## How it works

- **Inbound:** Cloud API messages land in WhatsApp Business rooms (not Personal rooms)
- **Outbound:** room replies and agent sends go through Meta’s API
- **Campaigns:** WhatsApp campaign templates use this channel and require provider **approval** before send — see [Campaigns](/campaigns)

## Limits

- Business Cloud API only — Personal WhatsApp uses a different integration
- Template naming, language, and placeholders are validated for campaigns
- Phone number display depends on Meta returning it after signup

## Related

- [WhatsApp Personal](/integrations/whatsapp-personal)
- [Campaigns](/campaigns)
- [Contacts](/apps/contacts)
- [Integrations overview](/integrations/)
