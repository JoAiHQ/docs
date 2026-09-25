# Loyalty

Loyalty is the points, rewards, tiers, and wallet-pass native app. Install **Loyalty** under **Team settings → Apps**, then open **Loyalty** in the sidebar. Per-contact membership still appears on the contact’s **Loyalty** tab in [Contacts](/apps/contacts).

## Overview

- Enroll contacts, track **points**, **tiers**, and **rewards**
- Configure accrual (`per_visit` / `per_spend` / `per_item` / `per_category`), promotions, and expiry
- Stamp visits with the native **Loyalty scanner** (QR) on supported devices
- Members get a public **pass** with Apple / Google Wallet when generation succeeds
- Works alongside [Contacts](/apps/contacts), [Shop](/apps/shop), and [Forms](/apps/forms) signup warps

## In the app

1. Open **Loyalty**
2. Configure **Settings** (point name, accrual rules, min spend, expiry)
3. Add **Rewards**, **Tiers**, and **Promotions**
4. Enroll members (from the member list or a contact’s Loyalty tab)
5. Use the **scanner** in the page header to stamp visits on device

| Area | What you configure |
| --- | --- |
| **Members** | Enrolled contacts, points, tier, last activity |
| **Rewards** | Redeemable rewards (`discount_amount`, `discount_percent`, `free_item`, …) |
| **Tiers** | Min points, multiplier, color, benefits |
| **Promotions** | Time-bound bonus accrual rules |
| **Settings** | Point name; accrual rules; min spend; point expiry months |
| **Scanner** | Native QR stamp on supported devices |

On a contact’s **Loyalty** tab (Contacts app) you can enroll, add/redeem points, adjust balances, and view history.

## Customer pass

Members get a public pass page:

```
https://store.joai.ai/{locale}/pass/{contactId}
```

The pass shows points, tier, next reward, a QR code, and **Add to Apple Wallet / Google Wallet** when generation succeeds. See [Public surfaces](/apps/public-surfaces).

## For agents

Loyalty can be driven from warps such as `joai-loyalty-enroll`, `joai-loyalty-signup-email`, and `joai-loyalty-signup-phone` (often chained from Forms next actions). Prefer those over inventing custom enroll flows. Live schemas: `tools/list`. See [MCP](/protocols/mcp) and [SKILL.md](https://joai.ai/SKILL.md).

## Related

- [Native apps](/apps/)
- [Contacts](/apps/contacts)
- [Shop](/apps/shop)
- [Forms](/apps/forms)
- [Public surfaces](/apps/public-surfaces)
- [Teams](/teams)
