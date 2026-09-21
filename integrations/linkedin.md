# LinkedIn

Connect a LinkedIn profile so the [Social Media](/apps/social) app can publish posts as you.

This covers **Social Media publishing** for the connected member profile. It is not a messaging adapter.

## Requirements

- A LinkedIn account you can OAuth-connect in JoAi
- An active JoAi agent
- A LinkedIn developer app with Sign In with LinkedIn and Share on LinkedIn (or equivalent member posting) products

## Setup

1. Open **Agent settings → Integrations** → **LinkedIn**
2. **Connect LinkedIn** (OAuth)
3. Approve profile and posting access
4. Use [Social Media](/apps/social) to draft or schedule posts as that profile

The same LinkedIn connection can be reused by Social Media and other features such as metrics.

## How it works

- Social Media posts publish through the connected member access token when a post is due
- Text-only posts and posts with images are supported
- JoAi stores the LinkedIn person id from OpenID userinfo

## Limits

- Images must be JPEG, PNG, or GIF (up to 9)
- Text is limited to 3000 characters
- Not an organization Page poster unless your LinkedIn app is approved for organization posting separately

## Related

- [Social Media](/apps/social) — schedule Instagram, X, Facebook, and LinkedIn posts
- [Instagram](/integrations/instagram)
- [Facebook](/integrations/facebook)
- [X](/integrations/x)
- [Integrations overview](/integrations/)
