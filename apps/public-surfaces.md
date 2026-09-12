# Public surfaces

JoAi hosts customer-facing apps on dedicated domains. These are separate from the main JoAi dashboard.

## Hosts (production)

| Surface | Host | Typical path |
| --- | --- | --- |
| **Store** | `store.joai.ai` | `/{locale}/{team}` |
| **Kiosk** | `store.joai.ai` | `/{locale}/{team}/kiosk` |
| **Booking** | `store.joai.ai` | `/{locale}/{team}/book` |
| **Booking embed** | `store.joai.ai` | `/{locale}/{team}/book/embed` |
| **Booking + service** | `store.joai.ai` | `/{locale}/{team}/book/{serviceSlug}` |
| **Orders portal** | `store.joai.ai` | `/{locale}/{team}/…` portal links |
| **Coupons / events / services** | `store.joai.ai` | storefront sections when enabled |
| **Wallet pass** | `store.joai.ai` | `/{locale}/pass/{contact}` |
| **Agent / blueprint / skill / flow** | `store.joai.ai` | `/{locale}/agent/{uuid}`, `/blueprint/{slug}`, `/skill/…`, `/flow/{slug}` |
| **Forms** | `forms.joai.ai` | `/{locale}/{formId}` |
| **Form embed** | `forms.joai.ai` | `/{locale}/{formId}/embed` |
| **Form results** | `forms.joai.ai` | `/{locale}/{formId}/results` (+ `/embed`) |
| **Sites** | `sites.joai.ai` | `/{teamSlug}/{brandSlug}` |

Always include the **locale** segment on store / forms / pass URLs (e.g. `en`).

Devnet / testnet / local use matching environment hosts.

### Examples

```
https://store.joai.ai/en/my-shop
https://store.joai.ai/en/my-shop/kiosk?table=3&lid=…
https://store.joai.ai/en/my-shop/book
https://store.joai.ai/en/my-shop/book/embed
https://store.joai.ai/en/my-shop/book/haircut
https://store.joai.ai/en/pass/{contactId}
https://store.joai.ai/en/blueprint/{slug}
https://forms.joai.ai/en/{formId}
https://sites.joai.ai/my-shop/appointment
```

### Loyalty pass behavior

Pass pages show points, tier, next reward, member QR, and **Add to Apple Wallet / Google Wallet** when generation succeeds — [Contacts](/apps/contacts).

### Customer portal

Portal links (`create_portal_session`) let buyers **pay**, manage **addresses**, request **returns**, and control subscription **skip / pause / resume delivery**. See [Shop](/apps/shop).

## Which native app unlocks what

| Surface | Install |
| --- | --- |
| Store, kiosk, checkout | [Shop](/apps/shop) |
| Booking page | [Appointments](/apps/appointments) |
| Forms URLs | [Forms](/apps/forms) |
| Brand sites | [Sites](/sites) |
| News / updates on store | [News](/apps/news) |
| Smart link short URLs | [Smart Links](/apps/smart-links) |
| Loyalty / passes | [Contacts](/apps/contacts) loyalty |
| Blueprints / public agent pages | [Blueprints](/blueprints) / agent monetization |

## Related

- [Shop](/apps/shop)
- [Kiosk](/kiosk)
- [Forms](/apps/forms)
- [Appointments](/apps/appointments)
- [Sites](/sites)
- [News](/apps/news)
- [Smart Links](/apps/smart-links)
- [Contacts](/apps/contacts)
- [Native apps](/apps/)
