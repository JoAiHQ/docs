# WhatsApp Personal

Pair your **personal** WhatsApp on the JoAi **desktop app**. While that computer is online and sync is running, inbound **1:1 chats and groups** land in Personal rooms and outbound replies run through the desktop CLI.

This is **not** [WhatsApp Business](/integrations/whatsapp) (Meta Cloud API / campaigns).

## Requirements

- **JoAi desktop app** (connect, pair, sync, and outbound all need desktop)
- An active agent
- Willingness to keep the desktop online for sync and sends

## Setup

1. On **desktop**, open **Agent settings → Integrations** → **WhatsApp Personal**
2. Click **Connect**
3. Click **Pair** and scan the QR / complete WhatsApp login
4. Click **Start sync** — or add it as a shortcut when prompted so you can restart sync later from the shortcut bar
5. Leave sync running while you want inbound messages to arrive

After connect, JoAi can propose saving **Start sync** as an agent shortcut (with the webhook URL and secret already filled in). One tap from the shortcut bar restarts sync on this desktop.

The desktop app manages its own wacli executable. Before pairing, syncing, or sending, it periodically checks the official OpenClaw release feed, verifies the downloaded archive checksum, and uses the managed version instead of an arbitrary `wacli` found on your shell `PATH`. Use **Update wacli** in the integration settings to force an immediate check; an active sync is stopped and restarted around an update.

JoAi generates the webhook URL and secret behind the scenes — you only use the buttons.

## How it works

### Inbound

While sync is running, the desktop CLI posts to JoAi hooks (`?source=wacli`) and signs each body with `X-Wacli-Signature` (HMAC-SHA256). Messages are persisted as **External** messages in **WhatsApp Personal** rooms — never into Business WhatsApp rooms.

- **1:1 chats** use a contact room keyed by phone (same CRM contact when the number matches). Own (`FromMe`) messages do not rename or re-bind the contact from WhatsApp’s chat title — only the peer’s number does. Chat titles that match the agent or account holder are ignored for CRM naming.
- **Groups** use one room per group (`…@g.us`). The group is **not** a contact; the room title follows the WhatsApp group subject when it is distinguishable from a speaker/account push name. Speakers are find-or-created as people contacts when their phone is present. Agent turns use the same social-style identity model: person as sender, group as channel/thread, display name as platform username — message text stays unmodified. You can later link the room’s people to a customer contact via [Relations](/apps/contacts).

Live inbound messages then start a normal agent turn in that room (including groups — same peer-style behavior as your personal WhatsApp). Replies are **channel-delivered**: JoAi does not post a normal agent chat bubble into the room; it runs `@whatsapp-send-text` (approve if Auto mode is off, execute if Auto is on). Photos and voice notes use `@whatsapp-send-media` / `@whatsapp-send-voice` (desktop materializes media URLs into the workspace before `wacli` runs).

Routine inbound WhatsApp payloads do not create separate push notifications; the conversation itself remains visible in its room.

Historical backfill from the first sync is persisted only — it does not prompt the agent. JoAi allows a high per-agent hook rate for that burst; after it settles, live messages continue normally. Some noisy protocol payloads (group key distribution, albums, etc.) may appear in the desktop terminal without becoming chat messages.

### Ignore noisy groups (and chats)

Right-click an integration room in the sidebar and choose **Ignore** (or turn the room off in room settings). That keeps the room in the list but **stops ingesting** new messages for that chat/group — nothing is stored, no media import runs, and the agent is not prompted. Use **Enable** on the room banner to resume. Plain (non-integration) rooms still use **Archive**, which also stops ingesting and hides the room. The first message can still create the room once; ignore it and the noise stops.

### Photos, voice notes, and files

Sync runs with media download enabled. **Voice notes, photos, videos, and documents** arrive as a short placeholder in the room (caption or a type label like “Voice note” / “Image”), then the desktop downloads the file from the local WhatsApp store into the JoAi workspace and attaches it so you can play/see it (and the agent can use it). This includes **your own (FromMe) messages** sent from WhatsApp — they appear on the agent side of the room and still get the file attached; they do not prompt the agent. Keep the desktop online (and **Auto mode** on for live peer messages) so import runs without an extra approval tap. Historical sync imports attach files only — they do not prompt the agent. If download/upload fails, JoAi still keeps the text placeholder so the conversation is not stuck. Stickers are labeled only and are not imported as files yet.

### Outbound

Typing or sending in a Personal room uses the normal agent execute / delivery path. JoAi asks Cortex to deliver with platform `whatsapp-personal`; Cortex emits desktop **`WARP_EXECUTE`** actions:

- Text → `@whatsapp-send-text`
- Photos / files → `@whatsapp-send-media` (optional caption)
- Voice notes → `@whatsapp-send-voice` (OGG/Opus)

`--to` accepts a phone or group JID. When media is URL-backed, the JoAi desktop app downloads it into the workspace before running `wacli`.

The desktop app must be online to execute those warps.

On web/mobile (where CLI cannot run), `@whatsapp-send-text` for a **phone DM** offers **Open in WhatsApp** (`wa.me` with the drafted text). Group JIDs (`…@g.us`) cannot use that handoff.

### Broadcast

Personal rooms are **not** included in `joai-broadcast`. Only Cortex social platforms (Telegram, Slack, Business WhatsApp, email, …) are.

## Limits / gotchas

- **Desktop-only** for connect, pair, sync, outbound CLI delivery, and media import (web/mobile can still open drafted text DMs via **Open in WhatsApp**)
- If sync stops, inbound pauses until you start it again
- Offline desktop = no CLI outbound (and no media file import) until the app is back
- Do not confuse with Business WhatsApp campaigns or Cloud API numbers
- Group rooms are multi-party; linking them to a company/customer contact is optional CRM work, not automatic
- Ignoring or archiving a room stops future inbound for that chat; it does not leave the WhatsApp group on your phone

## Related

- [WhatsApp Business](/integrations/whatsapp)
- [Desktop](/desktop)
- [CLI](/cli)
- [Webhooks & hooks](/webhooks)
- [Contacts](/apps/contacts)
- [Integrations overview](/integrations/)
