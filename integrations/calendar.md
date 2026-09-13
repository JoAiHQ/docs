# Calendars

Connect Google Calendar, Microsoft 365, or (on mobile) a device calendar for scheduling awareness and event creation.

## Requirements

- An active JoAi agent
- OAuth access for Google or Microsoft, **or** a mobile device for device calendar access

## Setup

1. Open **Agent settings → Integrations** → **Calendars**
2. Choose a provider:
   - **Google** — OAuth connect
   - **Microsoft 365** — OAuth connect
   - **Device calendar** — available on **mobile** when JoAi can request calendar permission
3. Complete the provider consent flow
4. Confirm the UI shows the calendar as connected

Only one calendar provider connection is active at a time for the agent in the typical setup UI.

## How it works

- JoAi uses the connected calendar for time awareness, scheduling-related agent behavior, and event creation where supported
- OAuth tokens are stored for the agent; reconnect if the provider revokes access

## Limits

- Device calendar connect is mobile-oriented (desktop shows it as unavailable)
- OAuth failures (token exchange, missing refresh token) require reconnecting the provider

## Related

- [Appointments](/apps/appointments)
- [Integrations overview](/integrations/)
- [Desktop](/desktop)
