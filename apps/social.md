# Social

Schedule Instagram, X, Facebook, and LinkedIn posts from JoAi. The same queue works for all four networks.

Install **Social** under **Team settings → Apps**. It then appears in the sidebar at `/social`. Only team members with manage access can open Social, connect networks, or change posts.

## Settings vs chat

Use **Social** in the app when you want to browse the queue, connect a network, or edit a draft yourself.

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
- Save a draft with a caption and optional images (Instagram drafts can be incomplete until you schedule)
- Edit a draft, failed, or cancelled post (scheduled, publishing, and published posts stay locked)
- Schedule a time in your team timezone, or queue the post to go out on the next job run
- Publish a ready draft immediately from the queue
- Cancel a scheduled post, or retry one that failed
- Filter the queue by status or network: draft, scheduled, publishing, published, failed, cancelled

Creating or scheduling a post asks for approval in chat, unless the agent is in auto mode. That approval only queues the post.

## Instagram

Connect Instagram on the agent first: **Agent settings → Integrations → Instagram**, then **Connect Instagram**. The account used for messages is the account that publishes.

Images must be JPEG, publicly reachable, and no more than 10. One image is a single post. Two to ten images, in the order you choose, become a carousel. The caption goes on the post, not on each image.

## X

Connect X on your JoAi user first: **Agent settings → Integrations → X**, then **Connect X account**. Reconnect if you linked X before posting was available, so JoAi can get write access. The team admin who connects X is the account that publishes.

Posts can be text only, or text with up to 4 JPEG, PNG, WEBP, or GIF images. Text is limited to 280 characters.

## Facebook

Connect a Facebook Page on the agent first: **Agent settings → Integrations → Facebook**, then **Connect Facebook Page**. JoAi uses the first Page the account can manage.

Posts can be text only, or text with up to 10 JPEG, PNG, WEBP, or GIF images.

## LinkedIn

Connect LinkedIn on the agent first: **Agent settings → Integrations → LinkedIn**, then **Connect LinkedIn**. Posts publish as that LinkedIn profile.

Posts can be text only, or text with up to 9 JPEG, PNG, or GIF images. Text is limited to 3000 characters.

JoAi publishes when the scheduled time arrives. It does not ask the networks to hold the post. When LinkedIn returns a refresh token, JoAi renews access before it expires.

Connecting Instagram, Facebook, LinkedIn, or X once makes that account available to Social and to other JoAi features that need the same connection (for example metrics).

## Permissions

Social requires **team manage** access. Members without that permission cannot list, create, edit, schedule, cancel, retry, or delete posts, and they cannot see connection status.

Posts belong to the team. You cannot change another team’s posts. Only drafts, failed, and cancelled posts can be edited. Scheduled posts can be cancelled. Failed posts can be retried. Publishing posts cannot be deleted.

## For agents

Upload images with `media_upload`, then:

| Warp | What it does |
| --- | --- |
| `social-post-create` | Draft, or schedule into the queue when `scheduledAt` is set |
| `social-post-update` | Change a draft, failed, or cancelled post |
| `social-post-schedule` | Queue a draft (with a time, or for the next job run) |
| `social-post-cancel` | Stop a scheduled post |
| `social-post-retry` | Re-queue a failed post |
| `social-post-list` | List posts, optionally by status or network |
| `social-post-delete` | Delete a post that is not currently publishing |

Warps never post to the networks themselves. Scheduling and retry only enqueue JoAi's publish job.

MCP tools use the same names: `create_social_post`, `update_social_post`, `schedule_social_post`, `cancel_social_post`, `retry_social_post`, `list_social_posts`, `delete_social_post`. They are available only when Social is installed on the team.

`platform` is `instagram`, `x`, `facebook`, or `linkedin`. `scheduledAt` is an ISO time. Without a timezone, JoAi uses the team timezone.

## Related

- [Instagram](/integrations/instagram)
- [X](/integrations/x)
- [Facebook](/integrations/facebook)
- [LinkedIn](/integrations/linkedin)
- [News](/apps/news) — local deals and events, not social publishing
- [Native apps](/apps/)
