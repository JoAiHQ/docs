# Artifacts

Artifacts are **client deliverables** — agreements, offer docs, concepts, project updates, demos, and files you track and send to a contact. They are not public [News](/apps/news) updates and not agent knowledge [Documents](/knowledge).

Install the **Artifacts** native app from team **Apps** to manage deliverables in the dashboard (`/artifacts`). Agents can also use **warps**, **MCP tools**, and the HTTP API.

## Overview

- Register a deliverable with title, type, optional URL / password, attached **media**, and extra link
- Attach a **contact** (and optionally an **order** / quote)
- Status flow: **draft → ready → sent** (or **archived**)
- **Deliver** from the dashboard with a message you write — pick the **sending agent** (same idea as campaigns; that agent’s email/SMS/WhatsApp integration is used) — or **Generate with AI** to run the `artifact-deliver` warp in chat (draft → edit → approve → send). Structured document blocks are still appended on send when present.

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

1. Create each deliverable (deck, demo, agreement, …) with contact and URLs and/or media, status `ready`
2. Deliver with **one or more** artifact IDs — one message covering all links/passwords → edit → approve → send
3. All included artifacts become **sent**; a delivery record stores what went out

For a local PDF/image via MCP: `media_upload` → `create_artifact` with `media: ["…"]` (and optional `url`) → `deliver_artifacts`. `url` and `media` are both optional.

## Ownership vs delivery

- **Artifact `contactId`** — who the deliverable belongs to (optional until send; used as the default recipient).
- **Delivery `contactId`** — who that specific message was sent to (always set on the delivery record).

One delivery can cover several artifacts. Delivery history keeps the recipient even if an artifact’s contact is later changed.

## In the app

1. Install **Artifacts** under team **Apps**
2. Open **Artifacts** in the sidebar, or open a **Contact → Deliveries** tab to see that client’s deliverables
3. Create / edit deliverables (from the contact tab, the contact is prefilled), then **Deliver** (manual) or **Generate with AI** (opens `artifact-deliver` in chat)

## For agents (warps)

| Warp | Purpose |
| --- | --- |
| `artifact-create` | Create a deliverable |
| `artifact-list` | List / filter artifacts (optional `ids`) |
| `artifact-get` | Load one artifact |
| `artifact-update` | Edit fields or status |
| `artifact-delete` | Permanently remove a record |
| `artifact-deliver` | Draft → single approve (editable message) → send. Auto mode runs through; manual mode waits for approve |

## MCP tools

| Tool | Purpose |
| --- | --- |
| `create_artifact` | Create a deliverable (`url` and/or `media` IDs optional) |
| `list_artifacts` | List / filter |
| `get_artifact` | Load one |
| `update_artifact` | Edit (including `media`) |
| `delete_artifact` | Delete |
| `deliver_artifacts` | Dispatch `artifact-deliver`: draft message, then one approve step (editable). Auto mode sends; manual mode waits for approve |

`create_artifact` / `update_artifact`: pass `media` as team media IDs from `media_upload` (e.g. `["abc123"]`). `url` remains optional for external links.

`deliver_artifacts` is the only delivery path — same draft → approve / auto-mode model as campaigns. File links come from the drafted message (`media[].url` in the artifact JSON), not a second server-side append.

See [SKILL.md](https://joai.ai/SKILL.md) and [Warps](/warps/general).

## API

- `GET|POST /v1/artifacts`
- `GET|PATCH|DELETE /v1/artifacts/{id}`
- `POST /v1/artifacts/deliver` — body: `artifactIds[]`, `message`, `integration` (`email` | `sms` | `whatsapp`), optional `subject`, `contactIds[]`, `agentId` (agent UUID; defaults to request agent or the team’s first agent)
- `GET /v1/artifacts?ids=id1,id2` — load a specific set

See also [Contacts](/apps/contacts) for messaging channels and [News](/apps/news) for public updates (different product).
