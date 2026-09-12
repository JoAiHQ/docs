# Kiosk

The Kiosk is a touch-optimized ordering interface for your [Shop](/apps/shop). Customers browse products and services, add items to their cart, and place orders — without signing in.

Enable it under **Shop → Settings → Storefront** (requires the Shop native app).

## Public URL

```
https://store.joai.ai/{locale}/{teamSlug}/kiosk
```

Optional query params:

| Param | Purpose |
| --- | --- |
| `table` | Table number / label for food & drink |
| `lid` | Smart Link variation id (per-table QR tracking) |

Example with [Smart Links](/apps/smart-links) table QR:

```
https://store.joai.ai/en/{teamSlug}/kiosk?table=3&lid={variationId}
```

See [Public surfaces](/apps/public-surfaces). Devnet / testnet use the matching store host.

## Supported tags

Product tags are used as category filters. Use English lowercase tags from this list for automatic translation:

| Tag | EN | DE | FR | ES | IT | RO |
|-----|----|----|----|----|----|----|
| `appetizers` | Appetizers | Vorspeisen | Entrées | Entrantes | Antipasti | Aperitive |
| `mains` | Main Courses | Hauptgerichte | Plats principaux | Platos principales | Piatti principali | Feluri principale |
| `desserts` | Desserts | Nachspeisen | Desserts | Postres | Dolci | Deserturi |
| `drinks` | Drinks | Getränke | Boissons | Bebidas | Bevande | Băuturi |
| `sides` | Sides | Beilagen | Accompagnements | Acompañamientos | Contorni | Garnituri |
| `specials` | Specials | Spezialitäten | Spécialités | Especialidades | Specialità | Specialități |
| `kids` | Kids | Kinder | Enfants | Infantil | Bambini | Copii |
| `combos` | Combos | Kombos | Combos | Combos | Combinazioni | Combo-uri |
| `breakfast` | Breakfast | Frühstück | Petit-déjeuner | Desayuno | Colazione | Mic dejun |

Tags not in this list are displayed as-is (untranslated).

## How it works

1. Open the kiosk URL (fullscreen touch UI)
2. Browse products/services, grouped by tags when present
3. Add items to the slide-out cart; adjust quantities
4. Products with a **configurator** open an options dialog before add
5. Related upsells may appear after adding an item; cards respect stock when inventory is on
6. Submit as a kiosk order (`source: kiosk`) with offline payment, no auth
7. Success screen confirms, then auto-resets (~60s) for the next guest

## Kiosk orders

| Field | Value |
| --- | --- |
| **Source** | `kiosk` |
| **Payment** | Offline (handled outside JoAi checkout) |
| **Auth** | None (anonymous) |
| **Context** | Optional `table` / `lid` via URL |
| **Catalog** | Catalog lines only — **custom** merchant price lines are not allowed on kiosk |

Order notifications arrive in the main JoAi app in real time. Food & drink teams can also watch open table orders under **Shop → Tables**.

## Related

- [Shop](/apps/shop)
- [Smart Links](/apps/smart-links)
- [Public surfaces](/apps/public-surfaces)
- [Native apps](/apps/)
- [Contacts](/apps/contacts)
