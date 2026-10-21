# Calendars

Connect Google Calendar, Microsoft 365, or (on mobile) a device calendar for scheduling awareness and event creation. Teams can also import a published iCalendar feed as JoAi event updates.

## Requirements

- An active JoAi agent
- OAuth access for Google or Microsoft, **or** a mobile device for device calendar access
- For a team feed: a publicly reachable iCalendar (`.ics`) URL and permission to manage the team

## Setup

1. Open **Agent settings → Integrations** → **Calendars**
2. Choose a provider:
   - **Google** — OAuth connect
   - **Microsoft 365** — OAuth connect
   - **Device calendar** — available on **mobile** when JoAi can request calendar permission
3. Complete the provider consent flow
4. Confirm the UI shows the calendar as connected

Only one calendar provider connection is active at a time for the agent in the typical setup UI.

### Team iCalendar feeds

At the bottom of **Calendars**, add a team calendar feed with its public `.ics` URL, the source timezone, and any public event properties your site or app needs. For example, a football club can add `section: fussball` and `team: KM` to identify imported fixtures without encoding presentation details in the integration.

JoAi fetches active team feeds once each day. You can also use **Sync now** after adding or changing a source. New or changed source events become team event updates; optionally enable automatic publishing when the source is trusted. A cancelled source event is archived, and a future event removed from the source is archived as well.

When an agent manages feeds through an action or MCP, it can explicitly select the target team with its team slug. This keeps calendar sources, their imported updates, and approval cards attached to the intended team rather than to the agent's default team. The agent owner must be a member with permission to manage that target team.

## How it works

- JoAi uses the connected calendar for time awareness, scheduling-related agent behavior, and event creation where supported
- OAuth tokens are stored for the agent; reconnect if the provider revokes access

## Limits

- Device calendar connect is mobile-oriented (desktop shows it as unavailable)
- OAuth failures (token exchange, missing refresh token) require reconnecting the provider
- The feed URL must be a direct, publicly reachable HTTPS endpoint. Private-network URLs and redirects are rejected.
- Only event data and the public properties chosen when configuring the feed are copied into updates. Team feeds are not a way to expose CRM data.

## Related

- [Appointments](/apps/appointments)
- [Integrations overview](/integrations/)
- [Desktop](/desktop)
