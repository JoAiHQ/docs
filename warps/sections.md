# Sections

Sections group a warp's inputs into a multi-step wizard UI. Instead of showing all inputs at once, the user advances through one section at a time — each with its own title, description, and set of inputs.

## When to Use

Use sections when a warp collects many inputs across logically distinct steps (e.g. "Document Details" → "Signer" → "Settings"). Without sections, all inputs are shown in a single flat list.

## Structure

```json
{
  "sections": [
    {
      "title": { "en": "Document Details", "de": "Dokumentendetails" },
      "description": { "en": "What document needs to be signed?", "de": "Welches Dokument muss unterzeichnet werden?" },
      "inputs": ["title", "documentHash", "documentUrl"]
    },
    {
      "title": { "en": "Signer", "de": "Unterzeichner" },
      "description": { "en": "Who needs to sign this document?", "de": "Wer muss dieses Dokument unterzeichnen?" },
      "inputs": ["signerAddress", "signerEmail", "signerName"]
    },
    {
      "title": { "en": "Settings", "de": "Einstellungen" },
      "inputs": ["deadlineHours"]
    }
  ]
}
```

### Section Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `title` | `WarpText` | Yes | Section heading displayed to the user. Supports [localization](/warps/i18n). |
| `description` | `WarpText` | No | Short subtitle shown under the section title. |
| `inputs` | `string[]` | Yes | List of input `as` values (or `name` if `as` is absent) belonging to this section. |

### How Inputs Are Matched

Each entry in `inputs` is matched against the `as` field of an action input (falling back to `name` if `as` is absent). All action inputs across all actions are eligible — sections are a presentation layer and do not change how inputs are processed.

## Behavior

- The wizard advances one section at a time. The user cannot proceed to the next section until all required inputs in the current section are filled.
- A progress indicator shows the current step (e.g. `1 / 3`).
- A **Back** button is shown on every section after the first.
- On the last section the primary action button (e.g. "Request signature") is shown.
- Inputs not listed in any section are hidden.

## Relation to Actions

Sections are purely a UI concept. The underlying action pipeline is unchanged — inputs still map to their `position` and are submitted together when the user completes the final section.

## i18n

`title` and `description` follow the standard [`WarpText`](/warps/i18n) format and support all configured locales.

```json
{
  "title": { "en": "Signer", "de": "Unterzeichner", "es": "Firmante" }
}
```
