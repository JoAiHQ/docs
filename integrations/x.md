# X (Twitter)

Connect an X account so mentioning your agent can ingest posts into JoAi knowledge, and so the [Social](/apps/social) app can publish posts as you.

This covers **mention ingest** and **Social publishing**. It is not a full chat adapter like Telegram or Slack.

## Requirements

- An X account you can OAuth-connect in JoAi
- An active JoAi agent
- For publishing: reconnect X if you linked it before posting was available, so JoAi can request write access

## Setup

1. Open **Agent settings → Integrations** → **X (Twitter)**
2. **Connect X account** (OAuth) if your user profile is not linked yet
3. **Enable** the integration for the selected agent when you want mention ingest
4. Use [Social](/apps/social) to draft or schedule posts as that linked account

The same X connection can be reused by Social and other features such as metrics.

Only one agent typically owns the X ingest enablement for a linked account at a time — disable on one agent before enabling on another if the UI indicates a conflict.

## How it works

- Mentions / configured ingest paths extract content into memories, documents, or related knowledge surfaces
- Social posts publish through the same linked X account when a post is due
- This is not the same as [XChat](/integrations/xchat) encrypted messaging

## Limits

- Requires a linked X social account on the JoAi user
- Publishing needs write scopes; reconnect after JoAi adds posting if an older link fails to publish
- Not a bidirectional chat room product like Slack/Telegram

## Related

- [Social](/apps/social) — schedule Instagram, X, Facebook, and LinkedIn posts
- [XChat](/integrations/xchat)
- [Instagram](/integrations/instagram)
- [Facebook](/integrations/facebook)
- [LinkedIn](/integrations/linkedin)
- [Knowledge](/knowledge)
- [Integrations overview](/integrations/)
