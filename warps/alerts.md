# Alerts

Alerts enable Warps to trigger notifications based on execution status. This is critical for giving users feedback on asynchronous blockchain operations.

## Structure

Alerts are defined in the root-level `alerts` object.

```json
{
  "alerts": {
    "alert_id": {
      "label": "Internal Label",
      "trigger": "on_success",
      "subject": "Notification Title",
      "body": "Notification body text",
      "action": "optional-warp-id"
    }
  }
}
```

## Properties

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `label` | WarpText | ✅ | Internal name for the alert. |
| `trigger` | string | ✅ | When to fire (see below). |
| `subject` | WarpText | ✅ | The title of the notification. |
| `body` | WarpText | ✅ | The main content. Supports variables. |
| `action` | string | ❌ | Warp ID to navigate to if clicked. |

## Triggers

| Trigger | Description |
|---------|-------------|
| `on_success` | Fires only if all actions in the Warp complete successfully. |
| `on_failure` | Fires if any action fails or the user rejects the transaction. |
| `on_complete` | Fires regardless of the outcome (success or failure). |

## Examples

### Success Notification
```json
{
  "alerts": {
    "tx_confirmed": {
      "label": "Success",
      "trigger": "on_success",
      "subject": "Payment Sent",
      "body": "Successfully sent {{amount}} to {{recipient}}."
    }
  }
}
```

### Failure Notification
```json
{
  "alerts": {
    "tx_failed": {
      "label": "Error",
      "trigger": "on_failure",
      "subject": "Transaction Failed",
      "body": "The transaction could not be completed. Please try again."
    }
  }
}
```

### Actionable Notification
Linking to another Warp (e.g., a dashboard) upon success.
```json
{
  "alerts": {
    "stake_done": {
      "label": "Staking Complete",
      "trigger": "on_success",
      "subject": "Staked Successfully",
      "body": "Your funds are now earning rewards.",
      "action": "view-staking-dashboard"
    }
  }
}
```

## Localization
Like other text fields, alerts support full localization.

```json
{
  "subject": {
    "en": "Payment Sent",
    "es": "Pago Enviado"
  }
}
```
