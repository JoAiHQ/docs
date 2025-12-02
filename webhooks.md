# Webhooks

Webhooks allow you to receive real-time notifications when specific events occur in your agents. Configure webhooks to integrate your agents with external services, monitoring systems, or custom applications.

## Overview

Webhooks send HTTP POST requests to your configured URL when events happen:

- **Agent actions** - When an agent performs an action
- **Agent messages** - When an agent sends a message
- **User messages** - When a user sends a message to an agent

## Creating Webhooks

1. Go to **Agent Settings > Apps** or **Integrations**
2. Find **Webhooks** section
3. Click **"Create Webhook"** or **"Add Webhook"**
4. Configure:
   - **Name** - Descriptive name for the webhook
   - **URL** - Your endpoint URL (must be HTTPS)
   - **Trigger Event** - Select which events to receive:
     - `agent.action` - Agent performs an action
     - `agent.message` - Agent sends a message
     - `user.message` - User sends a message
   - **Description** - Optional description
   - **Active** - Enable or disable webhook
5. Click **"Create"** or **"Save"**
6. Webhook is created and active

**Important:** Save the webhook secret securely when created. You'll need it to verify webhook signatures.

## Webhook Settings

Configure webhook behavior:

- **Name** - Identify the webhook (e.g., "Production Messages")
- **URL** - Your endpoint URL receiving webhooks
- **Trigger** - Event type to subscribe to
- **Active** - Enable/disable webhook
- **Custom Headers** - Add custom HTTP headers to requests
- **SSL Verification** - Verify SSL certificates (recommended: enabled)
- **Timeout** - Request timeout in seconds (default: 30, max: 300)
- **Max Retries** - Retry attempts on failure (default: 3, max: 10)

## Managing Webhooks

- **View All Webhooks** - See all configured webhooks
- **Webhook Status** - Check if webhook is active or disabled
- **Last Triggered** - View when webhook last received an event
- **Edit Webhook** - Modify webhook configuration
- **Enable/Disable** - Activate or deactivate webhooks
- **Delete Webhook** - Remove webhook permanently

## Receiving Webhooks

When an event occurs, we send a POST request to your configured URL with:

- **Headers:** `Content-Type: application/json`, `X-Webhook-Signature` (HMAC SHA-256 signature), and any custom headers you configured
- **Body:** JSON payload with event data

### Payload Structure

All webhooks include:

```json
{
  "event": "agent.message",
  "webhook": {
    "id": "webhook-id",
    "name": "My Webhook"
  },
  "timestamp": "2024-01-15T11:45:00.000000Z",
  "data": {
    // Event-specific data
  }
}
```

### Event Types

#### Agent Action (`agent.action`)

Triggered when an agent performs an action:

```json
{
  "event": "agent.action",
  "timestamp": "2024-01-15T11:45:00.000000Z",
  "data": {
    "agent": {
      "id": "agent-uuid",
      "name": "My Agent"
    },
    "room": "room-hashid",
    "action": "WARP_EXECUTE",
    "content": "{\"identifier\":\"action-id\",\"inputs\":{...}}"
  }
}
```

#### Agent Message (`agent.message`)

Triggered when an agent sends a message:

```json
{
  "event": "agent.message",
  "timestamp": "2024-01-15T11:45:00.000000Z",
  "data": {
    "agent": {
      "id": "agent-uuid",
      "name": "My Agent"
    },
    "room": "room-hashid",
    "content": "Hello, this is a message from the agent"
  }
}
```

#### User Message (`user.message`)

Triggered when a user sends a message:

```json
{
  "event": "user.message",
  "timestamp": "2024-01-15T11:45:00.000000Z",
  "data": {
    "agent": {
      "id": "agent-uuid",
      "name": "My Agent"
    },
    "user": {
      "id": "user-hashid",
      "name": "John Doe"
    },
    "room": {
      "id": "room-hashid",
      "name": "Room Name"
    },
    "content": "Hello, this is a message from the user"
  }
}
```

## Signature Verification

**Critical:** Always verify webhook signatures to ensure requests are authentic.

The signature is calculated using HMAC SHA-256 of the payload with your webhook secret. Each request includes the signature in the `X-Webhook-Signature` header.

### Example (Node.js)

```javascript
const crypto = require('crypto');

function verifyWebhookSignature(payload, signature, secret) {
  const expectedSignature = crypto
    .createHmac('sha256', secret)
    .update(JSON.stringify(payload))
    .digest('hex');

  return crypto.timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(expectedSignature)
  );
}

app.post('/webhooks', (req, res) => {
  const signature = req.headers['x-webhook-signature'];
  const secret = process.env.WEBHOOK_SECRET;

  if (!verifyWebhookSignature(req.body, signature, secret)) {
    return res.status(401).json({ error: 'Invalid signature' });
  }

  // Process webhook...
  res.status(200).json({ received: true });
});
```

## Response Requirements

Your webhook endpoint must return a 2xx status code (200, 201, 202, 204) for success and respond within the configured timeout (default: 30 seconds).

**Note:** Non-2xx responses or timeouts trigger automatic retries based on your `maxRetries` setting.

## Error Handling & Retries

If webhook delivery fails, the system automatically retries with exponential backoff. Configure max retries (default: 3, max: 10) and timeout per webhook.

**Best Practices:**

- Design handlers to handle duplicate deliveries (same event may be delivered multiple times)
- Process webhooks asynchronously when possible, return 202 Accepted immediately
- Log all webhook deliveries and monitor for failures

## Best Practices

- Always verify signatures - Never process without verification
- Use HTTPS - Always configure HTTPS URLs
- Store secrets securely - Never commit to version control
- Respond quickly - Return 2xx within timeout window
- Process asynchronously - Queue long-running operations
- Handle duplicates - Design handlers to be idempotent
- Monitor delivery - Track webhook delivery success rates
- Test thoroughly - Test webhook endpoints before production use

## Testing Webhooks

Use tools like [ngrok](https://ngrok.com/) or [localtunnel](https://localtunnel.github.io/www/) to expose your local server for testing.

## Troubleshooting

**Webhook Not Receiving Events:**
- Check webhook is Active
- Verify URL is accessible from internet
- Check last triggered timestamp
- Review endpoint logs for errors
- Verify trigger event matches event type

**Signature Verification Failing:**
- Verify secret matches webhook secret
- Check signature header name (`X-Webhook-Signature`)
- Ensure payload is JSON stringified correctly
- Verify HMAC SHA-256 algorithm used

**Timeout Errors:**
- Increase timeout setting
- Process webhooks asynchronously
- Return response immediately
- Queue processing for later

## Use Cases

- **Monitoring & Logging** - Log all agent interactions, monitor performance, track engagement
- **Automation** - Trigger external workflows, integrate with n8n/Zapier, automate responses
- **Analytics** - Track agent usage, analyze message patterns, generate reports
- **Integrations** - Connect with CRM systems, sync databases, update dashboards
