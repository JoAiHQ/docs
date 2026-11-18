# Webhooks

Configure **outbound** HTTP callbacks when your agent performs actions or sends messages. Manage inbound hook mapping from the same integration panel where relevant.

## Requirements

- An HTTPS endpoint you control
- An active JoAi agent

## Setup

1. Open **Agent settings → Integrations** → **Webhooks**
2. Copy the **deployment hook** URL. It already contains the `deploy` source and its token — ping it from CI with `GET` or `POST`, optionally with `&message=`. This URL is notification-only: it posts the message as a chat message from your agent, notifies you, and never runs warps. Use the rotate button to replace the token.
3. Optionally manage **API tokens** from the same panel (also available under [API Tokens](/integrations/api-tokens))
4. Use the **inbound hook mapper** when you need to map external sources to warps / handlers
5. Add outbound webhook destinations (URL, secret, retries, headers) in the webhooks manager

Deployment hook from GitHub Actions:

```yaml
- name: Notify JoAi
  if: always()
  env:
    JOAI_DEPLOY_HOOK_URL: ${{ secrets.JOAI_DEPLOY_HOOK_URL }}
  run: |
    [ -z "$JOAI_DEPLOY_HOOK_URL" ] && exit 0
    MESSAGE=$(jq -rn --arg v "Deployment finished: web [$DEPLOY_ENV]" '$v|@uri')
    curl -fsS --max-time 10 "${JOAI_DEPLOY_HOOK_URL}&message=${MESSAGE}" || true
```

Store the whole URL (including `source` and `token`) as a repository secret, then set it with `gh secret set JOAI_DEPLOY_HOOK_URL`.

For the full picture of outbound webhooks vs Agent settings → Automations → Hooks vs the [Automations](/automations) native app vs runtime lifecycle hooks, see [Webhooks & hooks](/webhooks).

## How it works

- Typical outbound triggers include agent output events such as `agent.action`, `agent.message`, and `user.message`
- JoAi POSTs signed or secret-protected payloads to your URL
- Inbound mapping (where configured) helps route external POSTs into JoAi warps

## Limits

- This integration page is the **installer**; deeper contracts and hook types live at [Webhooks & hooks](/webhooks)
- Keep secrets out of client-side code and public repos

## Related

- [Webhooks & hooks](/webhooks)
- [Automations](/automations) — webhook enroll into contact journeys
- [Shortcuts & Flows](/shortcuts)
- [Integrations overview](/integrations/)
- [SKILL.md](https://joai.ai/SKILL.md)
