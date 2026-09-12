# Contributing to JoAi docs

This repo is the canonical **user-facing** JoAi documentation (VitePress → docs.joai.ai).

## Keep docs aligned with the product

- When product behavior changes in `joai--api`, `joai--pwa`, `joai--cortex-service`, or `joai--warps`, update the matching page here in the **same task**.
- If no page exists, add one and register it in `.vitepress/config.mts` (sidebar).
- Prefer short, accurate product guides. Point to MCP `tools/list`, OpenAPI, and `https://joai.ai/SKILL.md` for machine contracts — do not duplicate full API schemas here.
- Cross-link related pages (e.g. Teams ↔ Campaigns) when it helps discovery.
- Match the tone and structure of existing pages (`agents.md`, `teams.md`, `campaigns.md`, …).

## Do not

- Invent features that are not shipped.
- Leave stale sections after a product change you just made in a sibling repo.
- Commit generated VitePress build output unless that is already the repo’s publish flow.

> Note: On case-insensitive filesystems, do **not** add an `AGENTS.md` file — it collides with the product page `agents.md`.
