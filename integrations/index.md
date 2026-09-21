# Integrations

Integrations connect agents to external channels and services. Install from **Team settings → Apps** (integrations grid) or configure under **Agent settings → Integrations**.

## How they work

1. Open **Team settings → Apps** or **Agent settings → Integrations**
2. Pick an integration and follow its setup guide
3. Messages and events land in agent rooms, knowledge, or hooks — depending on the integration
4. Outbound replies use the connected channel when you chat from that room (or when campaigns / warps send)

Integrations are **per agent** (or per team for some utilities). They are not the same as [Native apps](/apps/) or [ChatApps](/chatapps).

## Catalog

### Productivity

| Integration | Purpose | Guide |
| --- | --- | --- |
| **Calendars** | Google / Microsoft 365 / device calendar | [Calendars](/integrations/calendar) |

### Automation

| Integration | Purpose | Guide |
| --- | --- | --- |
| **N8N** | Workflow automation with JoAi API tokens | [N8N](/integrations/n8n) |

### Communication

| Integration | Purpose | Guide |
| --- | --- | --- |
| **Telegram** | Bot messaging | [Telegram](/integrations/telegram) |
| **Slack** | Workspace channels / DMs | [Slack](/integrations/slack) |
| **WhatsApp Business** | Meta Cloud API messaging + campaigns | [WhatsApp Business](/integrations/whatsapp) |
| **WhatsApp Personal** | Desktop-paired personal WhatsApp (CLI) | [WhatsApp Personal](/integrations/whatsapp-personal) |
| **Discord** | Servers / DMs | [Discord](/integrations/discord) |
| **Email** | Agent-owned inbox address | [Email](/integrations/email) |
| **Twilio** | Voice + SMS | [Twilio](/integrations/twilio) |
| **Instagram** | Professional DMs + Social Media publishing | [Instagram](/integrations/instagram) |
| **Facebook** | Page publishing via Social Media | [Facebook](/integrations/facebook) |
| **LinkedIn** | Profile publishing via Social Media | [LinkedIn](/integrations/linkedin) |
| **X (Twitter)** | Mention ingest + Social Media publishing | [X](/integrations/x) |

### Development

| Integration | Purpose | Guide |
| --- | --- | --- |
| **GitHub** | @mentions on issues/PRs | [GitHub](/integrations/github) |
| **Sentry** | Errors → tasks / items | [Sentry](/integrations/sentry) |
| **Cloudflare** | Zone analytics + Cloudflare warps | [Cloudflare](/integrations/cloudflare) |

### Knowledge

| Integration | Purpose | Guide |
| --- | --- | --- |
| **Readwise Reader** | Saved articles → ingestions | [Readwise](/integrations/readwise) |

### AI

| Integration | Purpose | Guide |
| --- | --- | --- |
| **Grok Voice** | xAI live voice engine | [Grok Voice](/integrations/grok) |

### Integration utilities

| Integration | Purpose | Guide |
| --- | --- | --- |
| **MCP** | Connect JoAi agents into MCP clients | [MCP](/integrations/mcp) |
| **API Tokens** | Long-lived HTTP tokens | [API Tokens](/integrations/api-tokens) |
| **Webhooks** | Outbound HTTP callbacks | [Webhooks](/integrations/webhooks) |
| **Website Widget** | Embed chat on any site | [Website Widget](/integrations/embed) |

## ChatApps vs integrations

[ChatApps](/chatapps) publish JoAi experiences into ChatGPT / Claude / Cursor via MCP. That is separate from installing Slack/Telegram-style integrations above.

## Not in the catalog

**Apple Health** and **AI Nexus** are not current installer integrations.

## Related

- [Native apps](/apps/)
- [Agents](/agents)
- [Teams](/teams)
- [Webhooks & hooks](/webhooks)
- [API](/api)
- [MCP protocol](/protocols/mcp)
- [CLI](/cli)
- [Desktop](/desktop)
- [ChatApps](/chatapps)
