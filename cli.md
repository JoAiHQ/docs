# CLI

The JoAi CLI lets you interact with your AI agents directly from the terminal. Manage contacts, tasks, knowledge, and chat — all without leaving the command line.

## Installation

**npm (recommended):**

```bash
npm install -g @joai/cli
```

The CLI is also bundled with the [JoAi desktop app](https://joai.ai/en/download). If you have the desktop app installed, the `joai` command is already available.

**Requirements:** Node.js 20+

## Authentication

```bash
joai login
```

This opens your browser for secure OAuth authentication. Once authenticated, your session persists across terminal sessions.

```bash
joai logout    # Sign out and revoke the CLI token
joai status    # Show current auth and active context
joai doctor    # Check connectivity and health
```

### Environment

By default the CLI connects to mainnet. Use `--env` to target a different environment:

```bash
joai login --env devnet
```

Options: `mainnet` (default), `devnet`, `testnet`, `local`

## Context Management

The CLI maintains persistent context for your active team, agent, and room. Set them once and all subsequent commands use that context.

### Teams

```bash
joai teams list              # List your teams
joai teams use [slug]        # Set the active team
joai teams invite            # Invite a member
```

**Options for `teams invite`:**
- `--email <email>` — Email address to invite
- `--role <role>` — Role: `owner`, `admin`, or `member`

### Agents

```bash
joai agents list             # List agents in the active team
joai agents use [uuid]       # Set the active agent
```

**Options:**
- `--team <slug>` — Override the active team
- `--json` — Output as JSON

### Rooms

```bash
joai rooms list              # List rooms for the active agent
joai rooms use [id]          # Set the active room
```

**Options:**
- `--agent <uuid>` — Override the active agent
- `--json` — Output as JSON

## Chat & Messaging

### One-off Messages

```bash
joai ask "What's on my agenda today?"
```

Send a single message and stream the agent's response. Supports piping from stdin:

```bash
echo "Summarize this" | joai ask
```

**Options:**
- `--agent <uuid>` — Override the active agent
- `--room <id>` — Override the active room

### Interactive Chat

```bash
joai chat
```

Start a persistent chat session. Type messages and see streamed responses. Type `/exit` or `exit` to quit.

**Options:**
- `--agent <uuid>` — Override the active agent
- `--room <id>` — Override the active room

### Message History

```bash
joai messages
```

View past messages in the active room.

**Options:**
- `--room <id>` — Override the active room
- `--limit <n>` — Max messages to fetch (default: 50)
- `--json` — Output as JSON

## Contact Management

```bash
joai contacts list                 # List all contacts
joai contacts get <id>             # Show a contact
joai contacts create               # Create a new contact
joai contacts update <id>          # Update a contact
joai contacts delete <id>          # Delete a contact
joai contacts activities list <id> # List activities for a contact
joai contacts activities add <id>  # Add an activity to a contact
```

**Options for `contacts list`:**
- `--search <query>` — Filter by search query

**Options for `contacts create`:**
- `--name <name>` — Contact name
- `--email <email>` — Contact email

**Options for `contacts update`:**
- `--name <name>` — New name
- `--email <email>` — New email
- `--notes <notes>` — New notes

**Options for `contacts activities add`:**
- `--type <type>` — Activity type: `note`, `call`, `meeting`, `email`, `task`, `custom`
- `--description <description>` — Activity description

All contact commands support `--json` for machine-readable output.

## Tasks & Items

```bash
joai items list               # List items
joai items get <id>           # Show an item
joai items create             # Create a new item
joai items update <id>        # Update an item
joai items delete <id>        # Delete an item
```

**Options for `items list`:**
- `--status <status>` — Filter: `backlog`, `active`, `review`, `done`, `archived`

**Options for `items create`:**
- `--title <title>` — Item title
- `--priority <priority>` — Priority: `normal`, `high`, `critical`

**Options for `items update`:**
- `--title <title>` — New title
- `--status <status>` — New status
- `--priority <priority>` — New priority

## Knowledge Management

### Memories

```bash
joai memories list             # List memories
joai memories add              # Add a memory
joai memories delete <id>      # Delete a memory
```

**Options for `memories list`:**
- `--search <query>` — Search memories

**Options for `memories add`:**
- `--content <content>` — Memory content

### Goals

```bash
joai goals list                # List goals
joai goals create              # Create a goal
joai goals update <id>         # Update a goal
```

**Options for `goals create`:**
- `--title <title>` — Goal title
- `--priority <priority>` — Priority: `normal`, `high`, `critical`

**Options for `goals update`:**
- `--progress <0-100>` — Progress percentage
- `--status <status>` — Status: `active`, `paused`, `completed`, `archived`

### Reminders

```bash
joai reminders list            # List reminders
joai reminders add             # Add a reminder
joai reminders delete <id>     # Delete a reminder
```

**Options for `reminders add`:**
- `--text <text>` — Reminder text
- `--at <datetime>` — Schedule time (ISO 8601, e.g. `2025-12-31T09:00:00Z`)

### Document Ingestion

```bash
joai ingest report.pdf
```

Ingest a file into the agent's knowledge base.

**Options:**
- `--title <title>` — Document title (defaults to filename)
- `--json` — Output as JSON

## Shell Completions

Generate shell completions for your terminal:

```bash
joai completion bash    # Bash
joai completion zsh     # Zsh
joai completion fish    # Fish
```

Add the output to your shell profile for tab completion of all commands and options.

## JSON Output

Most commands support `--json` for structured output, making the CLI easy to integrate into scripts and pipelines:

```bash
joai contacts list --json | jq '.[0].name'
joai items list --status active --json
```

## Troubleshooting

Run the health check to diagnose connection issues:

```bash
joai doctor
```

This verifies:
- Authentication status
- Active context (team, agent, room)
- API reachability
- Cortex service health

**Common issues:**

- **"Not logged in"** — Run `joai login` to authenticate
- **"No active team"** — Run `joai teams use` to select a team
- **"No active agent"** — Run `joai agents use` to select an agent

## Related

- [Agents](/agents) — Learn about AI agents
- [Chat & Commands](/chat-commands) — Chat commands in the web app
- [Workspace](/workspace) — Desktop workspace features
- [API](/api) — REST API documentation
- [Integrations](/integrations) — Connect external services
