# Grok Voice

Use xAI **Grok** as this agent’s live voice engine for web and phone conversations.

## Requirements

- An xAI API key with access to Grok voice
- An active JoAi agent

## Setup

1. Open **Agent settings → Integrations** → **Grok Voice**
2. Paste your xAI API key (required on first connect; leave blank later unless replacing the key)
3. Optionally enable **Voice** for live web and phone conversations
4. If Voice is on, choose a mode:
   - **JoAI-managed voice** — uses this agent’s JoAi instructions and live tools; pick a voice (`eve`, `ara`, `rex`, `sal`, `leo`) and model (`grok-voice-latest` or `grok-voice-think-fast-2.0`)
   - **Saved Grok agent** — uses a saved xAI agent ID; JoAi instructions and tools are not injected
5. Click **Connect Grok Voice** (or **Update Grok Voice** if already connected)

The key is encrypted and used only for this agent.

## How it works

- When Voice is enabled and saved, live voice sessions for the agent use Grok
- Updating the key replaces the stored secret; voice/model/mode settings update on save
- With Voice disabled, the integration can still hold the key but does not use Grok for live conversations until you enable and save

## Limits

- Per-agent key — each agent needs its own connect if you want Grok voice on multiple agents
- Saved-agent mode needs a valid Grok voice agent ID and does not inject JoAi tools/instructions
- Availability depends on xAI account access and JoAi voice surfaces

## Related

- [Voice dictation](/apps/voice-dictation) — desktop system dictation (different feature)
- [Integrations overview](/integrations/)
- [Agents](/agents)
