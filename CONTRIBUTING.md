# Contributing to JoAi docs

This repo is the canonical **user-facing** JoAi documentation (VitePress → docs.joai.ai).

## Keep docs aligned with the product

- When product behavior changes in `joai--api`, `joai--pwa`, `joai--cortex-service`, or `joai--warps`, update the matching page here in the **same task**.
- If no page exists, add one and register it in `.vitepress/config.mts` (sidebar).
- Prefer short, accurate product guides. Point to MCP `tools/list`, OpenAPI, and `https://joai.ai/SKILL.md` for machine contracts — do not duplicate full API schemas here.
- Cross-link related pages (e.g. [Teams](/teams) ↔ [Native apps](/apps/) ↔ [Campaigns](/campaigns)) when it helps discovery.
- Match the tone and structure of existing pages (`agents.md`, `campaigns.md`, `apps/shop.md`, …).

## Native apps

- Canonical slugs live in `joai--pwa/packages/core/src/team/apps.ts` (and API `NativeApp`).
- Document each native app under `apps/` (or link an existing root page like `campaigns.md` / `sites.md` from the **Native apps** sidebar group).
- Include: what it is, how to install/use in the UI, public surfaces, MCP tools (honest about gaps), and Related links.
- Disambiguate naming traps: **Workspace** (`workspace` slug) vs [Desk](/desk); **Mobile apps** (`app-store.md`) vs team **Apps** installer; **ChatApps** vs native apps.

## Do not

- Invent features that are not shipped.
- Leave stale sections after a product change you just made in a sibling repo.
- Commit generated VitePress build output unless that is already the repo’s publish flow.

> Note: On case-insensitive filesystems, do **not** add an `AGENTS.md` file — it collides with the product page `agents.md`.
