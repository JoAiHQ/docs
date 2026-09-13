# Email

Give your agent an email address. Receive mail into JoAi, and optionally send with your own provider credentials.

## Requirements

- An active JoAi agent
- For **sending**: a supported provider (e.g. Resend) API key and from-address (or use JoAi defaults when offered)

## Setup

1. Open **Agent settings → Integrations** → **Email**
2. Activate email to provision the agent’s inbox address
3. Copy the address JoAi shows — share it with people who should write to the agent
4. To enable sending: choose a provider, save the API key and from-address (or use the default sending option when available)
5. Configure the provider webhook JoAi displays (e.g. Resend → Cortex webhook) so inbound mail is delivered

You can run in **receive-only** mode until sending credentials are set.

## How it works

- **Inbound:** provider webhooks deliver mail into email rooms / threads for the agent
- **Outbound:** sends use the configured provider (subject + body; HTML when applicable)
- Email is a social delivery platform for campaigns and room relays when connected

## Limits

- Sending needs provider credentials (or the default path JoAi offers)
- Provider webhook must stay pointed at JoAi for reliable inbound

## Related

- [Campaigns](/campaigns) — email campaigns
- [Contacts](/apps/contacts)
- [Integrations overview](/integrations/)
- [API](/api)
