# Teams

Teams are collaborative workspaces where multiple users work together, share agents, and manage resources collectively.

## Team features

- **Shared agents** — members use team agents
- **Native apps** — install Shop, Contacts, Forms, and more per team ([Native apps](/apps/))
- **Resource sharing** — wallets, integrations, configurations
- **Centralized billing** — team-wide subscriptions
- **Usage limits** — messages and feature quotas
- **Permission management** — roles and access

## Creating teams

1. Open the team selector / **Teams**
2. **Create Team**
3. Set name, description, logo (optional)
4. Configure initial settings
5. Team is created

## Settings layout

**Settings** combines personal and team sections in one navigator.

### Personal

| Item | Path / notes |
| --- | --- |
| **Profile** | Your user profile |
| **Wallets** | Your personal wallet settings (`/teams/settings/wallets`) — not agent wallets |
| **Notifications** | User notification prefs |
| **Voice** | Desktop only — [Voice dictation](/apps/voice-dictation) controls |
| **Clipboard** | Desktop only |
| **API** | API tokens |
| **Logs** | Client logs |

### Team

| Item | What you configure |
| --- | --- |
| **General** | Name, tagline, description, logo, cover, timezone, locale, category, custom key/value settings, **location**, **Wi‑Fi**, **preferred channel**, delete team (non-personal) |
| **Apps** | Install [native apps](/apps/) and [integrations](/integrations/) |
| **Members** | Invite, change roles, remove |
| **Branding** | Brand colors (background / foreground / label / accent) for public surfaces and [Studio templates](/apps/studio-templates#branding) |
| **Usage & Billing** | Consumption vs plan limits, subscription, payment methods, invoices |

Agent wallets live under **Agent settings → Wallets** ([Wallets](/wallets)). Loyalty lives under the **Contacts** app ([Contacts](/apps/contacts)), not Team settings.

### Place providers

A team stores one source per provider, side by side. **Google** is the business location: address, coordinates, rating, review count and the latest Google reviews. **Falstaff** is an editorial guide rating: points, the guide edition and a link to the Falstaff page. It is entered as data (no server-side scraping).

- **General → Location** searches and selects the Google place.
- **General → Guides** stores a Falstaff guide: points, maximum, guide label and public URL.
- The Google place refreshes **weekly**; a weekly vLeap automation keeps the Falstaff guide current from the public Falstaff page.
- Teams with appointment opening-hours sync enabled also refresh the Google place daily.
- Admins can force a Google refresh with `php artisan team:sync-place <team-slug>`.

Public business profiles show the Google rating and reviews with a link to Google Maps, plus every connected guide rating as its own badge. Removing one provider leaves the others untouched.

### Native apps on a team

Install modules under **Team settings → Apps**. See the full matrix in [Native apps](/apps/).

Installed apps appear in the sidebar when they have a nav entry and unlock matching MCP tools for agents.

### Member roles

- **Owner** — full control, can delete team and transfer ownership
- **Admin** — manage settings, members, and resources
- **Member** — use team resources and edit content
- **Developer** — build with team agents, wallets, secrets, and sites

### Adding members

1. **Team settings → Members**
2. **Invite**
3. Enter email
4. Assign role
5. Send invitation

### Agent access

Agents belong to one team but can be granted access to other teams. Owners and admins manage this in **Agent settings → Team access** by selecting a team and a role (Member, Developer, or Admin). Agents can also request access from a conversation; the request becomes an approval card that a human must approve before access is granted. Agents can only receive access to teams where their owner can manage member roles. See [Agents](/agents#team-access).

### Changing roles

Owners and admins can change a member's role from the **Members** list — the role next to each member is a dropdown. Select a new role to apply it immediately; pending invitations can be adjusted the same way before they are accepted.

Owners can promote another member to **Owner** and can demote themselves. A team must always keep at least one owner, so the last remaining owner cannot be demoted until someone else is promoted first.

Only owners can grant or revoke **Owner**. Admins can manage the other roles, but not owners.

- [Billing](/billing) — plans, usage, Extra Usage
- [Desktop](/desktop) — clipboard, hotkeys, voice
- [Native apps](/apps/)
- [Agents](/agents)
- [Integrations](/integrations/)
- [Wallets](/wallets)
- [Contacts](/apps/contacts)