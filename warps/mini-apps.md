# Warp Mini-Apps

Warp mini-apps are stateful, interactive experiences built from a small set of composable primitives. They work identically in the web PWA and across all social integrations (Telegram, Slack, Discord).

## Core Primitives

| Primitive | Purpose |
|-----------|---------|
| [`compute`](/warps/action-types#compute) | Run local JavaScript transforms — no backend, always `success` |
| [`state`](/warps/action-types#state) | Read/write a persistent key-value store scoped to the room |
| [`mount`](/warps/action-types#mount-unmount) | Activate a warp's message trigger in the current room |
| [`unmount`](/warps/action-types#mount-unmount) | Deactivate a mounted trigger |
| `trigger` | Declares the pattern a warp listens for when mounted |
| `when` | Conditional expression — skip an action when false |
| <span v-pre>`{{JOAI_MESSAGE_TEXT}}`</span> | The raw message that triggered execution |
| <span v-pre>`{{JOAI_SENDER_NAME}}`</span> | Display name of the sender |
| <span v-pre>`{{state.KEY}}`</span> | Values read from the state store |

## How Triggers Work

1. A `/start` warp calls `mount` with a target warp identifier.
2. The mount registry stores `(room_id → warp_id)` in the room-scoped cache.
3. On every incoming message, the system checks mounted warps for that room.
4. If the message matches the warp's `trigger.pattern` → execute the warp, skip the LLM.
5. An `unmount` action (or a win/stop condition) removes the entry.

Triggers only fire in rooms where `mount` was called — no background noise elsewhere.

## Example: Guessing Game

Two warps. Zero external services. Zero LLM calls for game logic.

### `start-guessing-game.json`

Triggered by a slash command or button. Generates a secret number, persists it, mounts the checker.

```json
{
  "protocol": "warp:3.0.0",
  "name": "start-guessing-game",
  "actions": [
    {
      "type": "compute",
      "label": "Generate secret",
      "inputs": [
        {
          "name": "secret",
          "as": "secret",
          "type": "uint64",
          "source": "hidden",
          "modifier": "transform:() => Math.floor(Math.random() * 100) + 1"
        }
      ]
    },
    {
      "type": "state",
      "op": "write",
      "store": "guessing-game",
      "data": { "secret": "{{secret}}", "active": true }
    },
    {
      "type": "mount",
      "warp": "check-guess"
    },
    {
      "type": "compute",
      "label": "Announce",
      "inputs": [],
      "messages": {
        "success": "🎮 Game on! I'm thinking of a number between 1 and 100. What's your guess?"
      }
    }
  ]
}
```

### `check-guess.json`

Auto-triggered on any numeric message while mounted. Compares the guess, congratulates on win, unmounts.

```json
{
  "protocol": "warp:3.0.0",
  "name": "check-guess",
  "trigger": { "type": "message", "pattern": "^\\d+$" },
  "actions": [
    {
      "type": "state",
      "op": "read",
      "store": "guessing-game",
      "keys": ["secret", "active"]
    },
    {
      "type": "compute",
      "label": "Evaluate guess",
      "when": "{{state.active}} === true",
      "inputs": [
        {
          "name": "correct",
          "as": "correct",
          "type": "bool",
          "source": "hidden",
          "modifier": "transform:() => parseInt('{{JOAI_MESSAGE_TEXT}}') === {{state.secret}}"
        }
      ]
    },
    {
      "type": "state",
      "op": "write",
      "store": "guessing-game",
      "data": { "active": false },
      "when": "{{correct}} === true"
    },
    {
      "type": "unmount",
      "warp": "check-guess",
      "when": "{{correct}} === true"
    },
    {
      "type": "compute",
      "label": "Win",
      "when": "{{correct}} === true",
      "inputs": [],
      "messages": {
        "success": "🎉 {{JOAI_SENDER_NAME}} got it! The number was {{state.secret}}."
      }
    },
    {
      "type": "compute",
      "label": "Miss",
      "when": "{{correct}} === false",
      "inputs": [],
      "messages": {
        "success": "❌ Nope, try again!"
      }
    }
  ]
}
```

## Other Use Cases

The same primitives compose into any stateful flow:

- **Polls** — mount a trigger that accepts `1`/`2`/`3`, write votes to state, unmount after deadline
- **Quizzes** — chain multiple `check-guess` style warps via `next`, track score in state
- **Multi-step forms** — mount after step 1, collect input across messages, submit on final step
- **Schedulers** — combine `mount` with cron-like triggers for timed follow-ups
