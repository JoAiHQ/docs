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

Order revenue books itself. When an order becomes paid — confirmed, processing, shipped or delivered — JoAi books its invoice net and VAT to the ledger: in cash mode on the payment date, in accrual mode on the invoice date against receivables. The booking uses the order currency, tax breakdown, contact, and invoice date. Teams without the Accounting app are untouched.

Automatic bookings are tagged `automation` and are idempotent: an order keeps its first booking. A canceled or fully refunded order — the return flow marks it `returned` — is reversed automatically with a linked reversal entry, booked in the period of the cancellation. A partially refunded order stays booked at its full amount until you book a credit note for the refunded share.

You can still book a single order by hand, for example when a booking failed against a locked period.

## Rounding

VAT is taken exactly from the JoAi invoice tax breakdown, per rate and per document. When an order is converted to EUR or the converted bucket amounts do not add up to the document total by one cent, the difference is posted to the last revenue line. Debits and credits therefore always balance while the invoice VAT remains the source of truth.

## Bank accounts and statement import

Each bank account stores its IBAN, BIC, currency, provider, opening balance and the linked ledger account (for example `BA`). Imported bank lines are the source of truth for E/A bookings.

Supported statement formats:

- N26 CSV export
- CAMT.053 XML from most Austrian banks
- Generic CSV with a reusable column mapping saved on the bank account

Every import creates a bank import record with imported, skipped and duplicate counts. Re-importing the same file or overlapping date ranges is safe: rows are deduplicated by the bank's external ID, or by a stable hash plus occurrence index when the bank provides no ID.

Importing raw bank data never touches the ledger and does not need approval. Matching and booking bank lines are a later step.

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
