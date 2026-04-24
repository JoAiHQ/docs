# Messages

Messages provide feedback to the user (or AI agent) after a Warp executes. They are defined in the root-level `messages` object.

## Structure

```json
{
  "messages": {
    "success": "Transaction complete! Hash: {{TX_HASH}}",
    "error": "Something went wrong.",
    "bot": "Tell the user the transfer is done.",
    "card": "Tx {{TX_HASH}}",
    "info": "Detailed context shown in tooltips."
  }
}
```

## Reserved Keys

| Key | Description |
|-----|-------------|
| **`success`** | Displayed when the Warp completes successfully. |
| **`error`** | Displayed when execution fails or is rejected. |
| **`bot`** | **AI-Only**. A hidden message instructing an AI agent on how to proceed or what to tell the user. |
| **`card`** | Card label text used by card UI. |
| **`info`** | Optional extra context text (for places that show message tooltips/details). |

## Variable Interpolation

Messages support full variable interpolation using <span v-pre>`{{variable}}`</span>. You can access:
-   **Resolved output keys** from your `output` mapping (e.g., <span v-pre>`{{TX_HASH}}`</span>).
-   To use an input in messages, map it into `output` first (e.g., `"AMOUNT": "in.amount"`).

Unknown placeholders resolve to an empty string.

## Examples

### Dynamic Success Message
```json
{
  "output": {
    "TX_HASH": "out.hash",
    "AMOUNT": "out.1"
  },
  "messages": {
    "success": "Successfully sent {{AMOUNT}} tokens. Tx: {{TX_HASH}}"
  }
}
```

### AI Agent Context (`bot`)
If an AI agent is executing the Warp, it won't "see" the UI toast message. Use the `bot` field to give it a system prompt update.

```json
{
  "messages": {
    "success": "Tokens sent!",
    "bot": "The transaction was successful. Inform the user and ask if they want to save this address."
  }
}
```

### Card Message (`card`)
Use `messages.card` when you want the Warp to render a custom card label.
Warp clients can use this to render compact info widgets/cards; for example, JoAi uses it for card widgets in the app UI.

```json
{
  "output": {
    "COUNT": "out.items.length"
  },
  "messages": {
    "card": "Items: {{COUNT}}"
  }
}
```

- If `messages.card` is missing, UI can fall back to the Warp `title`.
- `messages.card` supports localization, same as other `WarpText` fields.

#### Card Placeholders

- Use <span v-pre>`{{KEY}}`</span> placeholders in `messages.card`.
- `KEY` must exist in resolved output values (usually from your `output` mapping).
- Missing keys resolve to an empty string.

If you need input values in card text, map them into `output` first:

```json
{
  "output": {
    "AMOUNT": "in.amount",
    "TOKEN": "in.token"
  },
  "messages": {
    "card": "Send {{AMOUNT}} {{TOKEN}}"
  }
}
```

#### Showing the Chat Add-Card Prompt

To show card suggestions after executing another Warp:

1. In the source Warp, set `related` with target Warp identifier(s).
2. In each related Warp, define `messages.card`.

Without `messages.card` on the related Warp, the add-card prompt is not shown.

### Localized Messages
```json
{
  "messages": {
    "success": {
      "en": "Success!",
      "es": "¡Éxito!"
    }
  }
}
```
