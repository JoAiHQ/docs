# Studio

Studio is JoAi’s generative media workbench: create video, image, slideshow, and clip projects, manage reusable **elements**, and export for social formats.

Install **Studio** under **Team settings → Apps**. It then appears in the sidebar at `/studio`. Only team members with manage access can open Studio or change projects and elements.

## Overview

- **Projects** — prompt-driven generative video/slideshow/**image**, **clip** projects from source video / YouTube, or **template** image projects
- **Elements** — reusable visual/brand assets (`/studio/elements`): characters, environments, styles, products, brand assets and **templates**
- **Variations** — saved variants of an element, each with its own image(s)
- **Exports** — the finished media of a project (stills or MP4) with a permanent share page
- Output presets: **9:16 social** (TikTok / Reels / Shorts), **16:9 launch**, **1:1 square teaser**
- Optional **NSFW** flag on new projects
- Agents drive the same pipeline over MCP (`studio_*` tools) once Studio is installed

## Concepts

| Concept | What it is |
| --- | --- |
| **Element** | A reusable building block with a name, type, description and a definition (`spec`) |
| **Element type** | `character`, `environment`, `style`, `product`, `brand` — AI-generated visuals described by a visual spec — or `template` — a fixed layout rendered from content without AI |
| **Variation** | A variant of an element. Stores `overrides` merged over the element's definition and holds the resulting image(s); one is the **primary image**. For templates a variation is a post type or format (other size, layout or content) |
| **Project** | One production: brief → storyboard → generate → produce → export. A project can be pinned to a template variation to render a still directly |
| **Export** | The rendered result of a project (images and/or video). Use it as the source of a social post (`exportId`) |

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
- Opening Social from Studio **generates a caption** in the agent’s voice from the project brief/summary (you can regenerate in the composer)

### Clip projects

- Set output type to **clips**
- Pass a source video URL or YouTube URL (transcript-driven analysis; final renders need uploaded/direct media where required)
- Stages: `source-processing` → `candidates-ready` → `draft-ready` → produce → export

### Generative projects

- Stages typically: `questions` → `concept` → `draft-ready` → produce → export
- Attach **elements** from the team library for brand consistency

### Elements

Manage the team element library under Studio → **Elements**. Create, update, generate variations. From a variation with images, **Schedule to Social** opens the Social composer with that variation. The same element tools are also available when **Sites** is installed (CMS).

- **Visual elements** (character, environment, style, product, brand) have a visual spec: optional text fields for appearance (`baseColor`, `material`, `texture`, `pattern`, `finish`, `condition`), setting (`setting`, `background`, `surface`, `weather`, `timeOfDay`, `season`), lighting (`lightingType`, `lightingColor`, `lightingDirection`), mood (`mood`, `atmosphere`, `colorPalette`), style (`style`, `rendering`, `colorGrade`), camera (`shotType`, `cameraAngle`, `lens`, `depthOfField`, `framing`) and `avoid`. Put details of the subject itself (age, clothing, shape) in the description.
- **Generate a variation** creates an AI image in the background (aspect ratio `1:1`, `16:9`, `9:16`, `4:3` or `3:4`); each uses one image generation from your plan. Variation overrides change single spec fields for that variation only.
- **Regenerate definition with AI** fills the spec from the description or a reference image (uses 1 message).
- **Template elements** render instantly from a layout definition — no AI, no image credits. See **[Studio templates](/apps/studio-templates)** for the definition format, branding, fonts, starters, testing and the post workflow.

### Template projects

Pin a project to a template variation with `template: { elementVariationId, mode, values }` (via MCP `create_project`). The project becomes an **image** project; producing it renders the still from the given values in `light` or `dark` mode and marks it composed, and exporting it creates an export you can schedule to Social. See [Studio templates](/apps/studio-templates#workflow-for-agents).

## For agents (MCP)

Install Studio on the team before expecting these tools. Confirm with `tools/list`:

| Tool | Purpose |
| --- | --- |
| `studio_send` | Start or continue a studio project (generative or `outputType: "clips"`) |
| `studio_produce` | Produce when draft-ready (template projects render directly) |
| `studio_wait` | Wait for `draft-ready` or `composed` |
| `studio_export` | Export finished media; returns the export and its share URL |
| `list_projects` / `get_project` / `create_project` / `delete_project` | Project CRUD (Studio or Board). `create_project` takes `template` for template image projects and `outputPreset`, `targetPlatforms`, `selectedSkills` |
| `list_elements` / `create_element` / `update_element` / `delete_element` | Elements (Studio or Sites). Create/update take `media` for <span v-pre>`{{asset.*}}`</span> images |
| `list_element_variations` / `generate_element_variation` / `update_element_variation` / `delete_element_variation` | Variations (Studio or Sites). `mode` (`light` / `dark`) selects the template render mode |
| `create_template_post_draft` | Render a template with content and draft a social post from it (requires Social Media) |

Parameters for the template workflow: [Studio templates → MCP tools](/apps/studio-templates#mcp-tools). Live schemas: `tools/list`. See [MCP](/protocols/mcp) and [SKILL.md](https://joai.ai/SKILL.md).

## Related

- [Studio templates](/apps/studio-templates) — on-brand images from layout templates
- [Social Media](/apps/social) — schedule posts from Studio exports or element variations (`exportId` / `elementVariationId`)
- [Agents](/agents)
- [Board](/apps/board)
- [Sites](/sites)
- [Workspace](/apps/files)
- [Native apps](/apps/)
