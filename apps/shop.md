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
| **Orders** | List/filter orders; status badge + **Fulfill** for pickup/shipping (stepper dialog); status dropdown for invoices; paid / outstanding / canceled revenue summary; commission agreements |
| **Products** | Product catalog (variations, media, tags, store listing) |
| **Services** | Bookable/sellable services (shared with [Appointments](/apps/appointments)) |
| **Coupons** | Discount codes (enable under Settings → Storefront first); list shows redemption count; open a coupon to see orders that used it |
| **Subscriptions** | Merchant view of customer subscriptions (cancel/resume) |
| **Tables** | Food & drink teams only — open orders by table |

Use **Open store** in the header to jump to the public storefront.

### Catalog

1. Open **Shop → Products** (or **Services**)
2. Create items with prices, SKUs/variations, media, tags, and a **tax rate** (defaults to the team default from Settings → Tax)
3. Toggle **list on store** / active vs hidden as needed
4. Optional editor surfaces:
   - **Variations** (e.g. color / size types)
   - **Volume pricing**
   - **Related products** (kiosk upsells)
   - **Product configurator** (warp-backed options when configured)
   - **Booking details** on services (same configurator; phone-named/labeled fields are saved on the CRM contact when customers book)
   - **Stock** per product/variation when inventory is on

**Tags:** first tag is the **category** (Shop → Products filter + storefront category chips); further tags are labels (e.g. Vegan). Team product lists return `meta.categories` / `meta.hasUntagged` from those first tags.

[Kiosk](/kiosk) uses English lowercase product tags as categories — see the kiosk tag list.

### Orders and quotes

1. Open **Shop → Orders**
2. **New order** → pick a [contact](/apps/contacts), add lines, optionally send confirmation
3. Choose **Order** or **Quote**
4. Optionally price as **excl. VAT** (net)
5. For physical **Orders**, optionally set **Fulfillment**:
   - **Pickup** — choose an active location from Delivery settings
   - **Shipping** — pick a contact address and a rate from your shipping zones (quoted for that country/ZIP and line items). The contact needs an address first; configure zones under Shop → Settings → Delivery

The customer contact remains the buyer shown on the invoice. Use **Invoice recipient** during creation or editing when another contact (for example, an accounting inbox) should receive invoice and confirmation emails; leaving it at the default uses the customer contact.

**Customer emails:** Online checkout (card, Mollie, Stripe, …) sends the team-branded order confirmation only after payment. Offline / bank-transfer orders can confirm when placed, then send a payment-received note (with invoice) once paid. On a pending order, **Notify contact** runs `joai-order-notify` through the chosen agent (auto-approved sync execution) so the branded confirmation is sent as that agent. Agents can trigger the same warp from MCP. The same order can be notified about once per hour.

Guest pickup checkout asks for a phone number so the shop can coordinate collection. On order review, pickup checkouts let the customer pick an available **Abholzeit** from the team’s appointment calendar (same availability as `/book`). Placing the order books a real pickup appointment and embeds it on the order as `meeting` (with `scheduledAt`, timezone, status, …). That time appears on the customer confirmation email, the merchant order alert, and the delivery note. When Board (Planner) is installed, the order also creates a backlog item with notes, configurations, and the pickup deadline; fulfillment then moves that item forward only — Ready/Shipped → Review, Delivered → Done (never back from Done). After online payment, pickup and shipping orders are **confirmed**; they become **delivered** only when fulfillment or handover is completed.

Invoice and service orders without pickup/shipping stay **pending** until payment is recorded. Changing status to the closed state runs the paid path and shows as **paid** (not “delivered”). Pickup and shipping keep their fulfillment labels (“ready for pickup”, “picked up”, “delivered”).

