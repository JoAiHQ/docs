# Alerts

Alerts subscribe an agent to **on-chain / warp events** (chain + contract + event key + warp). Manage them under **Agent settings → Automations → Alerts**.

> Warp JSON can also define notification-style `alerts` inside a warp definition — see [Warps alerts](/warps/alerts). This page is the **product Alerts** list (toggle / delete).

## Overview

- Each alert binds: **chain**, **contract**, **event**, **warp**, **key**
- Toggle **active** or delete from the Automations Alerts tab
- Plan-gated (`alerts` usage) — see [Billing](/billing)
- Created when warps / registry flows register event listeners (UI is primarily manage, not a free-form “balance drop” builder)

## In the app

1. Open **Agent settings → Automations**
2. Open the **Alerts** tab
3. Review registered alerts (event name + warp brand)
4. Toggle active or delete

There is no separate top-level **Agent settings → Alerts** nav item anymore — use Automations.

## What alerts are not

Docs that describe balance thresholds, SMS severity levels, or custom comparison builders do **not** match the current product model. Use [Tasks](/tasks), [Hooks](/webhooks), or warp logic for those workflows.

## Related

- [Agents](/agents)
- [Shortcuts](/shortcuts)
- [Webhooks](/webhooks)
- [Warps alerts](/warps/alerts)
- [Billing](/billing)
- [Tasks](/tasks)
