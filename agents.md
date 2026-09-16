# Agents

Agents are the core of JoAi. They are next-generation AI assistants that understand natural language, use powerful skills, manage Web3 digital wallets, and connect to services. Each agent comes with built-in capabilities for web search, PDF analysis, image understanding, voice conversations, reminders, and blockchain interactions across Sui, Solana, Ethereum, Base, MultiversX, and EVM chains.

## Agent Modes

Agents operate in three modes:

- **Local Mode** - Runs on your device
- **Cloud Mode** - Runs on JoAi servers (always available, recommended)
- **External Mode** - Runs on external infrastructure

## Creating Agents

### From Blueprints (Recommended)

1. Navigate to **Blueprints** page
2. Browse available blueprints
3. Click on a blueprint to see details (features, required wallets, shortcuts)
4. Click **"Create Agent now"**
5. Enter agent name
6. Agent is created with all blueprint configurations

### From Scratch

1. Go to **Agents** section
2. Click **"Create Agent"**
3. Fill in:
   - Name and description
   - Avatar (optional)
   - Mode (Local/Cloud/External)
   - Character/personality (optional)
4. After creation, configure wallets, [integrations](/integrations/), and settings

## Agent Settings

Access via **Agents > Settings** or agent settings button.

### General Settings

- **Name & Description** - Update agent information
- **Avatar** - Change visual representation
- **Mode** - Switch between Local/Cloud/External
- **Character** - Customize personality traits
- **Password** - Set agent password protection

### Auto Mode

Agent responses always pass through a delivery action selected for the current room or provider. With Auto Mode enabled, the action executes immediately; with Auto Mode disabled, the response remains editable and waits for approval before delivery.

Proposed actions queue up in the **pending actions** banner. Open it to review them one at a time — each card carries a short description of what the action will do, and you can step through the queue with the arrow buttons (or the left/right arrow keys) before approving, always approving, or declining. Older proposals are shown first so you can work through them in the order they were made.

Actions that only run in the desktop app (for example CLI commands like WhatsApp Personal) show a desktop-download hint instead of an approve button, with **Skip** to move on to the next one.

### Knowledge Base

Upload documents that agents can reference to improve their context and responses. See [Knowledge Base](/knowledge) for detailed information.

### Shortcuts

Create quick actions for frequently used workflows. See [Shortcuts](/shortcuts) for detailed information.

### Tasks

Set up automated, recurring tasks. See [Tasks](/tasks) for detailed information.

### Alerts

Configure notifications for important events. See [Alerts](/alerts) for detailed information.

### Cards

Add quick access information cards that appear in the agent interface:

- Create cards with important information
- Cards provide quick reference without searching

## MCP Access

Each agent can be connected to external AI applications (ChatGPT, Claude, Cursor, and others) via the [Model Context Protocol (MCP)](/protocols/mcp). Setup: [MCP integration](/integrations/mcp). When connected, those applications can invoke your agent's Warps as tools.

MCP tool calls consume **credits** from your plan's monthly allowance. See [MCP Credits & Usage](/protocols/mcp#credits--usage) for plan limits and overage pricing.

Which tools appear depends on which [native apps](/apps/) are installed on the team (Shop, Contacts, Forms, …).

## Related

- [Native apps](/apps/)
- [Integrations](/integrations/)
- [Teams](/teams)
- [MCP](/protocols/mcp)
- [ChatApps](/chatapps)
- [Skills](/skills)
- [Blueprints](/blueprints)