For **pickup** (Abholung) and **shipping**, Shop → Orders stays calm: status badge plus a **Fulfill** action. The fulfill dialog walks payment → prepare → ready/shipped → collected/delivered with a packing checklist when marking ready or shipped, optional shipping tracking (carrier dropdown loaded from the API + tracking number; the API builds the carrier tracking link; after ship you can correct tracking in the same dialog; MCP `create_fulfillment` / `update_fulfillment` do the same from `carrierCode` + `trackingNumber`), and one primary button per step. Marking a shipping order shipped emails the customer with carrier, tracking number, and link when available. From the same dialog you can open a **delivery note** PDF (Lieferschein) via a signed URL — same visual language as invoices (logo, seller/customer blocks, footer), with order number, date, booked pickup appointment, customer contact, pickup place or shipping address, location instructions, physical line items with quantities, order notes, and handover signature lines — no prices, no customer number. Handoff (collected/delivered) only confirms — no re-checking items. Search orders by phone, order number, or name. Pickup-only shops use Neu / In Vorbereitung / Zur Abholung bereit / Abgeholt filters; mixed pickup+shipping lists use neutral Ready / Completed labels. The list shows time, phone, item quantities, and the concrete payment method (PayPal, card, bank transfer) when Mollie reports it. Mark **ready for pickup** on a paid order emails the customer (DE) with the order number, pickup place, and guest order link; the guest thank-you page shows the same pickup status through prepare → ready → picked up. Marking the fulfillment delivered sets the order to **delivered** (“picked up”). Manual status jumps that skip steps are blocked; cancel remains available from the order menu.

**Post-checkout return:** Mark a brandless [Sites](/sites) record as type `shop` (with a public URL) so guest thank-you pages can send buyers back to that storefront. One shop site per team.

**Line items:**

| Type | How |
| --- | --- |
| **Product / service** | From catalog (inherits the catalog item’s tax rate) |
| **Custom** | Description + quantity + unit price + optional tax rate (no catalog row) |

Custom lines are for one-offs (repair, travel, materials). They appear on the order and invoice. Allowed only for authenticated team/agent create — **not** public checkout or [kiosk](/kiosk). Mixed VAT (e.g. food vs drink) is handled per line via tax rates — not order-level tags.

Orders tab also surfaces **order revenue stats** (paid, outstanding, canceled/returned) and **commission agreements** where configured for the team.

### Invoices and payment QR codes

Invoices show **invoice date** and **service date** (Leistungsdatum). Service date defaults to the invoice date when unset; set it when supply/service happened on a different day.

Pending invoices include payment instructions in the notes:

| Team setup | What appears |
| --- | --- |
| **Bank only** (IBAN/BIC set, `payments.online` off or unset) | Bank transfer text + **SEPA transfer QR** (EUR) so customers can scan in their banking app |
| **Online payments** (`payments.online` on — requires payment setup) | Pay link + **link QR** to the order page (bank text still shown if configured) |

`payments.online` is opt-in: missing/unset means offline. The order number is always used as the payment reference in both the printed bank details and the SEPA QR. SEPA transfer QRs are EUR-only and skipped if the IBAN checksum is invalid. Paid invoices omit payment QR codes.

### Fulfillment and returns

For physical pickup or shipping orders after payment:

1. Open **Fulfill** on the order (list or order page)
2. Check off items in the dialog, then use the primary action (**ready for pickup** / **shipped**, then **collected** / **delivered**)
3. For returns: approve → receive → refund from the order row actions

Invoice-only orders still use the status control (including **paid** when closed).

### Settings

**Shop → Settings**:

| Tab | Use for |
| --- | --- |
| **General** | Currency, billing address, bank details for invoices, order notification emails |
| **Payments** | Online payments on/off; Stripe Connect / Mollie Connect; bank details |
| **Delivery** | Shipping zones & rates; fulfillment / pickup locations |
| **Tax** | VAT / tax rates for the catalog (default + reduced/special rates) |
| **Inventory** | Team-level stock tracking on/off (then set stock on products/variations) |
| **Storefront** | [Kiosk](/kiosk) on/off; enable coupons; one-click **reorder** from order history (signed-in customers; unavailable lines are skipped); optional **custom legal page URLs** |

