# Instagram

Connect an Instagram **professional** account so your agent can answer Direct Messages and publish feed posts.

## Requirements

- Instagram professional account (Business or Creator)
- An active JoAi agent
- A plan that includes integrations

## Setup

1. Open **Agent settings → Integrations** → **Instagram**
2. Click **Connect Instagram** and approve the account in Instagram
3. JoAi keeps that connection for messages and for the [Social](/apps/social) app

The grant covers messages and publishing. You do not paste an access token, account ID, or Meta app secret. JoAi refreshes the connection before it expires. The same connection can be reused by Social and other features such as metrics.

## How it works

- **Inbound:** Instagram DMs arrive through Meta webhooks into Instagram rooms
- **Outbound:** replies from those rooms go through the Instagram adapter
- **Feed posts:** the Social app publishes to this same account when a post is due

## Limits

- Professional Instagram accounts only
- The connection is the Instagram account you approve. Personal accounts that are not professional cannot be selected

## Related

- [Social](/apps/social) — schedule Instagram, X, Facebook, and LinkedIn posts
- [Facebook](/integrations/facebook)
- [LinkedIn](/integrations/linkedin)
- [X](/integrations/x)
- [Integrations overview](/integrations/)
