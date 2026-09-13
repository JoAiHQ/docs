# API

The JoAi API lets you manage your AI workspace programmatically — agents, contacts, items, memories, goals, reminders, and more.

**Base URL:** `https://api.joai.ai/api/v1`

## API Reference

Interactive reference:

**[api.joai.ai/docs](https://api.joai.ai/docs)**

## Authentication

Bearer token:

```http
Authorization: Bearer <your-token>
```

Scope to a team:

```http
X-Team-Slug: my-team
```

Or authenticate as an agent (team resolved automatically):

```http
X-Agent-Auth-Key: <agent-auth-key>
```

## Creating API tokens

Tokens are long-lived credentials scoped via `X-Team-Slug`.

Create them in the product from either:

1. **Settings → API** (personal settings navigator), or
2. **Developers → API** (`/developers`), or
3. **Integrations → API Tokens** install card

MCP: `create_api_token` (agent tooling).

## OpenAPI & agents

Prefer OpenAPI for schemas and [SKILL.md](https://joai.ai/SKILL.md) as the agent entry index into these docs. Product guides stay human-focused.

## Related

- [Developers](/developers)
- [MCP](/protocols/mcp)
- [CLI](/cli)
- [Webhooks](/webhooks)
- [Integrations](/integrations)
- [Teams](/teams)
