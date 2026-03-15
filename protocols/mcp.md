# MCP

MCP (Model Context Protocol) integration documentation.

## Overview

JoAi leverages MCP (Model Context Protocol) to enable seamless integration with popular AI applications like ChatGPT, Claude, Cursor, and other MCP-enabled interfaces. Through Dynamic MCP, JoAi provides powerful infrastructure for building native web3 AI applications.

## Dynamic MCP

JoAi's Dynamic MCP infrastructure automatically creates MCP servers for each Warp, enabling:

- **On-Demand Server Creation**: MCP servers are spun up per Warp as needed
- **OAuth Integration**: Native OAuth support for third-party authentication
- **MCP Specification Compliance**: Full adherence to MCP protocol standards
- **Seamless Integration**: Works with any MCP-enabled AI application

### How Dynamic MCP Works

Dynamic MCP automatically provisions MCP servers for each Warp on demand. When a Warp is created, JoAi's infrastructure:

1. Spins up a dedicated MCP server for that Warp
2. Configures OAuth authentication for third-party services
3. Exposes the MCP endpoint following MCP specifications
4. Enables instant connections to ChatGPT, Claude, Cursor, and other MCP-enabled platforms

This on-demand approach means each Warp gets its own isolated MCP server, enabling instant ChatGPT App connections and publishing without manual configuration.

## Using Dynamic MCP with ChatApps

Dynamic MCP is a core component of [ChatApps](/chatapps), which enables building native web3 AI applications. ChatApps automatically leverage Dynamic MCP to connect Warps to popular AI platforms.

For more information about building applications with Dynamic MCP, see the [ChatApps documentation](/chatapps).

## Credits & Usage

MCP tool calls consume **credits** from your plan's monthly allowance. Credits reset at the start of each billing cycle.

### Credit Cost per Call

| Call Type | Credits |
|-----------|---------|
| Read (query, data fetch) | 1 credit |
| Write (transfer, contract interaction) | 2 credits |

### Plan Allowances

| Plan | MCP Credits / month |
|------|---------------------|
| Free | 50 |
| Plus | 500 |
| Pro | Unlimited |
| Business | Unlimited |

### Overage (Plus Plan)

Plus plan subscribers can continue using MCP calls beyond the 500-credit monthly allowance. Overage credits are billed at **$0.01 per credit** and deducted in real time from your account balance. You can top up your balance or set a spending limit from your billing settings.

To enable overage billing, turn on **Extra Usage** in your team's billing settings.

### Free Plan

Free plan usage is capped at 50 credits per month. Once the limit is reached, MCP tool calls will return an upgrade prompt until the next billing cycle.
