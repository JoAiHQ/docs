# Telegram

Connect a Telegram bot so your agent can send and receive messages in chats and channels.

## Requirements

- A Telegram bot token from [@BotFather](https://t.me/BotFather)
- An active JoAi agent

## Setup

1. Open **Agent settings → Integrations** (or **Team settings → Apps**) and choose **Telegram**
2. Create a bot in BotFather and copy the bot token
3. Paste the token and click **Connect Bot**
4. Optionally connect a Telegram account for notifications (separate from the bot)

Only one bot can be connected per agent.

## How it works

- **Inbound:** messages to the bot create or update integration rooms; your agent can reply in those rooms
- **Outbound:** replies from a Telegram room are delivered through the connected bot
- Typing in a Telegram room from JoAi can relay outbound on the connected bot

## Limits

- One Telegram bot per agent
- Keep the bot token secret; disconnect and reconnect if it is rotated in BotFather

## Related

- [Integrations overview](/integrations/)
- [Contacts](/apps/contacts)
- [Agents](/agents)
