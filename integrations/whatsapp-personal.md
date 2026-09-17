# WhatsApp Personal

Pair your **personal** WhatsApp on the JoAi **desktop app**. While that computer is online and sync is running, inbound chats land in per-contact rooms and outbound replies run through the desktop CLI.

This is **not** [WhatsApp Business](/integrations/whatsapp) (Meta Cloud API / campaigns).

## Requirements

- **JoAi desktop app** (connect, pair, sync, and outbound all need desktop)
- An active agent
- Willingness to keep the desktop online for sync and sends

## Setup

1. On **desktop**, open **Agent settings → Integrations** → **WhatsApp Personal**
2. Click **Connect**
3. Click **Pair** and scan the QR / complete WhatsApp login
4. Click **Start sync**
5. Leave sync running while you want inbound messages to arrive

The desktop app manages its own wacli executable. Before pairing, syncing, or sending, it periodically checks the official OpenClaw release feed, verifies the downloaded archive checksum, and uses the managed version instead of an arbitrary `wacli` found on your shell `PATH`. Use **Update wacli** in the integration settings to force an immediate check; an active sync is stopped and restarted around an update.

JoAi generates the webhook URL and secret behind the scenes — you only use the buttons.

## How it works

### Inbound

While sync is running, the desktop CLI posts to JoAi hooks (`?source=wacli`) and signs each body with `X-Wacli-Signature` (HMAC-SHA256). Messages are persisted as **External** messages in **WhatsApp Personal** contact rooms — never into Business WhatsApp rooms.

Live inbound messages then start a normal agent turn in that contact room. When the agent replies, JoAi delivers through the channel send warp (`@whatsapp-send-text`):

- **Auto mode on:** the warp sends via the desktop CLI
- **Auto mode off:** an editable warp approval stays in the room until you approve

Routine inbound WhatsApp payloads do not create separate push notifications; the conversation itself remains visible in its contact room.

Historical backfill from the first sync is persisted only — it does not prompt the agent. JoAi allows a high per-agent hook rate for that burst; after it settles, live messages continue normally. Some noisy protocol payloads (group key distribution, albums, etc.) may appear in the desktop terminal without becoming chat messages.

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
