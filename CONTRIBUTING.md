# Contributing to JoAi docs

This repo is the canonical **user-facing** JoAi documentation (VitePress → docs.joai.ai).

## Keep docs aligned with the product

- When product behavior changes in `joai--api`, `joai--pwa`, `joai--cortex-service`, or `joai--warps`, update the matching page here in the **same task**.
- If no page exists, add one and register it in `.vitepress/config.mts` (sidebar).
- Prefer short, accurate product guides. Point to MCP `tools/list`, OpenAPI, and `https://joai.ai/SKILL.md` for machine contracts — do not duplicate full API schemas here.
- Cross-link related pages (e.g. [Teams](/teams) ↔ [Native apps](/apps/) ↔ [Campaigns](/campaigns)) when it helps discovery.
- Match the tone and structure of existing pages (`agents.md`, `campaigns.md`, `automations.md`, `apps/shop.md`, …).

## Native apps

- Canonical slugs live in `joai--pwa/packages/core/src/team/apps.ts` (and API `NativeApp`).
- Document each native app under `apps/` (or link an existing root page like `campaigns.md` / `automations.md` / `sites.md` from the **Native apps** sidebar group).
- Include: what it is, how to install/use in the UI, public surfaces, MCP tools (honest about gaps), and Related links.
- Disambiguate naming traps: **Workspace** (`workspace` slug) vs [Desk](/desk); **Mobile apps** (`app-store.md`) vs team **Apps** installer; **ChatApps** vs native apps.

## Integrations

- Canonical catalog: `joai--pwa/app/features/Integration/config.tsx` (slugs + categories) and API `IntegrationType`.
- Document each installable integration under `integrations/` and register it in `.vitepress/config.mts` (**Integrations** sidebar group) in the same task.
- Page shape: one-liner, requirements, setup steps from the matching `*Instructions.tsx`, how inbound/outbound works, limits/gotchas, Related links.
- Keep guides product-focused — point to [API](/api), [MCP](/protocols/mcp), [Webhooks & hooks](/webhooks), and `https://joai.ai/SKILL.md` for machine contracts.
- Disambiguate: **Integrations** (Slack/Telegram/…) vs **Native apps** vs **ChatApps** vs Warps platform docs at `/warps/integrations`.

## Do not

- Invent features that are not shipped.
- Leave stale sections after a product change you just made in a sibling repo.
- Commit generated VitePress build output unless that is already the repo’s publish flow.

> Note: On case-insensitive filesystems, do **not** add an `AGENTS.md` file — it collides with the product page `agents.md`.
