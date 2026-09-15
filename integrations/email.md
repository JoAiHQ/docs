# Email

Give your agent an email address. Receive mail into JoAi, and optionally send with your own provider credentials.

## Requirements

- An active JoAi agent
- For **sending**: a supported provider (e.g. Resend) API key and from-address (or use JoAi defaults when offered)
- Optional **Reply-To**: a real inbox address for human replies (e.g. send from `updates@mail.example.com`, reply to `you@example.com`)

## Setup

1. Open **Agent settings → Integrations** → **Email**
2. Activate email to provision the agent’s inbox address
3. Copy the address JoAi shows — share it with people who should write to the agent
4. To enable sending: choose a provider, save the API key and from-address (or use the default sending option when available). Optionally set **Reply-To** to your real inbox
5. Configure the provider webhook JoAi displays (e.g. Resend → Cortex webhook) so inbound mail is delivered

You can run in **receive-only** mode until sending credentials are set.

## How it works

- **Inbound:** provider webhooks deliver mail into email rooms / threads for the agent
- **Agent replies:** every generated response is routed through the room’s delivery action. In Auto mode it sends immediately; otherwise an editable approval remains in JoAi before the email is sent.
- **Outbound:** approved sends use the configured provider (subject + body; HTML when applicable). If Reply-To is set on the agent email integration, outbound mail includes that header so replies land in your inbox while From stays on the sending domain.
- Email is a social delivery platform for campaigns and room relays when connected

## Limits

- Sending needs provider credentials (or the default path JoAi offers)
- Provider webhook must stay pointed at JoAi for reliable inbound

## Related

- [Campaigns](/campaigns) — email campaigns
- [Contacts](/apps/contacts)
- [Integrations overview](/integrations/)
- [API](/api)
