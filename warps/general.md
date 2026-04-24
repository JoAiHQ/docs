# Warp Protocol

A Warp is a JSON object that declares an executable action — a smart contract call, a read query, an HTTP request, or an AI prompt. It can be executed by a user, an app, or an AI agent.

## Structure

Every Warp has a protocol version, a name, a target chain, and one or more actions:

```json
{
  "protocol": "warp:3.0.0",
  "name": "my-warp",
  "chain": "multiversx",
  "actions": [...]
}
```

`chain` identifies the target network. Supported values: `multiversx`, `ethereum`, `base`, `arbitrum`, `polygon`, `solana`, `sui`, and [more](/warps/chains).

## Contract Call

The example below calls a `stake` function on a contract. The user provides the amount at execution time — the input is mapped directly to the first contract argument.

```json
{
  "protocol": "warp:3.0.0",
  "name": "stake-tokens",
  "chain": "multiversx",
  "actions": [
    {
      "type": "contract",
      "label": "Stake",
      "address": "erd1qqqqqqqq...contract",
      "func": "stake",
      "gasLimit": 5000000,
      "inputs": [
        {
          "name": "Amount",
          "as": "amount",
          "type": "uint256",
          "source": "field",
          "position": "arg:1",
          "modifier": "scale:18"
        }
      ]
    }
  ]
}
```

`position: "arg:1"` maps the input to the first contract argument. `modifier: "scale:18"` converts a human-readable number (e.g. `1.5`) to its 18-decimal on-chain form.

## Query

Read contract state without creating a transaction. Results are captured in the `output` map — for display or as inputs to a subsequent warp.

```json
{
  "protocol": "warp:3.0.0",
  "name": "get-staked-balance",
  "chain": "multiversx",
  "actions": [
    {
      "type": "query",
      "label": "Check Staked Balance",
      "address": "erd1qqqqqqqq...contract",
      "func": "getStakedAmount",
      "args": ["address:erd1caller..."],
      "auto": true
    }
  ],
  "output": {
    "BALANCE": "out.1"
  }
}
```

`out.1` is the first return value from the contract view. `BALANCE` is then available for display or as a variable (`{{BALANCE}}`) in any chained warp.

## Inputs

Inputs can come from a form field (`source: "field"`), a URL query parameter (`source: "query"`), or injected directly by an AI agent. See [Inputs](/warps/inputs) for the full reference.

The same Warp format works for HTTP service calls ([`collect`](/warps/action-types#collect)) and AI/LLM text generation ([`prompt`](/warps/action-types#prompt)).

## Next Steps

- [Action Types](/warps/action-types) — all 12 action types with full specs
- [Inputs](/warps/inputs) — collecting and transforming values
- [Chaining](/warps/chaining) — multi-step workflows and output passing
- [Chains](/warps/chains) — all supported networks
- [SDKs](/warps/sdks) — TypeScript, React, PHP
- [Specifications](/warps/specifications) — complete JSON reference
