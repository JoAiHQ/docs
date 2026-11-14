# Board

Board is the team workbench: a kanban of **items** the agent can execute, plus related work (tasks, goals, projects, hooks, blueprints). It is installed by default. Open **Board** in the sidebar.

## Overview

- Kanban columns: **Backlog → Active → Review → Done** (archived separately)
- Create items, then drag between columns or reorder within a column (long-press on mobile)
- Rich description editor on create/edit; search and highlight from deep links (`?highlight=`)
- **Auto-execution** on assignment (toggle and provider in Board settings)
- Archive finished work; reopen from **Archived items**
- Done column hints auto-archive — clear finished work regularly
- Agents get Board MCP tools when the app is installed (default)

## In the app

### Board (`/board`)

1. Open **Board**
2. Add cards in a column (except archived)
3. Drag items across columns or reorder within a column (on mobile: swipe between columns, long-press a card to pick it up)
4. Use **search** to filter cards
5. Open an item for rich description editing, assignment, and execution status
6. Header links:
   - **Settings** — auto-execution and provider
   - **Archived items** — `/board/archive`

If auto-execution is off, the board shows an **Auto-execution disabled** badge.

### Board settings (`/board/settings`)

| Setting | Meaning |
| --- | --- |
| **Enable board auto-execution** | When on (default), assigned board items can run automatically for this team. When off, assignment does not trigger automatic agent execution. |
| **Item execution provider** | Which provider pack runs assigned items. Values are `auto`, `openai`, `anthropic`, `gemini`, and `opencode`; `auto` falls back to item meta, then team BYOK/env settings. |

Stored as team meta `board.auto.enabled` and `board.auto.provider`.

### Item execution providers

Assigned items can run through different execution providers. Choose the provider in **Board settings**. `auto` falls back to item meta, then team BYOK/env settings.

Providers are implemented as Warp provider packs with the same lifecycle actions:

- `launch-task`
- `get-task-status`
- `add-followup`
- `cancel-task`

Some packs run through a hosted API. Local CLI packs (for example OpenCode) run on the user's desktop.

#### Local CLI execution

When a local CLI provider is selected:

- **Working directory:** each device has a local **Item execution working directory** in **Board → Settings** (default `~/Code`). It is stored per device, not in team meta. `JOAI_CODE_ROOT` can override it.
- **Repository tag:** add `repo:<repository-directory>` to the item tags (for example a repo directory named `my-project`). The directory must exist under the working directory and the repo must already have a `dev` branch. The tag is a convention read by the agent; it is not special server-side.
- **Agent flow:** the agent reads the `repo:` tag and calls the provider's `launch-task` action. When the pack accepts them, it passes `REPO`, `RUN_ID`, `CALLBACK_URL`, and `CALLBACK_TOKEN`.
- **Desktop execution:** local CLI packs validate the repo, take a per-repo lock, switch to `dev`, run the CLI, collect changed files and `git diff --stat`, reject/undo commits and branch changes, restore the previous branch, and post the item execution callback.
- **Result:** `completed` moves the item to **Review**. `failed` keeps it **Active** and allows iteration (up to 5).
- No automatic check script runs. Include any checks in the task or repository instructions if needed.

### How to tag an item

Tags are explicit strings on the item. The `repo:` prefix is a convention read by the agent; it is not special server-side.

- **Board UI:** open the item and edit **Tags**.
- **REST API:** `POST /v1/items` or `PUT /v1/items/{id}` with `"tags": ["repo:<repository-directory>"]`.
- **MCP:** `create_item` or `update_item` with `tags: ["repo:<repository-directory>"]`.
- **Warps:** `joai/item-create` or `joai/item-update` with the `tags` input.
- Hashtags in the title cannot carry the colon; set the full tag explicitly.

### Where related Board MCP concepts live in the UI

Board MCP covers more than the kanban. Product UIs:

| Concept | Where in the product |
| --- | --- |
| **Items** | Board columns |
| **Tasks** | [Tasks](/tasks) / chat |
| **Goals / reminders** | Agent settings → **Knowledge** |
| **Hooks** | Agent settings → **Automations → Hooks** (not the [Automations](/automations) native app) |
| **Blueprints** | Agent settings → **Identity** (+ public Blueprints store) |
| **Projects** | **Studio** (`/studio`, project views) — not on the kanban |
| **Updates (News)** | [News](/apps/news) UI — MCP update tools are gated by **Board** |

Also see [Blueprints](/blueprints), [Alerts](/alerts).

## For agents (MCP)

Requires **Board** (default on most teams).

- **Read** tools use team **view** access
- **Write** tools use team **manage** access

**Read:** `list_items`, `list_tasks`, `list_goals`, `list_projects`, `list_hooks`, `list_blueprints`, `list_reminders`, `list_updates`, `get_project`, `get_blueprint`, `get_update_stats`

`list_items` defaults to items **assigned to the calling agent**. Pass `scope=all` to see the full team board.

**Write:** `create_item`, `update_item`, `delete_item`, `create_task`, `toggle_task`, `delete_task`, `create_goal`, `update_goal_progress`, `create_project`, `delete_project`, `create_hook`, `toggle_hook`, `delete_hook`, `create_blueprint`, `update_blueprint`, `create_reminder`, `delete_reminder`, `create_update`, `update_update`, `delete_update`

Live schemas: `tools/list`. See [MCP](/protocols/mcp).

## Tips

- Keep **Active** lean so auto-execution stays predictable
- Use **Review** before Done when humans must approve agent output
- Turn off auto-execution when you want assignment without immediate runs

## Related

- [Native apps](/apps/)
- [Tasks](/tasks)
- [Blueprints](/blueprints)
- [News](/apps/news)
- [Agents](/agents)
