# Twilio

Connect Twilio so your agent can send and receive **SMS** (and use voice where configured).

## Requirements

- A Twilio account with Account SID, Auth Token, and a phone number
- An active JoAi agent

## Setup

1. Open **Agent settings → Integrations** → **Twilio**
2. Enter **Account SID**, **Auth Token**, and **Phone Number**
3. Click **Connect**
4. Copy the webhook URL JoAi shows and point the Twilio number’s messaging webhook at it

## How it works

- **Inbound:** SMS to the Twilio number is delivered into SMS rooms
- **Outbound:** replies from those rooms (and SMS campaign/contact sends) go through Twilio

## Limits

- Phone numbers should be in a format Twilio accepts (typically E.164)
- Voice features depend on Twilio/JoAi voice configuration beyond basic SMS

## Related

- [Campaigns](/campaigns) — SMS campaigns
- [Contacts](/apps/contacts)
- [Integrations overview](/integrations/)
