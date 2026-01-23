# Prompt Actions

Prompt actions generate text using AI/LLM models directly within Warps.

## Overview

Prompt actions enable:

- AI-powered content generation
- Dynamic text based on user input
- Intelligent responses in workflows
- Creative writing and analysis

## Basic Structure

```json
{
  "type": "prompt",
  "label": "Generate",
  "prompt": "Write a {{style}} description of {{topic}}.",
  "inputs": [
    {
      "name": "Topic",
      "as": "topic",
      "type": "string",
      "source": "field",
      "required": true
    },
    {
      "name": "Style",
      "as": "style",
      "type": "string",
      "source": "field",
      "options": ["formal", "casual", "technical"]
    }
  ]
}
```

## Properties

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `type` | string | ✅ | Must be `"prompt"` |
| `label` | WarpText | ✅ | Button text |
| `prompt` | string | ✅ | Prompt template |
| `inputs` | array | ❌ | Variables for prompt |
| `auto` | boolean | ❌ | Auto-execute |
| `next` | string | ❌ | Next Warp after execution |

## Prompt Templates

Use `{{variableName}}` to insert dynamic values:

```json
{
  "prompt": "Write a {{length}}-word summary of {{topic}} for {{audience}}."
}
```

## Examples

### Email Generator

```json
{
  "protocol": "warp:3.0.0",
  "name": "AI: Email Writer",
  "title": "Write Professional Email",
  "description": "Generate a professional email.",
  "actions": [
    {
      "type": "prompt",
      "label": "Generate Email",
      "prompt": "Write a professional email.\n\nPurpose: {{purpose}}\nRecipient: {{recipient}}\nTone: {{tone}}\nKey Points: {{keyPoints}}\n\nGenerate a complete, ready-to-send email.",
      "inputs": [
        {
          "name": "Purpose",
          "as": "purpose",
          "type": "string",
          "source": "field",
          "required": true
        },
        {
          "name": "Recipient",
          "as": "recipient",
          "type": "string",
          "source": "field",
          "required": true
        },
        {
          "name": "Tone",
          "as": "tone",
          "type": "string",
          "source": "field",
          "options": {
            "formal": "Formal & Professional",
            "friendly": "Friendly & Warm",
            "urgent": "Urgent & Direct"
          },
          "default": "formal"
        },
        {
          "name": "Key Points",
          "as": "keyPoints",
          "type": "string",
          "source": "field"
        }
      ]
    }
  ]
}
```

### Smart Contract Generator

```json
{
  "type": "prompt",
  "label": "Generate Contract",
  "prompt": "Generate a Solidity smart contract for:\n\n{{requirements}}\n\nInclude:\n- All necessary functions\n- Events for key actions\n- Access control\n- Comments explaining the code",
  "inputs": [
    {
      "name": "Requirements",
      "as": "requirements",
      "type": "string",
      "source": "field",
      "required": true,
      "description": "Describe what the contract should do"
    }
  ]
}
```

### Token Analysis

```json
{
  "protocol": "warp:3.0.0",
  "name": "AI: Token Analysis",
  "title": "Analyze Token",
  "description": "Get AI analysis of a token.",
  "output": {
    "TOKEN_NAME": "out.name",
    "TOKEN_SUPPLY": "out.totalSupply"
  },
  "actions": [
    {
      "type": "query",
      "label": "Fetch Data",
      "auto": true,
      "abi": "function getInfo() view returns (string, uint256)",
      "address": "0xToken...",
      "func": "getInfo"
    },
    {
      "type": "prompt",
      "label": "Analyze",
      "prompt": "Analyze this token:\n\nName: {{TOKEN_NAME}}\nTotal Supply: {{TOKEN_SUPPLY}}\n\nProvide:\n1. Brief overview\n2. Supply analysis\n3. Potential use cases\n4. Risk assessment"
    }
  ]
}
```

### Social Media Post

```json
{
  "type": "prompt",
  "label": "Generate Post",
  "prompt": "Write a {{platform}} post about {{topic}}.\n\nStyle: {{style}}\nMax Length: {{length}} characters\nInclude: {{hashtags}} relevant hashtags",
  "inputs": [
    {
      "name": "Platform",
      "as": "platform",
      "type": "string",
      "source": "field",
      "options": ["Twitter/X", "LinkedIn", "Instagram", "Facebook"]
    },
    {
      "name": "Topic",
      "as": "topic",
      "type": "string",
      "source": "field",
      "required": true
    },
    {
      "name": "Style",
      "as": "style",
      "type": "string",
      "source": "field",
      "options": ["professional", "casual", "humorous", "inspirational"]
    },
    {
      "name": "Max Length",
      "as": "length",
      "type": "string",
      "source": "hidden",
      "default": "280"
    },
    {
      "name": "Hashtags",
      "as": "hashtags",
      "type": "string",
      "source": "hidden",
      "default": "3-5"
    }
  ]
}
```

## Best Practices

### Be Specific

```json
// ❌ Vague
"prompt": "Write about {{topic}}"

// ✅ Specific
"prompt": "Write a 200-word blog introduction about {{topic}} for beginners. Use a friendly tone and include a hook in the first sentence."
```

### Use Structured Output

```json
"prompt": "Analyze {{data}} and respond with:\n1. Summary (2-3 sentences)\n2. Key findings (bullet points)\n3. Recommendation (1 sentence)"
```

### Provide Context

```json
"prompt": "You are a blockchain expert. Explain {{concept}} to a Web2 developer learning Web3."
```

### Use AI-Friendly Inputs

```json
{
  "name": "Purpose",
  "as": "purpose",
  "bot": "The main goal of this content. Help user articulate clearly.",
  "type": "string",
  "source": "field"
}
```

## Use Cases

- **Content Generation**: Blog posts, social media, emails
- **Code Generation**: Smart contracts, scripts, configs
- **Analysis**: Token analysis, market insights
- **Translation**: Multi-language content
- **Summarization**: Document and data summaries
- **Creative Writing**: Stories, descriptions, taglines

---

For general action documentation, see [Action Types](/warps/action-types).
