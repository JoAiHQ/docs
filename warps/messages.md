# Messages

Messages provide feedback to the user (or AI agent) after a Warp executes. They are defined in the root-level `messages` object.

## Structure

```json
{
  "messages": {
    "success": "Transaction complete! Hash: {{TX_HASH}}",
    "error": "Something went wrong.",
    "bot": "Tell the user the transfer is done."
  }
}
```

## Reserved Keys

| Key | Description |
|-----|-------------|
| **`success`** | Displayed when the Warp completes successfully. |
| **`error`** | Displayed when execution fails or is rejected. |
| **`bot`** | **AI-Only**. A hidden message instructing an AI agent on how to proceed or what to tell the user. |

## Variable Interpolation

Messages support full variable interpolation using `{{variable}}`. You can access:
-   **Outputs**: Results extracted via `output` (e.g., `{{TX_HASH}}`).
-   **Inputs**: User inputs (e.g., `{{amount}}`).
-   **Globals**: `{{USER_WALLET}}`, `{{CHAIN_EXPLORER}}`.

## Examples

### Dynamic Success Message
```json
{
  "output": {
    "TX_HASH": "out.hash",
    "AMOUNT": "out.1"
  },
  "messages": {
    "success": "Successfully sent {{AMOUNT}} tokens! View on Explorer: {{CHAIN_EXPLORER}}/tx/{{TX_HASH}}"
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
