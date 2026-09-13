# Shop

Shop is the commerce native app: catalog, orders, coupons, subscriptions, payments, delivery, and your public storefront. Install it under **Team settings → Apps**, then open **Shop** in the sidebar.

## Overview

- Manage **products**, **services**, **coupons**, and **subscriptions**
- Create **orders** and **quotes** (catalog lines and **custom** lines)
- Fulfill physical orders and handle **returns**
- Connect **payments**, shipping, pickup, inventory, and **kiosk**
- Run a public store on **[store.joai.ai](/apps/public-surfaces)**
- Agents get Shop MCP tools once the app is installed

## In the app

### Dashboard tabs

| Tab | What you do |
| --- | --- |
| **Orders** | List/filter orders; earnings summary; commission agreements |
| **Products** | Product catalog (variations, media, tags, store listing) |
| **Services** | Bookable/sellable services (shared with [Appointments](/apps/appointments)) |
| **Coupons** | Discount codes (enable coupons under Settings → Storefront first) |
| **Subscriptions** | Merchant view of customer subscriptions (cancel/resume) |
| **Tables** | Food & drink teams only — open orders by table |

Use **Open store** in the header to jump to the public storefront.

### Catalog

1. Open **Shop → Products** (or **Services**)
2. Create items with prices, SKUs/variations, media, and tags
3. Toggle **list on store** / active vs hidden as needed
4. Optional editor surfaces:
   - **Variations** (e.g. color / size types)
   - **Volume pricing**
   - **Related products** (kiosk upsells)
   - **Product configurator** (warp-backed options when configured)
   - **Stock** per product/variation when inventory is on

[Kiosk](/kiosk) uses English lowercase product tags as categories — see the kiosk tag list.

### Orders and quotes

1. Open **Shop → Orders**
2. **New order** → pick a [contact](/apps/contacts), add lines, optionally send confirmation
3. Choose **Order** or **Quote**
4. Optionally price as **excl. VAT** (net)

**Line items:**

| Type | How |
| --- | --- |
| **Product / service** | From catalog |
| **Custom** | Description + quantity + unit price (no catalog row) |

Custom lines are for one-offs (repair, travel, materials). They appear on the order and invoice. Allowed only for authenticated team/agent create — **not** public checkout or [kiosk](/kiosk).

Orders tab also surfaces **earnings** and **commission agreements** where configured for the team.

### Invoices and payment QR codes

Pending invoices include payment instructions in the notes:

| Team setup | What appears |
| --- | --- |
| **Bank only** (IBAN/BIC set, `payments.online` off) | Bank transfer text + **SEPA transfer QR** (EUR) so customers can scan in their banking app |
| **Online payments** (`payments.online` on) | Pay link + **link QR** (bank text still shown if configured) |

SEPA transfer QRs are EUR-only. Paid invoices omit payment QR codes.

### Fulfillment and returns

For physical items after payment:

1. Create a fulfillment and mark **ready for pickup** or **shipped**
2. For returns: approve → receive → refund in the order actions

### Settings

**Shop → Settings**:

| Tab | Use for |
| --- | --- |
| **General** | Currency, billing address, bank details for invoices |
| **Payments** | Online payments on/off; Stripe Connect / Mollie Connect; bank details |
| **Delivery** | Shipping zones & rates; fulfillment / pickup locations |
| **Inventory** | Team-level stock tracking on/off (then set stock on products/variations) |
| **Storefront** | [Kiosk](/kiosk) on/off; enable coupons |

#### Delivery details

**Shipping zones**

- Countries + optional postal-code rules
- Active flag and sort position

**Rates** (per zone)

- Price, free-shipping threshold, min/max order, weight limits, ETA days, active / position

**Fulfillment locations**

- Pickup / ship-from address and customer-facing instructions

Per-product **list on store** controls catalog visibility — there is no single global “hide store” switch on Storefront beyond kiosk/coupons.

Connect a payment account under **Payments** before online pay works. You can disconnect and reconnect accounts from the same place.

## Public surfaces

| Surface | Where |
| --- | --- |
| Store | `https://store.joai.ai/{locale}/{team}` |
| Kiosk | `https://store.joai.ai/{locale}/{team}/kiosk` |
| Booking (if Appointments) | store book URL / [Sites](/sites) |
| Order / subscription portal | Pay; request returns (qty/reason); subscription **skip / pause / resume delivery** via portal (`create_portal_session`) |

Full host map: [Public surfaces](/apps/public-surfaces).

## For agents (MCP)

Requires **Shop** installed. **Team** tools are for merchants; **customer** tools are for buyer flows (different MCP audience).

### Team (admin)

| Tool | Purpose |
| --- | --- |
| `create_product` / `update_product` / `delete_product` | Products (no team `list_products`) |
| `create_product_variation` / `update_product_variation` | Variations |
| `create_service` / `update_service` / `delete_service` / `list_services` | Services (also with Appointments) |
| `create_order` | Order or quote — catalog and/or **custom** lines |
| `list_orders` / `delete_order` | Orders (no team `get_order`) |
| `create_coupon` / `update_coupon` / `delete_coupon` / `list_coupons` | Coupons |
| `create_fulfillment` / `update_fulfillment` / `list_fulfillments` | Fulfillment |
| `list_returns` / `update_return` | Returns (merchant updates) |

Shipping zones / fulfillment locations are configured in the UI (no dedicated MCP tools today).

**Custom line** (`unitPrice` = cents):

```json
{
  "items": [
    {
      "type": "custom",
      "name": "On-site repair",
      "quantity": 1,
      "unitPrice": 8500
    }
  ]
}
```

### Customer

| Tool | Purpose |
| --- | --- |
| `list_products` | Browse catalog |
| `place_checkout_order` / `create_checkout_snapshot` / `quote_checkout_shipping_rates` | Checkout |
| `list_checkout_fulfillment_locations` | Pickup / location options |
| `pay_order` / `get_order` | Pay and inspect |
| `create_return` | Start a return |
| `list_subscriptions` / `show_subscription` / `cancel_subscription` / `resume_subscription` | Subscriptions |
| `list_addresses` / `store_address` | Addresses |
| `create_portal_session` | Customer portal (including subscription delivery management) |

Live schemas: `tools/list`. See [MCP](/protocols/mcp) and [SKILL.md](https://joai.ai/SKILL.md).

## Tips

- Install Shop before expecting commerce MCP tools
- Use custom lines for one-offs; catalog for repeatable sellables
- Prefer [contact find-or-create](/apps/contacts) — never duplicate buyers
- Pair Smart Links table QR with kiosk (`?table=` / `lid=`) — see [Smart Links](/apps/smart-links)

## Related

- [Native apps](/apps/)
- [Public surfaces](/apps/public-surfaces)
- [Kiosk](/kiosk)
- [Contacts](/apps/contacts)
- [Appointments](/apps/appointments)
- [Campaigns](/campaigns)
- [Smart Links](/apps/smart-links)
