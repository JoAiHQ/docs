# Social Media

Schedule Instagram, X, Facebook, and LinkedIn posts from JoAi. The same queue works for all four networks.

Install **Social Media** under **Team settings → Apps**. It then appears in the sidebar at `/social`. Only team members with manage access can open Social Media, connect networks, or change posts.

## Settings vs chat

Use **Social Media** in the app when you want to browse the queue, connect a network, or edit a draft yourself. From Studio, **Schedule to Social** opens the composer with an export or element variation already selected.

Use chat warps / MCP when the agent should draft or schedule for you. Approving a warp only **schedules** into JoAi’s queue — it never talks to Instagram, X, Facebook, or LinkedIn directly. The publish job posts when the time arrives.

| Where | Best for |
| --- | --- |
| `/social` settings | Connections, queue filters, editing drafts, cancel / retry / delete |
| Warps / MCP | Agent-driven create, schedule, update, list |

## How publishing works

1. You (or the agent) **draft** a post, then **schedule** it into JoAi's queue — including “as soon as possible.”
2. Approving that step in chat only **schedules**. It does not talk to Instagram, X, Facebook, or LinkedIn yet.
3. JoAi's **publish job** posts to the network when the scheduled time arrives (or right away if you queued it for now).

## What you can do

- Choose Instagram, X, Facebook, or LinkedIn
- When a network has more than one account (for example multiple Facebook Pages), pick which account to publish as
- Save a draft with a caption and optional images (Instagram drafts can be incomplete until you schedule)
- Create a draft from a **Studio export** (`exportId`) or **element variation** (`elementVariationId`) — JoAi **copies** those stills onto the post and leaves the originals alone. A variation contributes all of its images, primary image first
- Render a [Studio template](/apps/studio-templates) with content and draft a post from it in one step (`create_template_post_draft`)
- From Studio, **Schedule to Social** opens the composer with that source selected and **generates a caption** in your agent’s voice (regenerate anytime in the composer)
- Edit a draft, failed, or cancelled post (scheduled, publishing, and published posts stay locked)
- Schedule a time in your team timezone, or queue the post to go out on the next job run
- Publish a ready draft immediately from the queue
- **Share a link** on a draft, scheduled, or published post — anyone with the link sees a public preview (caption, media, format, network, and time), without signing in
- **View post** on a published post — opens the live post on Instagram, X, Facebook, or LinkedIn
- Cancel a scheduled post, or retry one that failed — failed publishes also notify the team with a one-tap retry link into `/social`
- Filter the queue by status or network: draft, scheduled, publishing, published, failed, cancelled — Instagram posts also show a feed / short / story badge
- See **likes / comments / reach / views** on published Instagram posts after JoAi syncs insights
- Pick a **suggested time** chip when scheduling Instagram (from your own post performance, with sensible defaults when history is thin)

Creating or scheduling a post asks for approval in chat, unless the agent is in auto mode. That approval only queues the post.

Pass either `media` (team media IDs), `exportId`, or `elementVariationId` — not a mix. Video-only Studio exports do not attach stills for feed posts yet.

Drafts are never published on their own: a post only goes out after it is scheduled (by a person in `/social`, or by an approved `schedule_social_post`) and the publish job runs.

## Instagram

Connect Instagram on the agent first: **Agent settings → Integrations → Instagram**, then **Connect Instagram**. The account used for messages is the account that publishes. See [Instagram](/integrations/instagram) for DMs, comment private replies, webhooks, metrics, and Meta’s cold-DM limitation.

In the composer, pick a **format** (`feed` | `short` | `story`):

| Format | Media |
| --- | --- |
| **Feed** (default) | 1–10 JPEGs (2+ become a carousel), or one MP4 video |
| **Short** | Exactly one MP4 video (published as an Instagram Reel) |
| **Story** | Exactly one JPEG image or MP4 video |

Media must be publicly reachable. Instagram posts always need media (no text-only posts). PNG and WebP images — for example rendered Studio templates — are converted to JPEG automatically when attached (transparency becomes white). Captions are limited to 2200 characters and go on feed and short posts (Stories are media-first).

