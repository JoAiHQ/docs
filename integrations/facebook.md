# Facebook

Connect a Facebook Page so the [Social Media](/apps/social) app can publish posts as that Page.

This covers **Social Media publishing** for a Page you manage. It is not a Messenger chat adapter.

## Requirements

- A Facebook account that manages at least one Page
- An active JoAi agent
- A Meta app configured for Facebook Login with Page publishing permissions (`pages_show_list`, `pages_read_engagement`, `pages_manage_posts`, and `business_management` for Pages in Meta Business Suite)

## Setup

1. Open **Agent settings → Integrations** → **Facebook**
2. **Connect Facebook Page** (OAuth)
3. Grant Page access so JoAi can publish — every Page you manage is stored on the connection
4. Use [Social Media](/apps/social) to draft or schedule posts, and pick the Page when you create the post if you manage more than one

Reconnect to refresh the list of Pages after Meta access changes. The same Facebook connection can be reused by Social Media and other features such as metrics.

## How it works

- Social Media posts publish through the connected Page access token when a post is due
- Text-only posts and posts with images are supported
- This is separate from [Instagram](/integrations/instagram) messaging and publishing

## Limits

- Requires at least one manageable Facebook Page on the connected account
- Images must be publicly reachable JPEG, PNG, WEBP, or GIF files (up to 10)
- Not a bidirectional Messenger room product

## Related

- [Social Media](/apps/social) — schedule Instagram, X, Facebook, and LinkedIn posts
- [Instagram](/integrations/instagram)
- [LinkedIn](/integrations/linkedin)
- [X](/integrations/x)
- [Integrations overview](/integrations/)
