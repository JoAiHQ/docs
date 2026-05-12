# Sites

Sites lets you turn any Warp collection into a fully AI-native web app — automatically. Define routes in a brand config, enable the site, and your agent gets a live booking page, intake form, or any other multi-step workflow as a standalone web app.

## What are Sites?

A Site is a branded web app generated from a set of Warps. Instead of building a frontend from scratch, you define which Warps map to which URL paths in the brand config — and Sites renders them automatically with your team's name, logo, and colors.

The first built-in example: **Appointment Sites**. When a team enables appointment booking, they get a fully functional booking page with calendar, form, and confirmation flow — no frontend work required.

## URL Structure

Sites are served at path-based URLs under `joai.ai`:

```
joai.ai/sites/{agent-slug}/
joai.ai/sites/{agent-slug}/configure
```

There are no subdomains — each site lives under its own path segment on the joai.ai domain.

## How It Works

Sites use **convention over configuration**:

1. **Brand config** (in `joai--warps`) defines the webapp routes — which Warp renders at which path
2. **DB** stores only what can't be inferred: which agent enabled the site and their slug
3. **Team identity** (name, logo, colors) flows from the brand + team settings automatically
4. **Warp UIs** handle the visual experience — including embedded ChatApps via iframes with full MCP protocol support

No custom builder needed. The structure comes from the Warp definitions.

## Routes and Warps

Routes in a brand config map URL paths to Warp identifiers:

```json
{
  "enabled": true,
  "auth": false,
  "indexPath": "/",
  "routes": [
    { "path": "/", "warp": "book", "label": { "en": "Book" }, "nav": true },
    { "path": "/configure", "warp": "configure", "label": { "en": "Settings" }, "nav": false }
  ]
}
```

The `warp` field is the relative Warp name within the brand. The full alias is resolved automatically: `appointment` + `book` → `@appointment-book`.

Warps can be:
- **Standard collect/action Warps** — rendered as forms with inputs and submit
- **Warp UI (ChatApps)** — embedded as iframes with the MCP App Bridge protocol for full interactive experiences (calendars, wizards, multi-step flows)

## AI-Native by Design

Sites are fully AI-native: every Warp behind a route can be called by AI agents via MCP. The same Warp that powers the web form is also the MCP tool — there's no duplication. A booking flow that works in the browser also works when invoked by an AI agent in Claude or ChatGPT.

This means you can:

- Build a **booking page** that users interact with directly, and agents book on their behalf
- Build an **intake form** that collects structured data and executes logic automatically
- Build a **dashboard** using Warp UI that renders live agent state

## From Smart Contract to App

Sites can be generated directly from smart contracts. Warps can be auto-generated from on-chain ABIs — every readable and writable function becomes a Warp action. Add a brand config with site routes, and you have a fully functional app that lets users interact with the contract through a clean web UI, while AI agents call the same actions via MCP.

The path from contract to live app:

1. Deploy contract → run `generate-warps-from-abi` script with the contract's `.abi.json`
2. Review and tune the generated Warp JSONs (labels, hidden fields, gas limits)
3. Define `brand.ts` with `site` routes pointing to the generated Warps
4. Publish the brand to the catalog
5. Enable the site for your agent → live at `joai.ai/sites/{slug}`

## Authentication

Sites support optional JoAi authentication. When `auth: true` is set in the brand config, unauthenticated visitors are shown a sign-in prompt with the team's branding. After login, the session token is passed to Warp actions, enabling user-specific data and gated functionality.

New users can sign up directly on the sign-in page — wallet and agent are auto-provisioned on first visit.

## Example: Appointment App

`joai.ai/sites/mybarbershop/` → Booking calendar (Warp UI: `appointment/book`)  
`joai.ai/sites/mybarbershop/configure` → Settings panel (ChatApp UI, login-gated)

Branding: team name and logo from agent settings. Routes and logic from the `appointment` brand config in `joai--warps`.

## Building Your Own Brand

To create a new Site brand:

1. Add a brand folder in `joai--warps/warps/{brand}/`
2. Create `brand.ts` with a `site` config listing your routes and Warp IDs
3. Create the Warp definitions (JSON or TypeScript) for each route — or generate them from an ABI
4. Publish the brand to the catalog
5. Agents that install the brand get a site automatically

See [ChatApps](/chatapps) for building interactive Warp UI experiences that embed inside Sites.
