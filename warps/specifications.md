# Warps Specifications

A Warp is an encoded JSON object, known as a **Blueprint**, stored onchain. The transaction hash acts as the unique identifier for each Warp.

Storing the Warp on the blockchain ensures security and immutability, as its actions cannot be altered once shared.

## Reference Documentation

This section provides the complete technical specification for the Warp Protocol v3.

### Core Components
- **[Inputs](/warps/inputs)**: Input types, sources (`field`, `query`, `wallet`), positions, and modifiers.
- **[Variables](/warps/variables)**: Variable scoping, dynamic sources, and interpolation.
- **[Outputs & Transforms](/warps/outputs)**: Extracting results and using JavaScript transforms.
- **[Action Types](/warps/action-types)**: Detailed reference for all 7 action types (`transfer`, `contract`, `mcp`, etc.).
- **[Alerts](/warps/alerts)**: Configuring execution notifications and triggers.
- **[Supported Chains](/warps/chains)**: List of all 11 supported networks and specific configurations.
- **[Chaining](/warps/chaining)**: Creating multi-step workflows and passing data.
- **[Internationalization](/warps/i18n)**: Supporting multiple languages.
- **[Messages](/warps/messages)**: Feedback messages for users and AI agents.

## Warp Blueprint Structure

The root structure of a Warp JSON object:

```json
{
  "protocol": "warp:3.0.0",
  "name": "Category: Action Name",
  "title": "User-Facing Title",
  "description": "Description for the user.",
  "chain": "ethereum",
  "vars": {},
  "actions": [],
  "output": {},
  "messages": {},
  "alerts": {},
  "next": "next-warp-id"
}
```

### Required Fields

- **`protocol`**: Must be `"warp:3.0.0"`.
- **`name`**: Internal identifier, format `Category: Name` (e.g., `Token: Transfer`).
- **`title`**: Displayed to the user. Supports [localization](/warps/i18n).
- **`description`**: Provides details to the user. Supports localization.
- **`actions`**: Array of at least one action.

### Optional Fields

- **`chain`**: Default blockchain for actions.
- **`bot`**: AI-only metadata (hidden from users).
- **`preview`**: URL to a preview image.
- **`vars`**: Static or dynamic variables.
- **`output`**: Result extraction mappings.
- **`messages`**: Custom success/error messages.
- **`alerts`**: Notification triggers.
- **`next`**: Warp ID or URL for next step.
- **`related`**: Array of related Warp IDs.
- **`ui`**: Custom UI identifier.

## Internationalization (i18n)

Text fields support localization via `WarpText` objects:

```json
{
  "title": {
    "en": "Send Tokens",
    "de": "Token senden",
    "es": "Enviar Tokens"
  }
}
```

Supported fields: `title`, `description`, `label`, `patternDescription`, and all message fields.

See the [Internationalization Guide](/warps/i18n) for details.

## Chaining

Link Warps together to create workflows using the `next` field.

```json
{
  "output": {
    "RAFFLE_ID": "event.Created.1"
  },
  "next": "view-raffle?id={{RAFFLE_ID}}"
}
```

See the [Chaining Guide](/warps/chaining) for patterns and data passing.

---

For JSON schemas, visit the [GitHub repository](https://github.com/JoAiHQ/warps-specs/tree/main/schemas).
