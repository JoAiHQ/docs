# Integrations

Integrations connect agents to external services, extending capabilities and enabling automation.

## Available Integrations

### Communication

- **Telegram** - Send/receive messages via Telegram bots
- **Webhooks** - Real-time notifications via HTTP callbacks

### Automation

- **N8N** - Connect to N8N workflow automation platform
- **Zapier** - Integrate with Zapier (if available)

### Virtual Worlds

- **AI Nexus** - Connect agents to virtual world environments

### Custom

- **Webhooks** - Custom webhook integrations
- **API Tokens** - Use API tokens for custom integrations

## Setting Up Integrations

### General Process

1. Go to **Agent Settings > Apps** or **Integrations**
2. Browse available integrations
3. Select integration to connect
4. Follow setup instructions
5. Configure settings
6. Test connection
7. Start using

### Integration Requirements

Different integrations require:

- **API Keys** - Service API keys or tokens
- **Webhook URLs** - URLs for receiving callbacks
- **Authentication** - Login credentials or OAuth
- **Configuration** - Service-specific settings
- **Permissions** - Required permissions or scopes

## Telegram Integration

**Setup:**

1. Create Telegram bot via @BotFather:
   - Open Telegram, search @BotFather
   - Send `/newbot` command
   - Follow prompts to create bot
   - Get bot token (keep secure)

2. Connect in JoAi:
   - Go to **Agent Settings > Apps**
   - Find **Telegram** integration
   - Click **"Connect Telegram Account"** (authorize JoAi)
   - Enter bot token from BotFather
   - Click **"Connect Bot"**

**Usage:**

- Messages sent to your bot are forwarded to agent
- Agent can respond via Telegram
- Set up bot commands via BotFather `/setcommands`
- Commands trigger agent actions

## Webhooks

**Setup:**

1. Create webhook endpoint in your service:
   - HTTP endpoint accepting POST requests
   - Configure to handle webhook payloads
   - Set up authentication if needed
   - Ensure endpoint is accessible

2. Configure in JoAi:
   - Go to **Agent Settings > Apps**
   - Select **Webhooks**
   - Click **"Create Webhook"**
   - Configure:
     - URL endpoint
     - Trigger events (agent actions, messages, transactions, errors)
     - Authentication (API key, signature, basic auth)
     - Payload format
   - Copy webhook URL
   - Configure in external service

**Webhook Payload Example:**

```json
{
  "event": "agent_action",
  "timestamp": "2024-01-01T12:00:00Z",
  "agent": {
    "uuid": "agent-uuid",
    "name": "Agent Name"
  },
  "data": {
    "action": "payment_sent",
    "amount": "10.00",
    "recipient": "0x..."
  }
}
```

**Best Practices:**

- Use HTTPS for security
- Verify webhook signatures
- Handle errors gracefully
- Implement idempotency (handle duplicates)
- Log webhook activity

## N8N Integration

1. Set up N8N instance
2. Create webhook node in N8N
3. Get webhook URL from N8N
4. In JoAi, configure N8N integration
5. Enter webhook URL
6. Set up authentication
7. Test workflow connection

## Managing Integrations

- **View Connected** - See all active integrations and status
- **Update Settings** - Modify configuration
- **Test Connection** - Verify integration works
- **View Logs** - Check activity
- **Disconnect** - Remove integration

**Security:**

- API keys stored securely
- Grant only necessary permissions
- Rotate API keys periodically
- Monitor for unauthorized access
- Disconnect unused integrations
