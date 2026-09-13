# Webhooks

Configure **outbound** HTTP callbacks when your agent performs actions or sends messages. Manage inbound hook mapping from the same integration panel where relevant.

## Requirements

- An HTTPS endpoint you control
- An active JoAi agent

## Setup

1. Open **Agent settings → Integrations** → **Webhooks**
2. Optionally manage **API tokens** from the same panel (also available under [API Tokens](/integrations/api-tokens))
3. Use the **inbound hook mapper** when you need to map external sources to warps / handlers
4. Add outbound webhook destinations (URL, secret, retries, headers) in the webhooks manager

For the full picture of outbound webhooks vs Automations hooks vs runtime lifecycle hooks, see [Webhooks & hooks](/webhooks).

## How it works

- Typical outbound triggers include agent output events such as `agent.action`, `agent.message`, and `user.message`
- JoAi POSTs signed or secret-protected payloads to your URL
- Inbound mapping (where configured) helps route external POSTs into JoAi warps

## Limits

- This integration page is the **installer**; deeper contracts and hook types live at [Webhooks & hooks](/webhooks)
- Keep secrets out of client-side code and public repos

## Related

- [Webhooks & hooks](/webhooks)
- [Shortcuts & Flows](/shortcuts)
- [Integrations overview](/integrations/)
- [SKILL.md](https://joai.ai/SKILL.md)