**Order notification emails** (General): optional list of addresses (e.g. `bestellung@shop.example`) that receive a merchant alert when a shop order is placed — paid online orders after payment, bank/offline orders when created. Separate from customer confirmations and team seats.

#### Legal pages and checkout disclosure

Every public storefront gets built-in legal pages at `/{locale}/{team}/legal/{terms|privacy|withdrawal|imprint}`.

**Automatic profile** (no extra settings):

1. Detect merchant country from invoice country → IBAN → timezone  
2. If EU/EEA/UK (or a generic `Europe/*` timezone) → built-in **14-day withdrawal** notice  
3. Otherwise → built-in **returns** notice (no statutory withdrawal claim)

Country-specific statutes (FAGG, BGB, …) belong in **custom legal URLs** under Shop → Settings → Storefront when needed. Genuss and similar shops can host their own texts there.

Checkout shows the matching notice and requires acceptance of terms, withdrawal/returns, and privacy before a paid order.

#### Tax rates

Teams start with a default VAT rate. Add more rates (e.g. reduced food VAT) under **Shop → Settings → Tax**, then assign them on products, services, or custom order lines. Invoices and order accounting break tax down by rate. Agents manage the same rates via `tax-class-list` / `tax-class-create` / `tax-class-update` / `tax-class-delete`, and pass `taxClassId` on product/service create/update or custom order lines.

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

Shop admin UI and MCP tools require:

1. Sign-in on the correct environment (production `joai.ai`, or DevNet `devnet.joai.ai`)
2. An active team where you have **TeamManage** (Owner/Admin)
3. **Shop** installed on that team (**Team settings → Apps**)

If those are missing, the UI shows a permission lock and APIs return 403.

| Tool | Purpose |
| --- | --- |
| `create_product` / `update_product` / `delete_product` | Products; `create_product` accepts `stock` and optional `taxClassId` |
| `create_product_variation` / `update_product_variation` | Variations; both accept `stock` (units available) |
| `create_service` / `update_service` / `delete_service` / `list_services` | Services (also with Appointments); create/update accept optional `taxClassId` |
| `tax-class-list` / `tax-class-create` / `tax-class-update` / `tax-class-delete` | Team VAT rates (list first to resolve `taxClassId`) |
| `create_order` | Order or quote — catalog and/or **custom** lines; optional `invoiceContactId`; custom lines may pass `taxClassId` |
| `update_order` | Status, dates, or invoice recipient; clear `invoiceContactId` to use the customer |
| `notify_order` (`joai-order-notify`) | Send branded order confirmation to the customer contact as the executing agent (same path as Shop **Notify contact**) |
| `list_orders` / `delete_order` | List or delete orders (`list_orders` is paginated — use `page` / `perPage`, max 50, and read `meta.lastPage` for more); `list_orders` accepts `couponId` to show redemptions for a coupon |
| `create_coupon` / `update_coupon` / `delete_coupon` / `list_coupons` | Coupons (`list_coupons` includes `redemptionCount` for team members) |
| `create_fulfillment` / `update_fulfillment` / `list_fulfillments` | Fulfillment |
| `list_returns` / `update_return` | Returns (merchant updates) |

Shipping zones / fulfillment locations are configured in the UI (no dedicated MCP tools today).

Set `stock` on a variation (in cents-free units) to make it orderable — a variation with `stock` `0` or unset is treated as unavailable and the shop will not accept orders for it. `update_product` and `update_product_variation` only change the fields you pass, so a partial update never clears price, stock, visibility, or media.

**Custom line** (`unitPrice` = cents; optional `taxClassId` from `tax-class-list`):

```json
{
  "items": [
    {
      "type": "custom",
      "name": "On-site repair",
      "quantity": 1,
      "unitPrice": 8500,
      "taxClassId": "TAXCLASSHASH"
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