After publish, JoAi pulls per-post insights (likes, comments, reach, views) on a delay and shows them in the queue. Instagram comments create or update a CRM contact (matched by Instagram profile URL, username, or a unique name), log a Social activity, and ask the agent for a **draft private reply** the team can review on the contact timeline (not auto-sent). If a thin commenter contact still duplicates someone already in CRM, merge it from the contact profile — see [Contacts](/apps/contacts#merge-contacts).

## X

Connect X on your JoAi user first: **Agent settings → Integrations → X**, then **Connect X account**. Reconnect if you linked X before posting was available, so JoAi can get write access. The team admin who connects X is the account that publishes.

Posts can be text only, or text with up to 4 JPEG, PNG, WEBP, or GIF images. Text is limited to 280 characters.

## Facebook

Connect a Facebook Page on the agent first: **Agent settings → Integrations → Facebook**, then **Connect Facebook Page**. If the account manages several Pages, pick which one to publish as when composing.

Posts can be text only, or text with up to 10 JPEG, PNG, WEBP, or GIF images.

## LinkedIn

Connect LinkedIn on the agent first: **Agent settings → Integrations → LinkedIn**, then **Connect LinkedIn**. Posts publish as that LinkedIn profile.

Posts can be text only, or text with up to 9 JPEG, PNG, or GIF images. Text is limited to 3000 characters.

JoAi publishes when the scheduled time arrives. It does not ask the networks to hold the post. When LinkedIn returns a refresh token, JoAi renews access before it expires.

Connecting Instagram, Facebook, LinkedIn, or X once makes that account available to Social Media and to other JoAi features that need the same connection (for example metrics).

## Permissions

Social Media requires **team manage** access. Members without that permission cannot list, create, edit, schedule, cancel, retry, delete, or share posts, and they cannot see connection status.

Posts belong to the team. You cannot change another team’s posts. Only drafts, failed, and cancelled posts can be edited. Scheduled posts can be cancelled. Failed posts can be retried. Publishing posts cannot be deleted or shared.

## Share links

Use **Share link** on any post that is not currently publishing. JoAi keeps a public preview URL (`/social/share?id=…`) with the caption, media, format (Instagram), network, and scheduled or published time — no sign-in required. Deleting the post or revoking the share invalidates the link; sharing again creates a new one.

From chat / MCP, `create_social_post`, `schedule_social_post`, `update_social_post`, and `list_social_posts` return that same `shareUrl` so the agent can paste the preview for review.

## For agents

Upload media with `media_upload`, **or** pass a Studio `exportId` / `elementVariationId`, then:

| Warp | What it does |
| --- | --- |
| `social-post-create` | Draft, or schedule into the queue when `scheduledAt` is set. Optional `format` for Instagram (`feed` \| `short` \| `story`). Optional `exportId` or `elementVariationId` copies stills onto the post. Returns `shareUrl` (public preview). |
| `social-post-update` | Change a draft, failed, or cancelled post (caption, format, media). Returns `shareUrl`. |
| `social-post-schedule` | Queue a draft (with a time, or for the next job run). Returns `shareUrl`. |
| `social-post-cancel` | Stop a scheduled post |
| `social-post-retry` | Re-queue a failed post |
| `social-post-list` | List posts, optionally by status or network — each item includes `shareUrl` when sharable |
| `social-post-delete` | Delete a post that is not currently publishing |

On MCP, `create_template_post_draft` (`elementId`, `values`, `platform`, `format?`, `body?`, `mode?`, `team`) renders a [Studio template](/apps/studio-templates) into a new variation (`mode` is `light` by default or `dark`) and drafts a post from it. It never schedules; the reviewer approves with `schedule_social_post`.

Warps never post to the networks themselves. Scheduling and retry only enqueue JoAi's publish job.

MCP tools use the same names: `create_social_post`, `update_social_post`, `schedule_social_post`, `cancel_social_post`, `retry_social_post`, `list_social_posts`, `delete_social_post`, plus `create_template_post_draft`. They are available only when Social Media is installed on the team.

`platform` is `instagram`, `x`, `facebook`, or `linkedin`. For Instagram, `format` is `feed` (default), `short`, or `story`. `scheduledAt` is an ISO time. Without a timezone, JoAi uses the team timezone.

Account insights (reach, views, profile views, followers) use `metrics-query` / `query_metrics` with `source=instagram` and `resource` set to the numeric Instagram account id (max 30 days). See [Instagram](/integrations/instagram).

## Related

- [Studio](/apps/studio) and [Studio templates](/apps/studio-templates)
- [Instagram](/integrations/instagram)
- [X](/integrations/x)
- [Facebook](/integrations/facebook)
- [LinkedIn](/integrations/linkedin)
- [News](/apps/news) — local deals and events, not social publishing
- [Native apps](/apps/)
