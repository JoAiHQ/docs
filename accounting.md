# Accounting

JoAi bookkeeping is a per-team double-entry journal. It is built to replace ProSaldo step by step, starting with revenue bookings from JoAi orders. Install the **Accounting** app under **Settings → Apps & integrations**. The page, API endpoints, and agent tools are only available while the app is installed on the team.

## Double-entry journal

Every booking is a journal entry with debit and credit lines. The sum of debits always equals the sum of credits. Final entries are immutable: they cannot be edited or deleted. To correct a booking, create a reversal entry; the reversal swaps every debit and credit and links back to the original.

VAT is stored on its own journal line, so one document can carry multiple tax rates.

## Cash vs accrual

Set the team setting `bookkeeping.method`:

- `cash` (default) — revenue is booked when payment is received. The invoice is the receipt; the booking date is the payment date.
- `accrual` — the invoice is booked to receivables on the invoice date. Payment clears the receivable later.

## Order revenue

Book a JoAi order from its invoice net and VAT amounts. The booking uses the order currency, tax breakdown, contact, and invoice date. In cash mode it is dated on payment; in accrual mode on the invoice date. Rebooking the same order is idempotent.

## Rounding

VAT is taken exactly from the JoAi invoice tax breakdown, per rate and per document. When an order is converted to EUR or the converted bucket amounts do not add up to the document total by one cent, the difference is posted to the last revenue line. Debits and credits therefore always balance while the invoice VAT remains the source of truth.

## VAT summary

The VAT summary aggregates final bookings by tax code into Austrian UVA fields, including total turnover (`000`), 20% (`022`), input VAT (`060`), and reverse charge (`057`/`066`).

## Period locks

Lock a month or quarter to prevent new entries or reversals. A locked period rejects every booking whose booking date falls inside it.

## Agent tools

Accounting tools are available to agents only when the Accounting app is installed on the team.

Read tools:

- `list_ledger_accounts`
- `list_tax_codes`
- `list_ledger_entries`
- `get_ledger_entry`
- `get_vat_summary`

Write actions run through approval-backed warps:

- `create_ledger_entry`
- `create_ledger_revenue_entry_for_order`
- `reverse_ledger_entry`
- `lock_ledger_period`

Review the line preview before approving a booking. After approval the entry is final.

## Related

- [Native apps](/apps/)
- [Billing & plans](/billing)
- [Shop](/apps/shop)
- [MCP](/protocols/mcp)
