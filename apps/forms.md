# Forms

Forms collect structured information from customers — leads, intake, opt-ins, surveys. Install **Forms** under **Team settings → Apps**, then open **Forms** in the sidebar.

## Overview

- Build forms with fields, title, and description
- **Publish** / lock, share URL, **QR**, smart link, or **embed**
- Review **submissions** (with activity sparkline on overview)
- Optional **marketing opt-in**, **email submission notifications**, **public results**, **list in shop**
- Push notifications to active team members on every submission (always on)
- Chain a **next action** after submit (pick a warp + map inputs)
- Agents manage forms end-to-end over **MCP** when Forms is installed

## In the app

1. Open **Forms**
2. **New form** — add fields; set options below
3. **Publish** / make public when ready (private forms stay editable without accepting public traffic)
4. Share via public URL, QR download, smart link, or embed path
5. Open the form for **submissions** (delete one or clear all)
6. **Install** into agent/warp flows when you want the agent to reuse the form (`install_form` / install modal)

### Field types

`string`, `textarea`, `email`, `phone`, `number`, `boolean`, `select`

### Editor options

| Option | Purpose |
| --- | --- |
| **Fields** | Questions / inputs |
| **Next action** | Pick a warp and map form outputs → warp inputs after successful submit |
| **Marketing opt-in** | Adds consent checkbox for campaigns |
| **Submission notifications** | Optional email to the team on new responses (push is always sent) |
| **Public results** | Optional `/results` page for respondents |
| **In shop** | Show the form on the team storefront |

### Sharing

| Method | Notes |
| --- | --- |
| Public URL | `https://forms.joai.ai/{locale}/{formId}` |
| QR | From the form overview / actions |
| Smart link | Short branded link when [Smart Links](/apps/smart-links) is available |
| Embed | `https://forms.joai.ai/{locale}/{formId}/embed` — iframe-friendly |
| Public results | `…/{formId}/results` and `…/{formId}/results/embed` when enabled |
| Install | Install into agent/warp flows |

Embed example:

```html
<iframe
  src="https://forms.joai.ai/en/YOUR-FORM-ID/embed"
  title="Form"
  style="width:100%;min-height:640px;border:0;"
  loading="lazy"
></iframe>
```

Unpublish or lock to stop public responses without deleting the form.

## Public surfaces

- Primary host: `https://forms.joai.ai/{locale}/{formId}`
- Embed: `https://forms.joai.ai/{locale}/{formId}/embed`
- Results (optional): `…/results` and `…/results/embed`
- Optional listing on the [Shop](/apps/shop) storefront when **In shop** is on

## For agents (MCP)

Requires the **Forms** app.

| Tool | Purpose |
| --- | --- |
| `create_form` | Create |
| `list_forms` / `get_form` | List or fetch |
| `update_form` / `delete_form` | Edit or remove |
| `add_form_field` / `update_form_field` / `remove_form_field` | Fields |
| `publish_form` / `unpublish_form` | Go live / pause |
| `install_form` | Install for agent/warp use |
| `form_submissions` | Read responses |
| `delete_form_submission` / `clear_form_submissions` | Clean up |

After submit, continue with [Contacts](/apps/contacts) (find-or-create) or [Campaigns](/campaigns) (`joai-campaign-send-contact`).

Live schemas: `tools/list`. See [MCP](/protocols/mcp) and [SKILL.md](https://joai.ai/SKILL.md).

## Tips

- Keep fields minimal
- Use opt-in when you will email/SMS later
- Prefer find-or-create so submissions do not create duplicate contacts
- Lock/unpublish while editing a live form

## Related

- [Native apps](/apps/)
- [Public surfaces](/apps/public-surfaces)
- [Contacts](/apps/contacts)
- [Campaigns](/campaigns) — oneshot follow-ups
- [Automations](/automations) — multi-step contact journeys after submit
- [Smart Links](/apps/smart-links)
- [Sites](/sites)
- [Shortcuts](/shortcuts)
