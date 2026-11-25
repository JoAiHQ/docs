# Email

Give your agent an email address. Receive mail into JoAi, and optionally send with your own provider credentials.

## Requirements

- An active JoAi agent
- For **sending**: a supported provider (e.g. Resend) API key and from-address (or use JoAi defaults when offered)
- Optional **Reply-To**: a real inbox address for human replies (e.g. send from `updates@mail.example.com`, reply to `you@example.com`)
- Optional **custom inbound domain**: your own Resend account with a verified domain, an inbound route pointing at the JoAi webhook, and the webhook's signing secret

## Setup

1. Open **Agent settings → Integrations** → **Email**
2. Activate email to provision the agent’s inbox address
3. Copy the address JoAi shows — share it with people who should write to the agent
4. To enable sending: choose a provider, save the API key and from-address (or use the default sending option when available). Optionally set **Reply-To** to your real inbox
5. Configure the provider webhook JoAi displays (e.g. Resend → Cortex webhook) so inbound mail is delivered

You can run in **receive-only** mode until sending credentials are set.

### Custom inbound domain

By default the agent receives mail at `handle` on the shared JoAi inbound domain. Enter **your own domain** next to the handle (e.g. `example.com`) and the agent receives at `handle@example.com` instead. A custom domain runs on your own Resend account, not the JoAi platform account:

1. Verify the domain in your Resend account
2. Point an inbound route (catch-all or a specific address) at the JoAi webhook URL shown in the settings
3. Save that account's API key as the provider API key
4. Paste the webhook's signing secret — inbound mail is only accepted once it is stored

Leave the domain empty to go back to the shared inbound domain.

### Email signature

Every email the agent sends on your behalf can end with a signature. Open **Agent settings → Integrations → Email** and fill in the **Email Signature** section:

- **Name**, **role**, **company**, **phone**, **email**, **website**, **LinkedIn** and a **logo URL**
- Toggle the signature off without losing the values
- Check the live **preview** and the **plain text** fallback before saving

The signature is appended automatically to campaigns, contact emails and automations. A message that already ends with the signature stays unchanged, and agent auto-replies inside an email thread stay untouched. Inbound mail has the signature stripped again so it does not pile up in the conversation history.

### Primary agent

If a team has more than one agent, mark one as the **Primary agent**. Team-level emails such as monthly website reports use that agent's Email integration and From address. One agent per team can be primary; selecting another replaces it. If the primary agent has no configured Email integration, JoAi falls back to the team's first configured sender.

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
