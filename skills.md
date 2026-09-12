# Skills

Skills are **markdown skill files** attached to an agent — scoped instructions, allowed tools, and optional media. Manage them under **Agent settings → Knowledge → Skills**.

> Product Skills ≠ [Warps](/warps/general). Warps are executable workflows. Skills teach the agent *how* to behave and which tools to prefer. You often use both.

## Overview

- Create / edit / delete skill documents in Knowledge
- Scope and allowed-tools metadata guide the agent
- MCP: `list_skills`, `create_skill`, `update_skill`, `delete_skill`
- Public skill pages may appear on the store host — [Public surfaces](/apps/public-surfaces)

## In the app

1. **Agent settings → Knowledge → Skills**
2. Create a skill (title + markdown body + options)
3. Update when procedures change
4. Delete unused skills

## For agents (MCP)

| Tool | Purpose |
| --- | --- |
| `list_skills` | List |
| `create_skill` | Create |
| `update_skill` | Update |
| `delete_skill` | Delete |

Also see platform skill packs / `SKILL.md` for external runtimes: [https://joai.ai/SKILL.md](https://joai.ai/SKILL.md).

## Related to Warps

To give an agent a new *action*, create a [Warp](/warps/general) and optionally a [Shortcut](/shortcuts). To teach policy and tool choice, add a Skill.

## Related

- [Knowledge](/knowledge)
- [Agents](/agents)
- [Warps](/warps/general)
- [MCP](/protocols/mcp)
- [Blueprints](/blueprints)
