# API Tokens

API tokens provide secure authentication for integrating your agents with external applications and services. Generate tokens to authenticate API requests without requiring OAuth flow.

## Overview

API tokens are long-lived credentials that allow applications to interact with your agents via the JoAi API. Each token is scoped to a specific team and agent pair.

## Creating API Tokens

1. Go to **Agent Settings > Apps** or **Integrations**
2. Find **API Tokens** section
3. Click **"Create Token"** or **"Generate Token"**
4. Configure:
   - **Name** - Descriptive name for the token (e.g., "Production Integration", "N8N Bot")
   - **Token** - Automatically generated unique token (copy and save securely)
5. Click **"Create"** or **"Save"**
6. Token is created and ready to use

**Important:** Save your API token securely when created. You won't be able to view it again after closing the dialog.

## API Token Settings

Configure token properties:

- **Name** - Identify token purpose (e.g., "Production App", "Test Integration")
- **Token Value** - Automatically generated unique identifier for authentication
- **Created At** - Timestamp when token was generated
- **Status** - Active or revoked

## Managing API Tokens

- **View All Tokens** - See all active API tokens
- **Token Status** - Check if token is active
- **Creation Date** - View when token was created
- **Revoke Token** - Deactivate and remove token permanently

## Authentication

Use API tokens by including them in the `Authorization` header with the `Bearer` scheme:

```http
Authorization: Bearer <your-api-token>
```

### Example Request

```bash
curl -X GET https://cortex.joai.ai/mcp/agents/agent-uuid \
  -H "Authorization: Bearer <your-api-token>" \
  -H "Content-Type: application/json"
```

### Example with Node.js

```javascript
const response = await fetch("https://cortex.joai.ai/mcp/agents/agent-uuid", {
  method: "POST",
  headers: {
    Authorization: "Bearer <your-api-token>",
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    jsonrpc: "2.0",
    method: "tools/list",
  }),
});

const data = await response.json();
console.log(data);
```

### Example with Python

```python
import requests

headers = {
  'Authorization': 'Bearer <your-api-token>',
  'Content-Type': 'application/json'
}

response = requests.post(
  'https://cortex.joai.ai/mcp/agents/agent-uuid',
  json={
    'jsonrpc': '2.0',
    'method': 'tools/list'
  },
  headers=headers
)

print(response.json())
```

## Using with OAuth

API tokens provide a simpler alternative to OAuth for programmatic access:

| Feature          | OAuth                    | API Token            |
| ---------------- | ------------------------ | -------------------- |
| Flow             | Multi-step authorization | Single token         |
| User Interaction | Required                 | Not required         |
| Agent Selection  | Required                 | Pre-specified        |
| Scope            | Configured per flow      | Full access to agent |
| Expiration       | Can expire               | Until revoked        |
| Revocation       | Supported                | Supported            |

When using OAuth, include `agent_uuid` parameter to pre-select and lock agent selection:

```
https://api.joai.ai/oauth/authorize?agent_uuid=<agent-uuid>
```

## Endpoints

### MCP Agent Endpoint

Access your agent via MCP (Model Context Protocol):

```
https://cortex.joai.ai/mcp/agents/<agent-uuid>
```

**Headers:**

- `Authorization: Bearer <api-token>` (Required)

**Supported Methods:**

- `GET` - List tools and resources
- `POST` - Execute tools, interact with agent

### Agent Discovery

Query available agents on your team:

```
GET https://api.joai.ai/api/agents
Authorization: Bearer <api-token>
```

## MCP Operations

### List Tools

```bash
curl -X POST https://cortex.joai.ai/mcp/agents/<agent-uuid> \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "jsonrpc": "2.0",
    "id": 1,
    "method": "tools/list"
  }'
```

### Call Tool

```bash
curl -X POST https://cortex.joai.ai/mcp/agents/<agent-uuid> \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "jsonrpc": "2.0",
    "id": 1,
    "method": "tools/call",
    "params": {
      "name": "prompt_agent",
      "arguments": {
        "message": "Hello from API!"
      }
    }
  }'
```

### List Resources

```bash
curl -X POST https://cortex.joai.ai/mcp/agents/<agent-uuid> \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "jsonrpc": "2.0",
    "id": 1,
    "method": "resources/list"
  }'
```

### Read Resource

```bash
curl -X POST https://cortex.joai.ai/mcp/agents/<agent-uuid> \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "jsonrpc": "2.0",
    "id": 1,
    "method": "resources/read",
    "params": {
      "uri": "mcp://agent/<agent-uuid>/info"
    }
  }'
```

## Available Tools

### prompt_agent

Send a message to your agent and receive a response.

```json
{
  "name": "prompt_agent",
  "description": "Send a message to the agent and get a response",
  "inputSchema": {
    "type": "object",
    "properties": {
      "message": {
        "type": "string",
        "description": "The message to send to the agent"
      }
    },
    "required": ["message"]
  }
}
```

### create_memory

Create a new memory entry for the agent.

```json
{
  "name": "create_memory",
  "description": "Create a new memory for the agent",
  "inputSchema": {
    "type": "object",
    "properties": {
      "content": {
        "type": "string",
        "description": "The memory content to store"
      }
    },
    "required": ["content"]
  }
}
```

### update_memory

Update an existing memory entry.

