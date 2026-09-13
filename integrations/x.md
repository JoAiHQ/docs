# X (Twitter)

Connect an X account so mentioning your agent can ingest posts into JoAi knowledge.

This is **mention ingest**, not a full chat adapter like Telegram or Slack.

## Requirements

- An X account you can OAuth-connect in JoAi
- An active JoAi agent

## Setup

1. Open **Agent settings → Integrations** → **X (Twitter)**
2. **Connect X account** (OAuth) if your user profile is not linked yet
3. **Enable** the integration for the selected agent
4. Mention the agent from X as described in the UI so posts can be ingested

Only one agent typically owns the X ingest enablement for a linked account at a time — disable on one agent before enabling on another if the UI indicates a conflict.

## How it works

- Mentions / configured ingest paths extract content into memories, documents, or related knowledge surfaces
- This is not the same as [XChat](/integrations/xchat) encrypted messaging

## Limits

- Requires a linked X social account on the JoAi user
- Not a bidirectional chat room product like Slack/Telegram

## Related

- [XChat](/integrations/xchat)
- [Knowledge](/knowledge)
- [Integrations overview](/integrations/)
