# Appointments

Appointments is the booking native app: availability, capacity, requests, and a public booking page. Install it under **Team settings → Apps**, then open **Appointments** in the sidebar.

## Overview

- Configure **booking policy** (hours, capacity, buffers, notice windows, features)
- Manage **appointment requests** (approve / decline) and upcoming meetings
- Offer a **public book** page for customers
- Share **services** with [Shop](/apps/shop) when both are installed
- Agents check availability and book over **MCP**

## In the app

### Home

- **Upcoming meetings** — join video when configured, cancel, open contact, open [meeting summary](/apps/meeting) when linked
- **Request queue** — approve or decline pending requests (food & drink teams may assign a **table** on approve)

### Settings / policy

1. Open **Appointments → Settings**
2. Set timezone, weekly hours, capacity, buffers, min notice, max days ahead, slot interval
3. Optional features: video/conference, service selection, payment at booking, require approval (plan-gated)
4. **Booking agent** — which agent owns booking automations
5. Notification email for the team
6. Master **online booking** switch (disables the public page without uninstalling)

Capacity can be limited **per booking** or **per person**.

`blockedDates` / holidays may exist on the policy payload for agents/API; there is no dedicated holidays UI in the product today. Appointment policy can also align with **team place** hours when place is set (`update_team_place` / place settings) — prefer documenting place on [Teams](/teams) and syncing via policy MCP when automating.

## Public surfaces & sharing

### Booking page

From **Appointments**, use **Booking page** (opens the storefront book URL). Online booking must be enabled in Settings.

| URL | Purpose |
| --- | --- |
| `https://store.joai.ai/{locale}/{team}/book` | Full booking page (store chrome) |
| `https://store.joai.ai/{locale}/{team}/book/{serviceSlug}` | Pre-select a service |
| `https://store.joai.ai/{locale}/{team}/book/embed` | **Embed** — same flow, no store header/footer/cart |

Example:

```
https://store.joai.ai/en/my-shop/book
https://store.joai.ai/en/my-shop/book/haircut
https://store.joai.ai/en/my-shop/book/embed
```

### Embed on your website

Use the embed URL in an iframe so customers book without leaving your site:

```html
<iframe
  src="https://store.joai.ai/en/YOUR-TEAM/book/embed"
  title="Book an appointment"
  style="width:100%;min-height:720px;border:0;"
  loading="lazy"
  allow="payment *"
></iframe>
```

Notes:

- Replace `en` / `YOUR-TEAM` with your locale and team slug
- The embed path hides store navigation, cart, and footer (`/book/embed`)
- Give the iframe enough height for calendar + form steps
- Keep **online booking** on; if disabled, the public/embed pages stop accepting bookings
- For a fully branded multi-page booking app (not just an iframe), use [Sites](/sites)

### Other ways to share

| Method | Notes |
| --- | --- |
| Direct link | Share `/book` or `/book/{service}` |
| [Smart Links](/apps/smart-links) | Short tracked URL to the book page |
| [Sites](/sites) | Appointment brand site on `sites.joai.ai` |
| Website Widget | Agent **chat** embed ([Website Widget](/integrations/embed)) — not the calendar booking UI |

See [Public surfaces](/apps/public-surfaces).

## For agents (MCP)

Requires **Appointments** (service tools also work when **Shop** is installed).

| Tool | Purpose |
| --- | --- |
| `get_appointment_policy` / `update_appointment_policy` | Policy |
| `check_appointment_availability` | Free slots |
| `book_appointment` | Book a confirmed slot |
| `reschedule_appointment` / `cancel_appointment` | Change or cancel |
| `create_appointment_request` / `update_appointment_request` / `list_appointment_requests` | Request queue |
| `list_services` / `create_service` / `update_service` / `delete_service` | Bookable services |

Typical agent flow:

1. Resolve the attendee via CRM (`joai-contact-find-or-create` / list) and pass `contactId` — prefer that over free-text `attendeeName`
2. Check availability with a **tight** window when a time is already agreed (`windowStart` = that time, `windowEnd` = start + duration). Only use a broad day/range when the user is still flexible
3. Confirm a slot with the user
4. Book with the same `contactId`
5. If booking cannot complete, create an appointment request

Live schemas: `tools/list`. See [MCP](/protocols/mcp) and [SKILL.md](https://joai.ai/SKILL.md).

## Tips

- Set policy before sharing or embedding the book URL
- Use services with clear durations when you also bill via [Shop](/apps/shop)
- Keep notification email on for team awareness
- Prefer `/book/embed` for iframes; use [Sites](/sites) when you need a full branded web app
- When chatting about a specific time (“Wed 7.10 at 11”), do not expand the availability window to midnight→next day

## Related

- [Native apps](/apps/)
- [Public surfaces](/apps/public-surfaces)
- [Shop](/apps/shop)
- [Sites](/sites)
- [Contacts](/apps/contacts)
- [Meetings](/apps/meeting)
