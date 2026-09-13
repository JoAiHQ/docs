# N8N

Use N8N workflows with your JoAi agent via API tokens and the JoAi node.

## Requirements

- An N8N instance where you can add the JoAi node / API credentials
- An active JoAi agent

## Setup

1. Open **Agent settings → Integrations** → **N8N**
2. In N8N, select the **JoAi node** as a trigger (or use API nodes as documented in your N8N setup)
3. Generate an **API token** in the JoAi panel (token generator)
4. Paste the token into the N8N API / JoAi node configuration
5. Copy the **Agent ID** from JoAi when the workflow needs to reference the agent

## How it works

- N8N calls JoAi with the API token to trigger or drive agent-related automation
- The Agent ID uniquely identifies which agent the workflow should target

## Limits

- Treat API tokens like passwords; rotate if exposed
- Workflow design lives in N8N — JoAi provides credentials and agent identity

## Related

- [API Tokens](/integrations/api-tokens)
- [API](/api)
- [Integrations overview](/integrations/)
