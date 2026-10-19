# Google Search Console

Connect **Google Search Console** to an agent so JoAi can read search clicks and impressions for site metrics and monthly reports.

These numbers come from Google Search (clicks into your site and how often it appeared in results). They are **not** the same as Cloudflare unique visitors / page views.

## Requirements

- An active JoAi agent
- A Google account with access to the Search Console property you want to report on
- JoAi’s Google OAuth client (`GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET`) with the `webmasters.readonly` scope enabled

## Setup

1. Open **Agent settings → Integrations** → **Google Search Console**
2. Click **Connect Google Search Console** and approve access
3. After redirect, the integration is connected

JoAi uses the shared OAuth install flow (same primitive as LinkedIn / Instagram / Facebook). Access and refresh tokens are stored encrypted as agent secrets (`GOOGLE_SEARCH_CONSOLE_ACCESS_TOKEN`, `GOOGLE_SEARCH_CONSOLE_REFRESH_TOKEN`). Monthly site reports pick any team agent that has the refresh-token secret.

From **Sites**, turning on **monthly report** with source `google_search_console` opens the shared setup dialog if no agent on the team is connected yet — connect there, then the report turns on.

## How it works

- **Site metrics / monthly reports** — set `metricsSource` to `google_search_console` and `metricsResource` to a property URL:
  - Domain property: `sc-domain:example.com`
  - URL-prefix property: `https://example.com/` (trailing slash is normalized)
- **`metrics-query`** — same source/resource pair; returns `search.clicks` and `search.impressions`

## Limits

- Per-agent credential — connect Search Console on the agent that should run metrics
- The Google account must have access to the property URL you store as metrics resource
- Metrics reflect Search Console data (typically delayed vs real-time analytics)

## Related

- [Sites](/sites) — brandless sites, metrics, monthly reports
- [Cloudflare](/integrations/cloudflare) — zone analytics (traffic) alternative
- [Integrations overview](/integrations/)
- [Agents](/agents)
