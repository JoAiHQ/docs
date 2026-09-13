# GitHub

Install the JoAi GitHub App so your agent can respond to @mentions on issues and pull requests and perform GitHub actions.

## Requirements

- Permission to install GitHub Apps on the target org/repos
- An active JoAi agent

## Setup

1. Open **Agent settings → Integrations** → **GitHub**
2. Click **Install GitHub App** and complete GitHub’s install flow for the repositories you need
3. Confirm JoAi shows the app connected (name and installation ID when available)

Only one GitHub installation can be connected per agent.

## How it works

- **Inbound:** @mentions and relevant GitHub events are delivered to the agent
- **Outbound / actions:** the agent can create or update issues and PRs when those capabilities are used in chat or warps

## Limits

- One installation per agent
- Scope is limited to repos granted during GitHub App install

## Related

- [Integrations overview](/integrations/)
- [Agents](/agents)
- [Board](/apps/board)
