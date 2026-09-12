# Knowledge

Knowledge is everything your agent remembers and references: memories, documents, ingestions, skills, goals, and reminders. Open **Agent settings → Knowledge**.

## Overview

Tabs in Knowledge:

| Tab | Purpose |
| --- | --- |
| **Memory** | Durable facts the agent should keep |
| **Documents** | Uploaded reference files (PDF, text, …) |
| **Ingestions** | Pipeline runs from transcripts, articles, connectors |
| **Skills** | Markdown skill files (scope, tools, media) — see [Skills](/skills) |
| **Goals** | Measurable goals (also Board MCP) |
| **Reminders** | Time-based reminders |

## In the app

1. Open **Agent settings → Knowledge**
2. Pick a tab
3. Create or upload; wait for processing on documents/ingestions
4. Delete or update outdated entries

### Memories

Short durable facts. Prefer memories for stable preferences and CRM-adjacent truths; prefer documents for long manuals.

### Documents

Upload PDFs and text. Agents search and cite them in chat / MCP.

### Ingestions

Queued structured ingestion (meeting transcripts, Readwise, X mentions, notes). Monitor status here; agents can use `ingest_knowledge`, `ingest_meeting_transcript`, `get_ingestion_ops`, `reprocess_ingestion` where available.

### Goals & reminders

Create goals and reminders in Knowledge. Board MCP also exposes `list_goals`, `create_goal`, `list_reminders`, `create_reminder`, etc.

## For agents (MCP)

| Tool | Purpose |
| --- | --- |
| `create_memory` / `update_memory` / `search_memories` | Memories |
| `list_documents` / `create_document` / `update_document` / `delete_document` | Documents |
| `ingest_knowledge` | Queue structured ingestion |
| `list_skills` / `create_skill` / `update_skill` / `delete_skill` | Skills |
| `list_goals` / `create_goal` / `update_goal_progress` | Goals (Board) |
| `list_reminders` / `create_reminder` / `delete_reminder` | Reminders (Board) |

Meeting ops (when exposed): `ingest_meeting_transcript`, `get_ingestion_ops`, `reprocess_ingestion`.

Live schemas: `tools/list`. See [MCP](/protocols/mcp) and [SKILL.md](https://joai.ai/SKILL.md).

## Tips

- Keep memories short and factual
- Re-ingest when source docs change materially
- Use [Desk](/desk) for temporary session media, not Knowledge

## Related

- [Agents](/agents)
- [Skills](/skills)
- [Board](/apps/board)
- [Meetings](/apps/meeting)
- [Desk](/desk)
- [Workspace](/apps/files)