```json
{
  "name": "update_memory",
  "description": "Update an existing memory entry",
  "inputSchema": {
    "type": "object",
    "properties": {
      "memoryId": {
        "type": "string",
        "description": "The ID of the memory to update"
      },
      "content": {
        "type": "string",
        "description": "The new memory content"
      }
    },
    "required": ["memoryId", "content"]
  }
}
```

## Available Resources

### Agent Info

General information about the agent.

```
mcp://agent/<agent-uuid>/info
```

### Agent Character

Character system prompt and personality.

```
mcp://agent/<agent-uuid>/character
```

### Agent Memories

All memories stored by the agent.

```
mcp://agent/<agent-uuid>/memories
```

## Error Handling

### Authentication Errors

**401 Unauthorized**

- Token is invalid or expired
- Verify token is correctly copied
- Check token hasn't been revoked

```json
{
  "error": "unauthorized",
  "error_description": "Invalid or expired token"
}
```

### Token Missing Context

**400 Bad Request**

- API token requires explicit agent selection
- Use OAuth flow with `agent_uuid` parameter instead
- Or ensure token has associated agent context

```json
{
  "error": "missing_context",
  "error_description": "API tokens require explicit agent selection"
}
```

### Agent Not Found

**404 Not Found**

- Agent UUID is incorrect
- Agent doesn't exist or is not accessible

```json
{
  "error": "not_found",
  "error_description": "Agent not found"
}
```

## Best Practices

### Security

- **Never commit tokens** - Don't store API tokens in version control
- **Use environment variables** - Store tokens in `.env` or secrets manager
- **Rotate tokens regularly** - Generate new tokens periodically
- **Revoke unused tokens** - Remove tokens that are no longer needed
- **Use HTTPS only** - Never send tokens over HTTP connections
- **Limit token scope** - Create separate tokens for different applications
- **Monitor usage** - Track which tokens are being used and how often

### Usage

- **Name meaningfully** - Use descriptive names for easy identification
- **Test with sandbox** - Verify tokens work before production deployment
- **Handle errors gracefully** - Implement proper error handling and retries
- **Rate limiting** - Respect API rate limits
- **Cache responses** - Reduce unnecessary API calls
- **Log requests** - Monitor API usage for debugging

### Application Design

- **Store securely** - Use secure storage for tokens (keychain, secrets manager)
- **Error recovery** - Implement re-authentication flow when tokens are revoked
- **Token rotation** - Build support for rotating tokens without downtime
- **Fallback mechanisms** - Implement OAuth as backup authentication method

## Testing API Tokens

### Quick Test

Verify your token works:

```bash
curl -X POST https://cortex.joai.ai/mcp/agents/<agent-uuid> \
  -H "Authorization: Bearer <your-token>" \
  -H "Content-Type: application/json" \
  -d '{
    "jsonrpc": "2.0",
    "id": 1,
    "method": "tools/list"
  }'
```

Success response:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "tools": [...]
  }
}
```

### Troubleshooting

**Token Not Working:**

- Verify token is complete (no extra spaces or characters)
- Check token hasn't been revoked in settings
- Ensure correct agent UUID
- Verify token is active (not expired if using OAuth)

**Authentication Failing:**

- Check `Authorization` header format (must be `Bearer <token>`)
- Verify request includes all required headers
- Check token hasn't been rotated or changed
- Review application logs for errors

**Agent Not Accessible:**

- Verify you have access to the agent
- Check agent is in the correct team
- Ensure agent is active and not deleted
- Verify API endpoint URL is correct

## Use Cases

### Automation

- **Custom Workflows** - Build automations using your agents
- **Batch Processing** - Process multiple requests programmatically
- **Scheduled Tasks** - Run agent actions on schedules
- **Event-driven** - Trigger agent actions from external systems

### Integrations

- **Custom Applications** - Build apps that interact with agents
- **Backend Services** - Connect your backend to JoAi agents
- **Monitoring & Analytics** - Track agent usage programmatically
- **Data Sync** - Synchronize agent data with external systems

### Development

- **API Testing** - Test agent tools and resources
- **Local Development** - Develop against MCP endpoints locally
- **CI/CD Pipelines** - Integrate agent actions in deployment workflows
- **SDK Development** - Build libraries around JoAi MCP API

## Rate Limiting

API tokens are subject to rate limits to ensure fair usage:

- **Requests per minute** - Limit on total requests
- **Concurrent requests** - Maximum simultaneous connections
- **Burst allowance** - Temporary increase for short periods

Exceeding limits returns `429 Too Many Requests` with `Retry-After` header.

Implement exponential backoff for retries:

```javascript
async function makeRequest(url, options, retries = 3) {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await fetch(url, options);
      if (response.status !== 429) return response;

      const retryAfter = response.headers.get("Retry-After");
      const delay = Math.min(1000 * Math.pow(2, i), retryAfter * 1000);
      await new Promise((resolve) => setTimeout(resolve, delay));
    } catch (error) {
      if (i === retries - 1) throw error;
    }
  }
}
```

## Support

For issues with API tokens:

- **Documentation** - [https://docs.joai.ai](https://docs.joai.ai)
- **Status Page** - [https://status.joai.ai](https://status.joai.ai)
- **Community** - [https://telegram.joai.ai](https://telegram.joai.ai)
- **GitHub** - [https://github.com/JoAiHQ](https://github.com/JoAiHQ)

See our [Integrations](/integrations) documentation for more integration options.
