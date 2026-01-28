# Chaining Warps

Warp chaining allows you to link multiple Warps together to create multi-step workflows. This is essential for processes like "Approve -> Swap" or "Register -> Deposit".

## The `next` Field

The `next` field determines where the user goes after the current Warp completes successfully.

### Destination Formats

1.  **Warp Alias**: Navigate to another registered Warp.
    ```json
    { "next": "my-next-step" }
    ```

2.  **Warp Hash**: Navigate to a specific immutable version.
    ```json
    { "next": "hash:d08a405f6d11b5506889bf6cd822fec2a8ef826c170fd1920ff5241f3883adb9" }
    ```

3.  **External URL**: Redirect the user to a web page.
    ```json
    { "next": "https://example.com/success" }
    ```

## Passing Data

You can pass data from the current Warp's execution to the next Warp using URL query parameters.

### 1. Capture Output
First, define the `output` in the current Warp.

```json
{
  "output": {
    "TX_HASH": "out.hash",
    "AMOUNT": "out.1"
  },
  "next": "step-two?tx={{TX_HASH}}&qty={{AMOUNT}}"
}
```

### 2. Receive Input
In the next Warp (`step-two`), read the parameters using `source: "query"`.

```json
{
  "name": "Step Two",
  "vars": {
    "PREV_TX": "query:tx",
    "quantity": "query:qty"
  },
  "description": "Previous transaction: {{PREV_TX}}"
}
```

## Conditional Chaining

You can create branching logic by defining multiple actions with `next` and using `when` conditions.

**Note:** The root-level `next` is a default. Action-level `next` overrides it.

```json
{
  "output": {
    "STATUS": "out.1"
  },
  "actions": [
    {
      "type": "query",
      "label": "Check Status"
    },
    {
      "type": "link",
      "label": "Go to Success",
      "url": "https://usewarp.to/success",
      "when": "{{STATUS}} === 'success'"
    },
    {
      "type": "link",
      "label": "Go to Retry",
      "url": "https://usewarp.to/retry",
      "when": "{{STATUS}} === 'failed'"
    }
  ]
}
```

## Chaining Patterns

### Linear Flow
A simple sequence of steps.
`Warp A` -> `Warp B` -> `Warp C`

### Registration Flow
1.  **Warp 1**: Collect user details (`collect` action).
    *   `next: "warp-2?name={{NAME}}"`
2.  **Warp 2**: Connect wallet and sign transaction (`contract` action).
    *   `vars: { "NAME": "query:name" }`

### Transaction + Confirmation
1.  **Warp 1**: Execute transaction.
2.  **Warp 2**: Display receipt (using passed TX hash).
