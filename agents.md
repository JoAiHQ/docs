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
- **Primary agent** - Use this agent as the default sender for team-level emails and reports

### Voice

Voice settings control audio replies and the agent's cloned voice.

- **Voice output** - Let the agent answer with audio
- **Voice** - Pick a built-in voice or your cloned one
- **My voice** - Record or upload 1–2 samples, then clone. Recording opens a guide that shows a short text in your language: read it out loud, listen to the take, then create the clone. Aim for 20–40 seconds of calm, natural speech in a quiet room; uploads accept MP3, WAV, OGG and M4A up to 3 MB each.

A cloned voice is used to send WhatsApp voice notes through the personal WhatsApp integration. The message text is only the script; the recipient gets the voice note. Sending requires the [desktop app](/desktop) with personal WhatsApp connected.

Only clone a voice you own or have explicit permission to use.

### Auto Mode

Agent responses always pass through a delivery action selected for the current room or provider. With Auto Mode enabled, the action executes immediately; with Auto Mode disabled, the response remains editable and waits for approval before delivery.

Proposed actions queue up in the **pending actions** banner. Open it to review them one at a time — each card carries a short description of what the action will do, and you can step through the queue with the arrow buttons (or the left/right arrow keys) before approving, always approving, or declining. Older proposals are shown first so you can work through them in the order they were made.

**Always Approve** opens a short trust sheet so you can scope the rule: the entire action, only when a specific field matches (for example a contact property key), or a custom set of pinned fields. Future runs that match the rule skip the approval card. Choosing entire trust replaces any scoped rules for that action; choosing a scoped rule while entire trust exists can replace it. Manage or revoke these rules under **Agent Settings → Identity → Trusted actions**. Social chat cards only offer Approve / Reject — use the app for scoped Always Approve.

Actions that only run in the desktop app (for example CLI commands like WhatsApp Personal) show a desktop-download hint instead of an approve button, with **Skip** to move on to the next one.

### Team access

An agent belongs to one team. Owners and admins can grant an agent access to other teams where they can manage member roles, so it can read and write that team's data. Manage grants under **Agent Settings → Team access**: pick a team, choose a role (Member, Developer, or Admin), and add it. Revoke access from the same list.

Agents can also request access themselves from a conversation. The request appears as an approval card in the room; approve it (or adjust the role first) to grant access. Team access requests always require a human approval, even when the agent runs in Auto Mode. An agent can only be granted access to teams where its owner can manage member roles.

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
