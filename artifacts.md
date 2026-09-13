# Artifacts

Artifacts are **client deliverables** — agreements, offer docs, concepts, project updates, demos, and files you track and send to a contact. They are not public [News](/apps/news) updates and not agent knowledge [Documents](/knowledge).

Install the **Artifacts** native app from team **Apps** to manage deliverables in the dashboard (`/artifacts`). Agents can also use **warps**, **MCP tools**, and the HTTP API.

## Overview

- Register a deliverable with title, type, optional URL / password, uploaded files, and extra link
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

1. Create each deliverable (deck, demo, agreement, …) with contact, files and/or URLs, status `ready`
2. Deliver with **one or more** artifact IDs and **one or more** recipients — one message covering all links/passwords → edit → approve → send
3. All included artifacts become **sent**; one delivery record is stored per recipient

Artifacts can contain an ordered document made of generic blocks (`heading`, `richText`, `metrics`, `table`, `callout`, `actions`, `media`, and `divider`). The envelope remains the same for every artifact; blocks make long-form reports, agreements, and proposals possible without special artifact types.

When an artifact with blocks is delivered, JoAi appends its document to the delivery message automatically. Email receives a safe, structured HTML version; SMS and WhatsApp receive the equivalent readable plaintext. The message you write remains the introduction, so do not repeat the artifact contents manually.

For a client report, query the source metrics first, use the reporting skill to keep facts and recommendations separate, then create a normal **update** artifact with structured blocks. Artifacts remain generic; reporting does not introduce a separate artifact type.

## Ownership vs delivery

- **Artifact `contactId`** — who the deliverable belongs to (optional until send; used as a default recipient).
- **Delivery `contactId`** — who that specific message was sent to (always set on the delivery record).

One delivery can cover several artifacts. You can also send the same package to **multiple contacts** — each recipient gets the same message and a separate delivery record. When several recipients are chosen, artifact ownership contacts are left unchanged. Delivery history keeps the recipient even if an artifact’s contact is later changed.

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
- `POST /v1/artifacts/deliver` — body: `artifactIds[]`, `message`, `integration` (`email` | `sms` | `whatsapp`), optional `subject`, `contactIds[]` (one recipient = `[id]`)
- `GET /v1/artifacts?ids=id1,id2` — load a specific set

See also [Contacts](/apps/contacts) for messaging channels and [News](/apps/news) for public updates (different product).
