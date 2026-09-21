# Native apps

Native apps are JoAi’s built-in team modules — Shop, Contacts, Forms, Appointments, and more. Install the ones you need; they appear in the sidebar (or chat/settings) and unlock matching [MCP](/protocols/mcp) tools for your agents.

## How they work

1. Open **Team settings → Apps**
2. Install a native app (or connect an integration)
3. Use it from the dashboard sidebar, chat control, or settings entry
4. Agents connected via MCP only get tools for apps that team has installed

Default install is **Board**. Everything else is opt-in per team.

### Onboarding suggestions

During onboarding, JoAi may suggest apps from your interests:

| Interest | Suggested apps |
| --- | --- |
| business | Contacts, Appointments, Shop |
| ecommerce | Shop, Contacts, Smart Links |
| shopping | Shop, Smart Links |
| content | Campaigns, Automations, Sites, Smart Links |
| developer | Workspace, Sites, Contracts |
| web3 | Wallets, Contracts |
| payments | Shop, Wallets |
| health / fitness | Appointments, Contacts |
| finance | Wallets, Board |
| research | Board |

You can change installs anytime under Apps.

## Install and access

| Concept | Meaning |
| --- | --- |
| **Installed** | Listed under `Team settings → Apps` for this team |
| **Sidebar** | Board, Shop, Contacts, Campaigns, Automations, Forms, Appointments, Smart Links, News, Social, Artifacts, Sites, Meetings, Contracts |
| **Chat / settings only** | Workspace (chat control + `/files`), Wallets, Heartbeats, Voice dictation |
| **Plan lock** | Some apps need a higher plan — they show locked until you upgrade |
| **MCP gating** | Agent tools for that app appear only when the app is installed on the team |

Native apps are **not** the same as:

- **[Integrations](/integrations/)** — Slack, Telegram, email providers, etc.
- **[ChatApps](/chatapps)** — AI apps you publish to ChatGPT / Claude / Cursor
- **[Mobile App Store listing](/app-store)** — iOS / Android download page copy
- **[Desk](/desk)** — `/desk-*` chat media commands (not the Workspace native app)

## All native apps

| App | What it does | Guide |
| --- | --- | --- |
| **Board** | Kanban items, auto-execution; MCP for tasks/goals/hooks/blueprints/projects | [Board](/apps/board) |
| **Shop** | Products, services, orders, coupons, payments, storefront | [Shop](/apps/shop) |
| **Contacts** | CRM, tags, timeline, loyalty; segments via Campaigns | [Contacts](/apps/contacts) |
| **Campaigns** | Email, WhatsApp, SMS, push + segment audiences | [Campaigns](/campaigns) |
| **Automations** | Welcome series, nurture drips, webhook enroll | [Automations](/automations) |
| **Forms** | Build, publish, share, submissions | [Forms](/apps/forms) |
| **Appointments** | Policy, requests, public book page | [Appointments](/apps/appointments) |
| **Smart Links** | Short links, variations, kiosk table QR | [Smart Links](/apps/smart-links) |
| **News** | Deals, events, news updates | [News](/apps/news) |
| **Social** | Draft and schedule Instagram posts and carousels | [Social](/apps/social) |
| **Artifacts** | Client deliverables — track and send to contacts | [Artifacts](/artifacts) |
| **Sites** | Brand sites + CMS on sites.joai.ai | [Sites](/sites) |
| **Meetings** | Capture, transcript, summary | [Meetings](/apps/meeting) |
| **Workspace** | Folder sync + media library (`workspace`) | [Workspace](/apps/files) |
| **Wallets** | Agent/team chain wallets | [Wallets](/wallets) |
| **Contracts** | Author, deploy, query contracts | [Contracts](/apps/contracts) |
| **Heartbeats** | Claws / MultiversX presence | [Heartbeats](/apps/heartbeats) |
| **Voice dictation** | Desktop system voice control | [Voice dictation](/apps/voice-dictation) |

Related storefront surface (not a separate installable slug): **[Kiosk](/kiosk)** — touch ordering for your shop.

Customer-facing hosts (store, forms, sites, passes): **[Public surfaces](/apps/public-surfaces)**.

## For agents

- Install the app on the team **before** expecting MCP tools for it
- Call `tools/list` on the agent MCP endpoint for live schemas
- Prefer [SKILL.md](https://joai.ai/SKILL.md) and OpenAPI for machine contracts — these guides stay product-focused
- See [MCP](/protocols/mcp) for connection and credits

## Related

- [Teams](/teams) — who owns apps and billing
- [Agents](/agents) — connect agents to MCP
- [Integrations](/integrations/) — third-party connections in the same Apps screen
- [Public surfaces](/apps/public-surfaces)
