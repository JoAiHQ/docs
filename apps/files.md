# Workspace (Files)

The **Workspace** native app (slug: `workspace`) connects a local or cloud project folder to JoAi and unlocks the team media library. Install it under **Team settings → Apps**.

It does **not** add a main sidebar item. After install you get:

- The **Workspace** control in chat (primary)
- The **Files** media library at `/files` (configure / library)

> Three different “workspace” ideas:
>
> 1. **This native app** — folder + files (this page)
> 2. **[Desk](/desk)** — `/desk-*` commands for temporary chat media
> 3. Desktop folder sync — part of this app’s chat control

## Overview

- Connect a **local folder** (desktop) or use **cloud** workspace files
- Multi-workspace tabs per team when configured
- Bootstraps **`AGENTS.md`** in the folder for agent context / MCP targets
- Drag-and-drop upload into the active workspace
- Optional **contracts** panel and browser-control hints in the Workspace UI
- Team **media library** at `/files` for reusable assets

## In the app

### Chat Workspace control

1. Install **Workspace** under **Team settings → Apps**
2. In chat, open the **Workspace** button
3. Connect a folder (desktop) or work with cloud files
4. Browse files, upload, switch workspaces, open contracts panel when relevant

On desktop, if no folder is connected yet, the UI nudges you to set one up.

### Media library (`/files`)

1. Open **Files** (`/files`) after install
2. Upload, browse, and manage team media (images, PDFs, etc.)
3. Reuse assets from Studio, Shop, Forms, Sites, and other pickers

## For agents

File/media and document tools are general agent tooling (not gated solely by Workspace):

- Media: `media_list`, `media_upload`, `media_delete`
- Documents: `list_documents`, `create_document`, `update_document`, `delete_document`, ingest

Confirm with `tools/list`. See [MCP](/protocols/mcp), [Knowledge](/knowledge), [SKILL.md](https://joai.ai/SKILL.md).

## Tips

- Prefer one canonical folder per team project
- Keep `AGENTS.md` accurate so agents know MCP targets
- Use [Desk](/desk) commands for ephemeral session media — not long-lived library files

## Related

- [Native apps](/apps/)
- [Desk](/desk)
- [Knowledge](/knowledge)
- [Contracts](/apps/contracts)
- [Sites](/sites)
- [Shop](/apps/shop)
