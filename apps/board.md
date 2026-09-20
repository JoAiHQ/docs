# Board

Board is the team workbench: a kanban of **items** the agent can execute, plus related work (tasks, goals, projects, hooks, blueprints). It is installed by default. Open **Board** in the sidebar.

## Overview

- Kanban columns: **Backlog → Active → Review → Done** (archived separately)
- Create items, drag between columns, search, highlight from deep links (`?highlight=`)
- **Auto-execution** on assignment (toggle in Board settings)
- Archive finished work; reopen from **Archived items**
- Done column hints auto-archive — clear finished work regularly
- Agents get Board MCP tools when the app is installed (default)

## In the app

### Board (`/board`)

1. Open **Board**
2. Add cards in a column (except archived)
3. Drag items across columns or reorder within a column
4. Use **search** to filter cards
5. Open an item for details, assignment, and execution status
6. Header links:
   - **Settings** — auto-execution
   - **Archived items** — `/board/archive`

If auto-execution is off, the board shows an **Auto-execution disabled** badge.

### Board settings (`/board/settings`)

| Setting | Meaning |
| --- | --- |
| **Enable board auto-execution** | When on (default), assigned board items can run automatically for this team. When off, assignment does not trigger automatic agent execution. |

Stored as team meta `board.auto.enabled`.

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
