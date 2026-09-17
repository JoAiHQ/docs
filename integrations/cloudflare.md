# Cloudflare

Connect a **Cloudflare API token** to an agent so JoAi can read zone analytics (site metrics / monthly reports) and run [Cloudflare warps](https://docs.joai.ai/warps/general) (`@cloudflare/*`).

## Requirements

- An active JoAi agent
- A Cloudflare API token with at least **Zone → Analytics → Read** for the zones you report on
- Optional: Cloudflare **Account ID** for account-level warps (Workers, KV)

## Setup

1. Open **Agent settings → Integrations** → **Cloudflare**
2. Paste your API token (required on first connect)
3. Optionally add an Account ID
4. Click **Connect Cloudflare** (or **Update** to replace the token / set account ID)

The token is stored encrypted as an agent secret (`CLOUDFLARE_API_TOKEN`). Monthly site reports pick any team agent that has this secret.

From **Sites**, turning on **monthly report** with source `cloudflare` opens the shared Cloudflare setup dialog if no agent on the team has a token yet — connect there, then the report turns on.

## How it works

- **Site metrics / monthly reports** — `metrics-query` and the monthly report job use the token on an agent that has Cloudflare connected
- **Warps** — `@cloudflare/*` actions resolve `CLOUDFLARE_API_TOKEN` (and optionally `CLOUDFLARE_ACCOUNT_ID`) from the executing agent

## Limits

- Per-agent credential — connect Cloudflare on the agent that should run metrics or warps
- Zone analytics needs the zone tag as the site’s **metrics resource**
- Token scope must allow the Cloudflare APIs you call

## Related

- [Sites](/sites) — brandless sites, metrics, monthly reports
- [Integrations overview](/integrations/)
- [Agents](/agents)
