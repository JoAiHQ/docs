# Desk

Desk is the chat **media workbench** — images and files attached to the current conversation so the agent can edit, reference, or transform them. Manage it from chat commands or **Agent settings → Desk**.

> Not the same as:
>
> - **[Workspace](/apps/files)** native app (folder sync + team media library)
> - Older docs that mentioned `/workspace-*` commands — those are **`/desk-*`** now

## Overview

- Attach media to the active room’s desk
- Pin / unpin important items
- Sync, list, remove, or clear
- Stream updates keep the desk UI in sync while the agent works

## Commands

All commands start with `/`.

| Command | Purpose |
| --- | --- |
| `/desk-add <media-id>` | Add a media item to the desk |
| `/desk-list` | List desk items |
| `/desk-sync` | Refresh desk state |
| `/desk-remove <item-id>` | Remove one item |
| `/desk-clear` | Clear the desk |
| `/desk-pin <item-id>` | Pin an item |
| `/desk-unpin <item-id>` | Unpin an item |

### Example

```
/desk-add abc123xyz
```

Then ask the agent to edit or analyze the pinned/target media. Clear when the task is done:

```
/desk-clear
```

You can also use **Add to desk** actions on media elsewhere in the app — they send the same `/desk-add` command.

## Agent settings → Desk

Open **Agent settings → Desk** for desk preferences and related advanced controls for that agent.

## Tips

- Prefer desk for **session** media; prefer [Knowledge](/knowledge) documents for long-lived reference
- Pin the primary target when multiple files are attached
- Clear between unrelated tasks to avoid confused edits

## Related

- [Chat & Commands](/chat-commands)
- [Agents](/agents)
- [Knowledge](/knowledge)
- [Workspace](/apps/files)
- [Studio](/studio)
