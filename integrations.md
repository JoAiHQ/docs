# Integrations

Integrations connect agents to external channels and services. Install from **Team settings → Apps** (integrations grid) or configure under **Agent settings → Integrations**.

## Catalog

### Productivity

| Integration | Purpose |
| --- | --- |
| **Calendars** | Google / Microsoft 365 / device calendar |

### Automation

| Integration | Purpose |
| --- | --- |
| **N8N** | Workflow automation node |

### Communication

| Integration | Purpose |
| --- | --- |
| **Telegram** | Bot messaging |
| **Slack** | Workspace channels / DMs |
| **WhatsApp Business** | Business messaging |
| **WhatsApp Personal** | Desktop-paired personal WhatsApp → contact rooms + hooks |
| **Discord** | Servers / DMs |
| **Email** | Agent-owned inbox address |
| **Twilio** | Voice + SMS |
| **X (Twitter)** | Mention ingest → knowledge |
| **XChat** | Encrypted XChat bot |
| **Instagram** | Professional DMs |

### Development

| Integration | Purpose |
| --- | --- |
| **GitHub** | @mentions on issues/PRs |
| **Sentry** | Errors → tasks / items |

### Knowledge

| Integration | Purpose |
| --- | --- |
| **Readwise Reader** | Saved articles → ingestions |

### AI

| Integration | Purpose |
| --- | --- |
| **Grok Voice** | xAI live voice engine |
| **MCP** | Connect outbound MCP / agent bridges |

### Integration utilities

| Integration | Purpose |
| --- | --- |
| **API Tokens** | Long-lived HTTP tokens — [API](/api) |
| **Webhooks** | Outbound HTTP callbacks — [Webhooks](/webhooks) |
| **Website Widget** | Embed chat on any site |

## WhatsApp Personal

Pair personal WhatsApp on the **desktop app** (QR / auth warp), then keep sync running so inbound messages land in per-contact rooms.

- **Outbound:** typing in a Personal contact room uses the normal agent execute path; Cortex routes delivery as desktop `@whatsapp-send-text` (`WARP_EXECUTE` for the JoAi app to run).
- **Inbound:** wacli webhooks create External messages in the matching Personal room (not Business WhatsApp rooms).
- **Broadcast:** Personal rooms are not included in `joai-broadcast` — only Cortex social platforms are.

## ChatApps vs integrations

[ChatApps](/chatapps) publish JoAi experiences into ChatGPT / Claude / Cursor via MCP. That is separate from installing Slack/Telegram-style integrations above.

## Not in the catalog

**Apple Health** and **AI Nexus** are not current installer integrations.

## Related

- [Agents](/agents)
- [Teams](/teams)
- [Native apps](/apps/)
- [API](/api)
- [Webhooks](/webhooks)
- [MCP](/protocols/mcp)
- [ChatApps](/chatapps)
