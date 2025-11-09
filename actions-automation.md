# Actions & Automation

Actions are the building blocks of agent capabilities - executable tasks, workflow steps, and service interactions.

## Action Types

### Agent Actions

- **Payments** - Send/receive payments, check balances, transaction history
- **Smart Contracts** - Execute functions, read state, deploy contracts
- **Data Operations** - Process and manipulate data
- **Service Calls** - Interact with external APIs
- **Notifications** - Send alerts and messages

### Warp Actions

- **Warp Execute** - Execute a warp workflow
- **Warp Create** - Create new warps
- **Warp Input** - Provide input to warps
- **Warp View** - View warp details
- **Warp Test** - Test warp execution

## Action Approval Modes

### Manual Mode

- Action prompts appear for review
- Approve or dismiss each action
- Review details before execution
- Full control over actions

### Auto Mode

- Actions execute automatically
- No approval needed
- Faster workflows
- Less manual oversight

Toggle auto mode in chat header.

## Creating Custom Actions

### Using Shortcuts

1. Go to **Agent Settings > Shortcuts**
2. Click **"Create Shortcut"**
3. Define:
   - Name and description
   - Action to execute
   - Input parameters
   - Execution type (Flow or Warp)
4. Save shortcut
5. Shortcut appears in chat interface

### Using Warps

1. Use warp creation tools
2. Define workflow steps
3. Configure inputs and outputs
4. Test warp execution
5. Use in shortcuts or chat

## Automated Tasks

Set up recurring actions:

1. Go to **Agent Settings > Tasks**
2. Create new task
3. Define:
   - Action to perform
   - When to execute (schedule)
   - Conditions to check
   - Success/failure handling
4. Enable task
5. Task runs automatically

## Workflow Automation

Create complex automations with:

- Multiple steps chained together
- Conditional logic for decisions
- Loops for repetitive operations
- Error handling
- Notifications

## Security Considerations

- Review important actions before approval
- Set transaction limits on payments
- Control who can trigger actions
- Track action execution in audit logs
- Monitor for errors and failures
