# Instagram

Connect an Instagram **professional** account so your agent can answer Direct Messages and publish feed posts.

## Requirements

- Instagram professional account (Business or Creator)
- An active JoAi agent
- A plan that includes integrations

## Setup

1. Open **Agent settings → Integrations** → **Instagram**
2. Click **Connect Instagram** and approve the account in Instagram
3. JoAi keeps that connection for messages and for the [Social Media](/apps/social) app

The grant covers messages and publishing. You do not paste an access token, account ID, or Meta app secret. JoAi refreshes the connection before it expires. The same connection can be reused by Social Media and other features such as metrics.

## How it works

- **Inbound:** Instagram DMs arrive through Meta webhooks into Instagram rooms
- **Outbound:** replies from those rooms go through the Instagram adapter
- **Feed posts:** the Social Media app publishes to this same account when a post is due

## Meta webhooks

Instagram uses one app-level callback (no agent ID in the URL). In Meta → Instagram → **Configure webhooks**:

| Field | Value |
| --- | --- |
| Callback URL (devnet) | `https://devnet-cortex.joai.ai/social/webhook/instagram` |
| Callback URL (mainnet) | `https://cortex.joai.ai/social/webhook/instagram` |
| Verify token | Same value as JoAi’s Meta verify token |

Subscribe to messaging fields, then Connect Instagram on the agent so JoAi can route by Instagram account ID.

## Limits

- Professional Instagram accounts only
- The connection is the Instagram account you approve. Personal accounts that are not professional cannot be selected
- Meta may require the app to be published before live webhooks are delivered

## Related

- [Social Media](/apps/social) — schedule Instagram, X, Facebook, and LinkedIn posts
- [Facebook](/integrations/facebook)
- [LinkedIn](/integrations/linkedin)
- [X](/integrations/x)
- [Integrations overview](/integrations/)
