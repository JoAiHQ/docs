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

The grant covers messages, comments, publishing, and insights. You don’t paste any tokens or IDs — JoAi refreshes the connection before it expires and, after Connect, makes sure Meta delivers that account’s events to JoAi (same idea as WhatsApp).

If Instagram was connected before comments, publishing formats, or insights were enabled, **Reconnect Instagram** so Meta grants the permissions those features need.

## How it works

- **Inbound DMs:** Instagram Direct Messages arrive in Instagram rooms
- **Outbound DMs:** replies from those rooms are sent from the connected account
- **Comments:** new comments find-or-create a CRM contact, log a Social activity, notify the team, and ask the agent for a **draft private reply** (review it on the contact timeline — JoAi does not auto-send)
- **Publishing:** the [Social Media](/apps/social) app can publish feed posts (JPEG or MP4), shorts (MP4 → Instagram Reels), and Stories (JPEG or MP4) to this account; published posts sync likes/comments/reach/views into the queue
- **Metrics:** Instagram is available as a metrics source (reach, views, profile views, followers) for the connected account (periods up to 30 days)

## Messages and comments

Instagram delivers DMs and comments to JoAi automatically once the account is connected. Nothing needs to be set up in Meta on your side.

- Events are routed to the agent that owns the connected account
- If messages or comments stop arriving, **Reconnect Instagram** from agent settings

## Cold outreach vs replies

Meta does **not** allow cold Direct Messages to people who have never messaged you (for example “message every new follower”). That limitation is on Meta’s side.

What **does** work:

- Someone DMs your professional account → JoAi opens a room and the agent can reply
- You (or anyone) already have a message thread in the Instagram app → further messages still reach the agent and it can reply in that window
- Someone comments on your media → JoAi logs them in CRM and drafts a private reply for the team to review

## Limits

- Professional Instagram accounts only
- The connection is the Instagram account you approve. Personal accounts that are not professional cannot be selected
- Live events can take a few minutes to start after connecting
- Private replies to comments follow Meta’s messaging windows and policies

## Related

- [Social Media](/apps/social) — schedule Instagram feed, shorts, Stories, X, Facebook, and LinkedIn posts
- [Facebook](/integrations/facebook)
- [LinkedIn](/integrations/linkedin)
- [X](/integrations/x)
- [Integrations overview](/integrations/)
