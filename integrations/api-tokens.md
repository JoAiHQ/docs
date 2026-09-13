# API Tokens

Generate long-lived HTTP API tokens so external apps and scripts can call JoAi as this agent / team context.

## Requirements

- An active JoAi agent (or team context where tokens are managed)
- A secure place to store the token after creation (shown once)

## Setup

1. Open **Agent settings → Integrations** → **API Tokens**
2. Create a token in the token manager
3. Copy it immediately and store it securely
4. Use it as a Bearer token against JoAi HTTP APIs

Full HTTP surface and auth patterns: [API](/api).

## How it works

- Tokens authenticate programmatic access
- Same credentials are reused by utilities like [N8N](/integrations/n8n)

## Limits

- Treat tokens like passwords; revoke/rotate if leaked
- Prefer scoped usage; do not commit tokens to git

## Related

- [API](/api)
- [N8N](/integrations/n8n)
- [Developers](/developers)
- [Integrations overview](/integrations/)
