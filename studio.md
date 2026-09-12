# Studio

Studio is JoAi’s generative media workbench: create video, slideshow, and clip projects, manage reusable **elements**, and export for social formats. Open **Studio** from the dashboard (`/studio`).

## Overview

- **Projects** — prompt-driven generative video/slideshow, or **clip** projects from source video / YouTube
- **Elements** — reusable visual/brand assets attached to projects (`/studio/elements`)
- Output presets: **9:16 social** (TikTok / Reels / Shorts), **16:9 launch**, **1:1 square teaser**
- Optional **NSFW** flag on new projects
- Agents drive the same pipeline over MCP (`studio_*` tools)

## In the app

### Home (`/studio`)

1. Open **Studio**
2. Choose **Projects** or **Elements**
3. Start a project with a prompt (or clip brief)
4. Pick **output type**: `video` · `slideshow` · `clips`
5. Pick a platform shortcut (TikTok / Reels) or an explicit preset
6. Continue in the project flow: direction → storyboard → generate → review → produce / export

### Clip projects

- Set output type to **clips**
- Pass a source video URL or YouTube URL (transcript-driven analysis; final renders need uploaded/direct media where required)
- Stages: `source-processing` → `candidates-ready` → `draft-ready` → produce → export

### Generative projects

- Stages typically: `questions` → `concept` → `draft-ready` → produce → export
- Attach **elements** from the team library for brand consistency

### Elements

Manage the team element library under Studio → **Elements**. Create, update, generate variations — same surface as Sites CMS element tools when Sites is installed.

## For agents (MCP)

Board/Studio project tools (confirm with `tools/list`):

| Tool | Purpose |
| --- | --- |
| `studio_send` | Start or continue a studio project (generative or `outputType: "clips"`) |
| `studio_produce` | Produce when draft-ready |
| `studio_wait` | Wait for progress |
| `studio_export` | Export finished media |
| `list_projects` / `get_project` / `create_project` / `delete_project` | Project CRUD (Board-gated) |
| `list_elements` / `create_element` / … | Elements (Sites-gated when using Sites CMS tools) |

Live schemas: `tools/list`. See [MCP](/protocols/mcp) and [SKILL.md](https://joai.ai/SKILL.md).

## Related

- [Agents](/agents)
- [Board](/apps/board)
- [Sites](/sites)
- [Workspace](/apps/files)
- [Native apps](/apps/)
