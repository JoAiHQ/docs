# Slack

Connect a Slack workspace so your agent can message channels and DMs.

## Requirements

- Permission to install apps on the Slack workspace
- An active JoAi agent

## Setup

1. Open **Agent settings → Integrations** and choose **Slack**
2. Click **Connect Slack workspace** and complete the Slack OAuth install
3. Copy the webhook URL JoAi shows and set it as the **Request URL** in your Slack app’s **Event Subscriptions** and **Interactivity** settings
4. Optionally connect a Slack account for notifications

Only one workspace can be connected per agent.

## How it works

- **Inbound:** workspace events and messages are routed into Slack integration rooms
- **Outbound:** replies from those rooms go back through the Slack bot
- Typing in a Slack room from JoAi relays outbound on the social channel

## Limits

- One Slack workspace connection per agent
- Event and interactivity URLs must point at the JoAi webhook JoAi displays after connect

## Related

- [Integrations overview](/integrations/)
- [Contacts](/apps/contacts)
- [Agents](/agents)
