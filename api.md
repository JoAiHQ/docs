# API

The JoAi API lets you manage your AI workspace programmatically — agents, contacts, items, memories, goals, reminders, and more.

**Base URL:** `https://api.joai.ai/api/v1`

## API Reference

The full reference with interactive request builder is available at:

**[api.joai.ai/docs](https://api.joai.ai/docs)**

## Authentication

All endpoints require a Bearer token:

```http
Authorization: Bearer <your-token>
```

Pass your team slug to scope requests:

```http
X-Team-Slug: my-team
```

You can also authenticate as an agent using its auth key — the team is resolved automatically:

```http
X-Agent-Auth-Key: <agent-auth-key>
```

## API Tokens

API tokens are long-lived credentials for programmatic access. Each token is tied to your account and scoped to a team via the `X-Team-Slug` header.

**Create a token in the app:**

1. Go to **Agent Settings → Apps** (or **Integrations**)
2. Find the **API Tokens** section
3. Click **Create Token**, give it a name, and save the value securely

> You won't be able to view the token again after closing the dialog.

**Or create one via the API** (requires an authenticated session):

```bash
curl -X POST https://api.joai.ai/api/v1/tokens \
  -H "Authorization: Bearer <session-token>" \
  -H "Content-Type: application/json" \
  -d '{"name": "My Integration"}'
```

**List tokens:**

```bash
curl https://api.joai.ai/api/v1/tokens \
  -H "Authorization: Bearer <session-token>"
```

**Revoke a token:**

```bash
curl -X DELETE https://api.joai.ai/api/v1/tokens/{id} \
  -H "Authorization: Bearer <session-token>"
```

**Security tips:**
- Never commit tokens to version control — use environment variables or a secrets manager
- Create separate tokens per integration
- Revoke tokens that are no longer needed

## Quick Start

```bash
# List your agents
curl https://api.joai.ai/api/v1/agents \
  -H "Authorization: Bearer <your-token>" \
  -H "X-Team-Slug: my-team"

# Create a contact
curl -X POST https://api.joai.ai/api/v1/contacts \
  -H "Authorization: Bearer <your-token>" \
  -H "X-Team-Slug: my-team" \
  -H "Content-Type: application/json" \
  -d '{"name": "Jane Doe", "email": "jane@example.com"}'
```

For the full endpoint reference, visit **[api.joai.ai/docs](https://api.joai.ai/docs)**.
