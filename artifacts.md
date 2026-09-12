# Artifacts

Artifacts are **client deliverables** — agreements, offer docs, concepts, project updates, demos, and files you track and send to a contact. They are not public [News](/apps/news) updates and not agent knowledge [Documents](/knowledge).

Install the **Artifacts** native app from team **Apps** to manage deliverables in the dashboard (`/artifacts`). Agents can also use **warps**, **MCP tools**, and the HTTP API.

## Overview

- Register a deliverable with title, type, optional URL / password, and extra link
- Attach a **contact** (and optionally an **order** / quote)
- Status flow: **draft → ready → sent** (or **archived**)
- **Deliver** drafts a message from the artifact, lets you edit it, then sends on email / SMS / WhatsApp and marks the artifact **sent**

## Types

| Type | Typical use |
| --- | --- |
| **agreement** | Kurzvereinbarung / contract link |
| **offer** | Angebot / offer document |
| **concept** | Concept or pitch |
| **update** | Client-facing project update (not a public News update) |
| **demo** | Interactive demo URL |
| **file** | File or download link |
| **other** | Anything else |

## Statuses

| Status | Meaning |
| --- | --- |
| **draft** | Not ready to send |
| **ready** | Ready to deliver |
| **sent** | Message sent; `deliveredAt` set |
| **archived** | Soft-retired |

## Recommended flow

1. Create each deliverable (deck, demo, agreement, …) with contact and URLs, status `ready`
2. Deliver with **one or more** artifact IDs — one message covering all links/passwords → edit → approve → send
3. All included artifacts become **sent**; a delivery record stores what went out

## Ownership vs delivery

- **Artifact `contactId`** — who the deliverable belongs to (optional until send; used as the default recipient).
- **Delivery `contactId`** — who that specific message was sent to (always set on the delivery record).

One delivery can cover several artifacts. Delivery history keeps the recipient even if an artifact’s contact is later changed.

## In the app

1. Install **Artifacts** under team **Apps**
2. Open **Artifacts** in the sidebar
3. Create / edit deliverables, then **Deliver** with a message on email, SMS, or WhatsApp

## For agents (warps)

| Warp | Purpose |
| --- | --- |
| `artifact-create` | Create a deliverable |
| `artifact-list` | List / filter artifacts (optional `ids`) |
| `artifact-get` | Load one artifact |
| `artifact-update` | Edit fields or status |
| `artifact-delete` | Permanently remove a record |
| `artifact-deliver` | Interactive draft → approve → send (chat) |
| `artifact-deliver-send` | Send a finalized message (MCP / non-interactive) |

## MCP tools

| Tool | Purpose |
| --- | --- |
| `create_artifact` | Create a deliverable |
| `list_artifacts` | List / filter |
| `get_artifact` | Load one |
| `update_artifact` | Edit |
| `delete_artifact` | Delete |
| `deliver_artifacts` | Send a finalized message (`email` \| `sms` \| `whatsapp`) |

`deliver_artifacts` expects the agent to draft the final `message` (include every URL/password), then send — it does not open an interactive approve step.

See [SKILL.md](https://joai.ai/SKILL.md) and [Warps](/warps/general).

## API

- `GET|POST /v1/artifacts`
- `GET|PATCH|DELETE /v1/artifacts/{id}`
- `POST /v1/artifacts/deliver` — body: `artifactIds[]`, `message`, `integration` (`email` | `sms` | `whatsapp`), optional `subject`, `contactId`
- `GET /v1/artifacts?ids=id1,id2` — load a specific set

See also [Contacts](/apps/contacts) for messaging channels and [News](/apps/news) for public updates (different product).
