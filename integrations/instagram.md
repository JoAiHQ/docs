# Instagram

Connect an Instagram **professional** account so your agent can answer Direct Messages, privately reply to comments, publish feed / short / Stories, and pull account insights.

## Requirements

- Instagram professional account (Business or Creator)
- An active JoAi agent
- A plan that includes integrations

## Setup

1. Open **Agent settings → Integrations** → **Instagram**
2. Click **Connect Instagram** and approve the account in Instagram
3. JoAi keeps that connection for messages, comments, Social Media publishing, and metrics

The grant covers messages, comments, publishing, and insights. You do not paste an access token, account ID, or Meta app secret. JoAi refreshes the connection before it expires and configures Meta webhooks automatically after Connect (same idea as WhatsApp).

If Instagram was connected before comments, publishing formats, or insights were enabled, **Reconnect Instagram** so Meta re-grants the latest scopes (`manage_comments`, `content_publish`, `manage_insights`).

## How it works

- **Inbound DMs:** Instagram Direct Messages arrive through Meta webhooks into Instagram rooms
- **Outbound DMs:** replies from those rooms go through the Instagram adapter
- **Comments:** new comments find-or-create a CRM contact, log a Social activity, notify the team, and ask the agent for a **draft private reply** (review it on the contact timeline — JoAi does not auto-send)
- **Publishing:** the [Social Media](/apps/social) app can publish feed posts (JPEG or MP4), shorts (MP4 → Instagram Reels), and Stories (JPEG or MP4) to this account; published posts sync likes/comments/reach/views into the queue
- **Metrics:** Instagram is available as a metrics source (reach, views, profile views, followers) using the connected account id (periods up to 30 days)

## Meta webhooks

Instagram uses one app-level callback (no agent ID in the URL). JoAi sets this up on Connect when Meta app credentials are configured. You can still verify the URL in Meta → Instagram → **Configure webhooks**:

| Field | Value |
| --- | --- |
| Callback URL (devnet) | `https://devnet-cortex.joai.ai/social/webhook/instagram` |
| Callback URL (mainnet) | `https://cortex.joai.ai/social/webhook/instagram` |
| Verify token | Same value as JoAi’s Meta verify token |

Subscribed fields include messaging and **comments**. Connect Instagram on the agent so JoAi can route by Instagram account ID.

## Cold outreach vs replies

Meta does **not** allow cold Direct Messages to people who have never messaged you (for example “message every new follower”). That limitation is on Meta’s side.

What **does** work:

- Someone DMs your professional account → JoAi opens a room and the agent can reply
- You (or anyone) already have a message thread in the Instagram app → further messages still arrive via webhooks and the agent can reply in that window
- Someone comments on your media → JoAi logs them in CRM and drafts a private reply for the team to review

## Limits

- Professional Instagram accounts only
- The connection is the Instagram account you approve. Personal accounts that are not professional cannot be selected
- Meta may require the app to be published before live webhooks are delivered
- Private replies to comments follow Meta’s messaging windows and policies

## Related

- [Social Media](/apps/social) — schedule Instagram feed, shorts, Stories, X, Facebook, and LinkedIn posts
- [Facebook](/integrations/facebook)
- [LinkedIn](/integrations/linkedin)
- [X](/integrations/x)
- [Integrations overview](/integrations/)
