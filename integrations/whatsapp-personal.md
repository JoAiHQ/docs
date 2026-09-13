# WhatsApp Personal

Pair your **personal** WhatsApp on the JoAi **desktop app**. While that computer is online and sync is running, inbound chats land in per-contact rooms and outbound replies run through the desktop CLI.

This is **not** [WhatsApp Business](/integrations/whatsapp) (Meta Cloud API / campaigns).

## Requirements

- **JoAi desktop app** (connect, pair, sync, and outbound all need desktop)
- An active agent
- Willingness to keep the desktop online for sync and sends

## Setup

1. On **desktop**, open **Agent settings → Integrations** → **WhatsApp Personal**
2. Click **Connect** to create the integration and webhook credentials
3. Click **Pair** to run the auth warp (`@whatsapp-auth`) and scan the QR / complete WhatsApp login
4. Click **Start sync** to run the sync warp (`@whatsapp-sync`) with the webhook URL and secret JoAi generated
5. Leave sync running while you want inbound messages to arrive

You can copy the webhook URL and manage the webhook secret from the same panel. Optional inbound hook mapping is available when a hook source is configured.

## How it works

### Inbound

While sync is running, the desktop CLI posts to JoAi hooks (`wacli`). Messages are persisted as **External** messages in **WhatsApp Personal** contact rooms — never into Business WhatsApp rooms.

### Outbound

Typing or sending in a Personal contact room uses the normal agent execute / delivery path. JoAi asks Cortex to deliver with platform `whatsapp-personal`; Cortex emits a desktop **`WARP_EXECUTE`** for `@whatsapp-send-text`, which the JoAi app runs via CLI.

The desktop app must be online to execute that warp.

### Broadcast

Personal rooms are **not** included in `joai-broadcast`. Only Cortex social platforms (Telegram, Slack, Business WhatsApp, email, …) are.

## Limits / gotchas

- **Desktop-only** for connect, pair, sync, and outbound CLI delivery
- If sync stops, inbound pauses until you start it again
- Offline desktop = no CLI outbound until the app is back
- Do not confuse with Business WhatsApp campaigns or Cloud API numbers

## Related

- [WhatsApp Business](/integrations/whatsapp)
- [Desktop](/desktop)
- [CLI](/cli)
- [Webhooks & hooks](/webhooks)
- [Contacts](/apps/contacts)
- [Integrations overview](/integrations/)
