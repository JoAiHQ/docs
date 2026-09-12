# Meetings

Meetings captures live conversations, transcripts, and AI summaries. Install **Meetings** under **Team settings → Apps**, then open **Meetings** in the sidebar (`/meeting`).

## Overview

- Record from the JoAi app (mic) or join a **coded meeting** invite
- Live **transcript** with speakers, bookmarks, and copy
- After the session: **summary**, action items, and speaker assignment
- Desktop can **auto-detect** native **Google Meet**, **Microsoft Teams**, and **Zoom** windows (title/bundle) when the desktop app is running
- Consent dialog before capture; usage may be metered (word / plan limits) with a countdown in the recorder

## In the app

### Record (`/meeting`)

1. Install **Meetings**
2. Open **Meetings**
3. Accept consent prompts if shown
4. Start listening / recording (or allow desktop auto-join when a supported meeting app is detected)
5. Watch the live transcript; bookmark important moments
6. Stop when finished — open **Summary** for the session

### Join with code

Share or open a join URL with a meeting code (e.g. `/meetings/join?code=…`). The joiner shows features (summary, transcription) and can open the summary when the session ends.

### Summary (`/meeting/summary?id=…`)

- Read the generated summary
- Assign speakers when needed
- Carry follow-ups into [Contacts](/apps/contacts) activities or [Board](/apps/board) / [Tasks](/tasks)

Upcoming appointment meetings may also deep-link into the same summary view from [Appointments](/apps/appointments).

## For agents

Meeting capture is primarily a product/runtime surface. Transcript ingest ops (when exposed on the agent MCP):

- `ingest_meeting_transcript` — deduped ingest by provider + meeting id
- `get_ingestion_ops` / `reprocess_ingestion` — monitor / retry

Also use [Knowledge](/knowledge) ingestions. See [SKILL.md](https://joai.ai/SKILL.md) and [MCP](/protocols/mcp).

## Tips

- Prefer a quiet mic and stable network for better transcripts
- Bookmark while recording instead of hunting later
- Confirm speaker labels before sharing summaries externally
- Keep desktop permissions enabled if you rely on Meet / Teams / Zoom auto-detect

## Related

- [Native apps](/apps/)
- [Appointments](/apps/appointments)
- [Contacts](/apps/contacts)
- [Board](/apps/board)
- [Knowledge](/knowledge)
- [Voice dictation](/apps/voice-dictation)
