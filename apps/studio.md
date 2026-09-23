# Studio

Studio is JoAi’s generative media workbench: create video, image, slideshow, and clip projects, manage reusable **elements**, and export for social formats.

Install **Studio** under **Team settings → Apps**. It then appears in the sidebar at `/studio`. Only team members with manage access can open Studio or change projects and elements.

## Overview

- **Projects** — prompt-driven generative video/slideshow/**image**, or **clip** projects from source video / YouTube
- **Elements** — reusable visual/brand assets attached to projects (`/studio/elements`)
- Output presets: **9:16 social** (TikTok / Reels / Shorts), **16:9 launch**, **1:1 square teaser**
- Optional **NSFW** flag on new projects
- Agents drive the same pipeline over MCP (`studio_*` tools) once Studio is installed

## In the app

### Home (`/studio`)

1. Open **Studio** (after installing the app)
2. Choose **Projects** or **Elements**
3. Start a project with a prompt (or clip brief)
4. Pick **output type**: `video` · `slideshow` · `image` · `clips`
5. Pick a platform shortcut (TikTok / Reels) or an explicit preset
6. Continue in the project flow: direction → storyboard → generate → review → produce / export
7. When an export is ready, use **Schedule to Social** (requires Social Media installed) to open `/social` with that export preselected — JoAi copies stills onto the post

### Image and slideshow projects

- **Image** — one social-ready still (produce stops after image generation; no MP4)
- **Slideshow** — multiple stills from the storyboard (stills-primary export for Social; no MP4 required)
- Both export JPEG stills you can schedule with **Schedule to Social**

### Clip projects

- Set output type to **clips**
- Pass a source video URL or YouTube URL (transcript-driven analysis; final renders need uploaded/direct media where required)
- Stages: `source-processing` → `candidates-ready` → `draft-ready` → produce → export

### Generative projects

- Stages typically: `questions` → `concept` → `draft-ready` → produce → export
- Attach **elements** from the team library for brand consistency

### Elements

Manage the team element library under Studio → **Elements**. Create, update, generate variations. From a variation with images, **Schedule to Social** opens the Social composer with that variation. The same element tools are also available when **Sites** is installed (CMS).

## For agents (MCP)

Install Studio on the team before expecting these tools. Confirm with `tools/list`:

| Tool | Purpose |
| --- | --- |
| `studio_send` | Start or continue a studio project (generative or `outputType: "clips"`) |
| `studio_produce` | Produce when draft-ready |
| `studio_wait` | Wait for progress |
| `studio_export` | Export finished media |
| `list_projects` / `get_project` / `create_project` / `delete_project` | Project CRUD (Studio or Board) |
| `list_elements` / `create_element` / … | Elements (Studio or Sites) |

Live schemas: `tools/list`. See [MCP](/protocols/mcp) and [SKILL.md](https://joai.ai/SKILL.md).

## Related

- [Social Media](/apps/social) — schedule posts from Studio exports or element variations (`exportId` / `elementVariationId`)
- [Agents](/agents)
- [Board](/apps/board)
- [Sites](/sites)
- [Workspace](/apps/files)
- [Native apps](/apps/)
