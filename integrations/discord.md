# Discord

Connect a Discord bot so your agent can interact in servers and DMs.

## Requirements

- A Discord application with a bot user
- Bot Token, Application ID, and Public Key from the Discord Developer Portal
- An active JoAi agent

## Setup

1. Open **Agent settings → Integrations** → **Discord**
2. In the Discord Developer Portal: create an application, add a bot, copy **Bot Token**, **Application ID**, and **Public Key**
3. Paste all three into JoAi and click **Connect Discord Bot**
4. Copy the Interactions Endpoint URL JoAi shows and set it under the Discord app’s **General Information**

## How it works

- **Inbound:** Discord interactions/messages are routed into Discord rooms
- **Outbound:** replies from those rooms go through the connected bot

## Limits

- One Discord bot connection per agent
- Interactions Endpoint URL must match the JoAi URL after connect

## Related

- [Integrations overview](/integrations/)
- [Agents](/agents)
