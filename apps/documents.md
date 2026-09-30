# Documents

The **Documents** native app (slug: `documents`) is where you manage agent training documents — list, create, edit, archive, and share. Install it under **Team settings → Apps**.

Install unlocks:

- The **Documents** sidebar page at `/documents`
- MCP tools: `list_documents`, `create_document`, `update_document`, `delete_document`

This is the only in-app Documents UI. **Agent settings → Knowledge** covers memories, ingestions, skills, goals, and reminders — not documents.

## Overview

- Long-form reference material (text, PDF, HTML, markdown, templates)
- Syncs into Cortex for RAG in chat
- Optional public share links on `documents.joai.ai` (password optional)
- Soft archive removes a document from active knowledge without hard-delete

## In the app

1. Install **Documents** under **Team settings → Apps**
2. Open **Documents** in the sidebar (`/documents`)
3. Create or edit documents for the active agent
4. Share, archive, or delete from the same UI

Old Knowledge links with `?tab=documents` redirect here.

To share a document outside JoAi (e.g. WhatsApp), open it, choose **Make public**, then copy the link or share via WhatsApp. Recipients open a public page on the documents mini-app at `documents.joai.ai/{locale}/{slug}` (locale follows the team language) without signing in. Use the lock control to revoke access.

For sensitive handoffs (credentials, contracts), choose **Add password**. The share URL then includes `?password=…`. Without the query param, recipients see an unlock form. **Remove password** clears protection; the lock control still revokes the whole share.

Prefer **Archive** over delete when a document should leave active knowledge but stay recoverable. Archiving also revokes any public share link. Toggle **Archived** in the documents list to restore.

## For agents (MCP)

Requires the Documents app installed on the team:

| Tool | Purpose |
| --- | --- |
| `list_documents` | List documents (`archived: true` for archive) |
| `create_document` | Create training material |
| `update_document` | Update title/content/share/archive (`public`, `password`, `archived`) |
| `delete_document` | Permanently delete |

Confirm with `tools/list`. See [MCP](/protocols/mcp), [Knowledge](/knowledge), [SKILL.md](https://joai.ai/SKILL.md).

## Tips

- Prefer documents for long manuals; memories for short durable facts
- Archive instead of delete when you may need the content later
- Install Documents when you want the sidebar workspace and agent MCP document tools

## Related

- [Native apps](/apps/)
- [Knowledge](/knowledge)
- [Workspace](/apps/files)
- [Artifacts](/artifacts)
