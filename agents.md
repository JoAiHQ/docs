# Agents

Agents are JoAi’s AI assistants: chat, tools, wallets, automations, and MCP access. Each agent belongs to a [team](/teams) and can run Cortex (default) or OpenClaw engines where configured.

## Creating agents

### From Blueprints (recommended)

1. Open the public [Blueprints](/blueprints) store or Identity → create from blueprint
2. Review features, wallets, shortcuts
3. **Create Agent** and name it

### From scratch

1. **Agents → Create**
2. Set name, avatar, character
3. Configure wallets, knowledge, and integrations after creation

## Agent settings map

Open **Agents → Settings**. Nav is filtered by engine (`cortex` / `openclaw`) and sometimes interests.

### Core

| Section | What you configure |
| --- | --- |
| **Identity** | Name, character, voice, public visibility, blueprint create, move/delete |
| **Knowledge** | Memories, documents, ingestions, skills, goals, reminders — [Knowledge](/knowledge) |

### Automation (Cortex)

| Section | What you configure |
| --- | --- |
| **Tasks** | Scheduled warp runs — [Tasks](/tasks) |
| **Automations** | Tabs: **Shortcuts**, **Alerts**, **Flows**, **Hooks** — see [Shortcuts](/shortcuts), [Alerts](/alerts), [Webhooks](/webhooks) |

### Connections

| Section | What you configure |
| --- | --- |
| **Integrations** | Slack, Telegram, email, MCP, embed, … — [Integrations](/integrations) |
| **Rooms** | Chat rooms for channels / MCP conversations |
| **Widgets** | Warp cards + brand apps in the agent UI (plan-gated `cards`) — not the same as publishing [ChatApps](/chatapps) |

### Business

| Section | What you configure |
| --- | --- |
| **Wallets** | Per-chain wallets — [Wallets](/wallets). Modes: **local**, **cloud**, **external** (wallet modes — not “agent run modes”) |
| **Contracts** | When [Contracts](/apps/contracts) is installed |
| **Monetization** | Per-prompt paid access (`store.pricing`) for public agents / x402 |

### Advanced (Cortex)

| Section | What you configure |
| --- | --- |
| **Missions** | Long-running monitor / research missions |
| **Desk** | Session media workbench prefs — [Desk](/desk) |
| **Upgrades** | Pending agent upgrades |

## Engines

- **Cortex** — full JoAi automation surface (tasks, studio, board execution, …)
- **OpenClaw** — alternate engine; settings nav hides Cortex-only sections

`settings.engine` controls which settings appear.

## MCP access

Connect Cursor, Claude, ChatGPT, and other clients via [MCP](/protocols/mcp). Tools depend on installed [native apps](/apps/). Calls use [billing](/billing) MCP credits.

Core tools always relevant: `prompt_agent`, `joai_agent_info`, `joai_list_agents`, `ingest_knowledge`, …

## Related

- [Native apps](/apps/)
- [Knowledge](/knowledge)
- [Studio](/studio)
- [Wallets](/wallets)
- [Billing](/billing)
- [MCP](/protocols/mcp)
- [x402](/protocols/x402)
- [ChatApps](/chatapps)
- [Blueprints](/blueprints)
- [Teams](/teams)
