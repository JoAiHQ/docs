# Chat and Commands

JoAi agents support natural language chat, voice conversations, and special commands. You can talk to your agent naturally, use voice mode for hands-free conversations, or type commands for quick actions. All commands start with `/` (forward slash).

## Overview

Chat commands provide quick access to common actions and workflows:

- Execute warps and flows
- Create and test warps
- Batch process operations
- Access advanced features

All commands are typed directly in the chat interface and executed immediately.

## Warp Commands

### `/flow [warp-identifier]`

Execute a flow-based warp action. Flow warps are chat-based and can be executed through natural conversation.

**Usage:**

```
/flow @transfer
/flow abc123def456...
```

**Parameters:**

- `warp-identifier` - The warp identifier (can be a name with @ prefix or a full identifier)

**Example:**

```
/flow @transfer
/flow abc123def456...
```

### `/warp [warp-identifier] [inputs...]`

Execute a warp action directly with optional inputs.

**Usage:**

```
/warp @transfer
/warp abc123def456 recipient amount
```

**Parameters:**

- `warp-identifier` - The warp identifier (can be a name with @ prefix or a full identifier)
- `inputs...` - Optional input values for the warp

**Example:**

```
/warp @transfer
/warp abc123def456 recipient amount
```

### `/warp-create [chain] [name]`

Create a new warp on a specific blockchain.

**Usage:**

```
/warp-create multiversx MyCustomWarp
```

**Parameters:**

- `chain` - The blockchain network (e.g., `multiversx`)
- `name` - The name for your new warp

**Example:**

```
/warp-create multiversx MyCustomWarp
```

### `/warp-input [warp-identifier] [inputs...]`

Provide input values for a warp that requires additional information.

**Usage:**

```
/warp-input @transfer recipient@example.com 100
```

**Parameters:**

- `warp-identifier` - The warp identifier (can be a name with @ prefix or a full identifier)
- `inputs...` - Input values for the warp

**Example:**

```
/warp-input @transfer recipient@example.com 100
```

## Local Commands (Client-Side)

These commands are processed locally in your browser and don't require agent processing.

### `/warp-test`

Test a warp with custom inputs before actual execution. Opens a testing interface where you can:

- Enter raw warp data or transaction hash
- Provide test inputs
- Validate warp structure
- Execute test run

**Usage:**

1. Type `/warp-test` in chat
2. Testing interface appears
3. Enter warp data (transaction hash or raw warp data, minimum 50 characters)
4. System validates the warp
5. Optionally provide test inputs
6. Click "Execute" to test or "Dismiss" to cancel

**Use Cases:**

- Testing custom warps before deployment
- Validating warp structure
- Debugging warp execution
- Previewing warp behavior

**Example:**

```
/warp-test
```

### `/warp-batch`

Execute a warp multiple times with different inputs in batch. Opens a batch processing wizard.

**Usage:**

1. Type `/warp-batch` in chat
2. Batch wizard opens with steps:
   - **Info**: Select or enter warp identifier
   - **Static Inputs**: Set inputs that stay the same for all batch items
   - **Dynamic Inputs**: Define inputs that vary for each batch item (CSV format or manual entry)
   - **Process**: Review batch configuration, set pause between operations (milliseconds), execute
   - **Done**: Batch completion summary

**Use Cases:**

- Processing multiple transactions
- Bulk operations
- Testing with different inputs
- Automated batch workflows

**Example:**

```
/warp-batch
```

## Command Best Practices

- Use descriptive warp identifiers
- Test warps with `/warp-test` before production use
- Use `/warp-batch` for efficient bulk operations
- Verify warp identifiers before execution
- Check command syntax before sending

## Troubleshooting Commands

**Command not recognized:**

- Ensure command starts with `/`
- Check spelling and syntax
- Verify warp identifier is correct

**Warp execution fails:**

- Validate warp structure with `/warp-test`
- Check required inputs are provided
- Verify warp is properly configured
- Review error messages for details

**Batch processing issues:**

- Verify CSV format for dynamic inputs
- Check pause duration between operations
- Ensure all required inputs are provided
- Review batch configuration before execution
