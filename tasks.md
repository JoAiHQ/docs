# Tasks

Tasks schedule a **warp** to run on a **cron** expression in a chosen **room**. Open **Agent settings → Tasks**.

## Overview

- Pick a warp + room
- Schedule with presets or a custom cron
- Optional **max runs**, **starts at**, **ends at**
- Runs in the background; toggle or delete from the tasks list
- MCP: `list_tasks`, `create_task`, `toggle_task`, `delete_task` (Board-gated)

## Creating a task

1. **Agent settings → Tasks**
2. **Create task**
3. Select **warp**
4. Select **room**
5. Choose schedule:
   - Preset (e.g. daily midnight), or
   - Custom cron
6. Optional: max runs, start/end window
7. Save and leave enabled

## What tasks are not

There is no separate product UI for “conditions”, “on-success / on-failure chains”, or generic interval-only schedulers beyond cron. Use warp logic, [Agent settings → Automations → Hooks](/webhooks), [Flows](/shortcuts), or [Automations](/automations) journeys for branching workflows.

## For agents (MCP)

Requires [Board](/apps/board) (default):

- `list_tasks`, `create_task`, `toggle_task`, `delete_task`

Live schemas: `tools/list`.

## Related

- [Agents](/agents)
- [Board](/apps/board)
- [Shortcuts](/shortcuts)
- [Alerts](/alerts)
- [Rooms](/agents#connections) (rooms live under agent settings)
