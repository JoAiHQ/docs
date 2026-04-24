# Prompt Actions

The `prompt` action type generates text using AI/LLM models directly within the Warp interface. This is ideal for content generation, summarization, or creative writing tasks.

## Structure

```json
{
  "type": "prompt",
  "label": "Generate",
  "prompt": "Write a story about {{topic}}.",
  "inputs": [
    {
      "name": "Topic",
      "as": "topic",
      "type": "string",
      "source": "field"
    }
  ]
}
```

## Properties

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `type` | string | ✅ | Must be `"prompt"` |
| `label` | WarpText | ✅ | Button text |
| `prompt` | string | ✅ | The prompt template string. |
| `inputs` | array | ❌ | Variables injected into the prompt. |
| `auto` | boolean | ❌ | Auto-execute on load (use carefully with costs). |
| `next` | string | ❌ | Next Warp after execution. |

## Prompt Templates

The `prompt` field supports standard variable interpolation using <span v-pre>`{{variableName}}`</span>. Values are injected from the `inputs` array or global variables.

**Example Template:**
```text
Write a {{length}}-word summary of {{topic}} for {{audience}}.
Key points to cover: {{keyPoints}}
```

## Examples

### Professional Email Generator
```json
{
  "type": "prompt",
  "label": "Generate Email",
  "prompt": "Write a professional email.\n\nPurpose: {{purpose}}\nRecipient: {{recipient}}\nTone: {{tone}}\n\nGenerate a complete, ready-to-send email.",
  "inputs": [
    {
      "name": "Purpose",
      "as": "purpose",
      "source": "field",
      "required": true
    },
    {
      "name": "Recipient",
      "as": "recipient",
      "source": "field"
    },
    {
      "name": "Tone",
      "as": "tone",
      "source": "field",
      "options": ["Formal", "Friendly", "Urgent"],
      "default": "Formal"
    }
  ]
}
```

### Code Generator (Solidity)
```json
{
  "type": "prompt",
  "label": "Generate Contract",
  "prompt": "Generate a Solidity smart contract for:\n\n{{requirements}}\n\nInclude:\n- All necessary functions\n- Events\n- Comments",
  "inputs": [
    {
      "name": "Requirements",
      "as": "requirements",
      "source": "field",
      "description": "Describe what the contract should do"
    }
  ]
}
```

### Token Analysis Helper
Combine a `query` action to fetch data, then a `prompt` action to analyze it.

```json
{
  "output": {
    "DATA": "out.1"
  },
  "actions": [
    {
      "type": "query",
      "label": "Fetch Data",
      "auto": true,
      "address": "0x...",
      "func": "getData"
    },
    {
      "type": "prompt",
      "label": "Analyze",
      "prompt": "Analyze this blockchain data: {{DATA}}. Is this a risky transaction?"
    }
  ]
}
```

## Best Practices

1.  **Be Specific**: The better the prompt template, the better the result.
2.  **Use Context**: Provide the AI with a role (e.g., "You are a Solidity expert").
3.  **Structured Output**: Ask for specific formats like bullet points or JSON if needed.
4.  **AI Hints**: Use the `bot` property on inputs to help AI agents understand *what* to input if an agent is executing the Warp.

```