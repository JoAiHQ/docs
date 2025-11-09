# Integrations

Integrations connect agents to external services, extending capabilities and enabling automation.

## Available Integrations

### Communication

- **Telegram** - Send/receive messages via Telegram bots
- **Webhooks** - Real-time notifications via HTTP callbacks

### Automation

- **N8N** - Verified n8n integration node for connecting JoAi agents with n8n workflows and 1000+ apps
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

JoAi has a verified n8n integration node that allows you to connect JoAi agents with n8n workflows. The integration is built and maintained by JoAi partners and verified by n8n.

**Available Actions:**

- **Send Message as User** - Send a message as a user to an agent
- **Send Message as Agent** - Send a message as an agent to a room

**Setup:**

1. Sign in to your n8n instance
2. Open the editor and click **+** in the top right to open the **Nodes panel**
3. Search for "JoAi" in the nodes panel
4. Add the JoAi node to your workflow
5. Configure authentication (verified nodes need a quick setup by an instance owner first)
6. After setup, everyone on the instance can use the JoAi node in their workflows

**Usage:**

- Use the JoAi node in n8n workflows to interact with JoAi agents
- Send messages to agents from n8n workflows
- Trigger n8n workflows from JoAi agent actions
- Build complex automation workflows connecting JoAi with 1000+ apps and services

**Resources:**

- [JoAi on n8n](https://n8n.io/integrations/joai/) - Official n8n integration page
- [JoAi on GitHub](https://github.com/JoAiHQ) - JoAi GitHub repository
- [Using verified nodes in n8n](https://docs.n8n.io/integrations/verified-nodes/) - n8n documentation

**Benefits:**

- Connect JoAi agents with over 1,000 apps and services through n8n
- Build powerful automation workflows
- Leverage n8n's built-in AI features
- Create complex workflows that integrate JoAi with your existing tech stack

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
