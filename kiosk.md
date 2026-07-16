# Kiosk

The Kiosk is a touch-optimized ordering interface for your store. Customers browse products and services, add items to their cart, and place orders — all without signing in.

## Supported Tags

Product tags are used as category filters in the Kiosk. Use English lowercase tags from this list for automatic translation across all supported languages:

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

## How It Works

1. A dedicated store page at `/{locale}/{team}/kiosk` renders as a full-screen touch interface
2. Customers browse products and services, grouped by tags when present
3. Items are added to a slide-out cart with quantity controls
4. Related upsells are suggested after adding an item
5. Orders are submitted as kiosk orders (`source: kiosk`) with offline payment, no authentication required
6. A success screen confirms the order and auto-resets after 60 seconds for the next customer

## Kiosk Orders

Kiosk orders are created with:

- **Source:** `kiosk`
- **Payment:** Offline (processed outside the system)
- **Auth:** None (anonymous ordering)
- **Context:** Optional table number or custom data via URL params (e.g. `?table=3`)

Order notifications are delivered via the main JoAi app's real-time event system.
