# Workspace

The Workspace is your active workbench for managing items during conversations. Add images, documents, or media to make them available for AI operations.

## Workspace Commands

### `/workspace-add <media-id>`

Adds a media item to the workspace.

**Example:**
```
/workspace-add abc123xyz
```

### `/workspace-list`

Displays all items in the workspace, grouped by type.

**Example:**
```
/workspace-list
```

**Response:**
```
Workspace items:

🖼️  Images (2):
  • my-image.png (ID: abc123xyz)
  • edited-photo.jpg (ID: def456uvw)

📄 Documents (1):
  • report.pdf (ID: ghi789rst)
```

### `/workspace-remove <item-id>`

Removes a specific item from the workspace.

**Example:**
```
/workspace-remove abc123xyz
```

### `/workspace-clear`

Removes all workspace items at once.

**Example:**
```
/workspace-clear
```

## Usage Examples

### Image Editing Workflow

1. Add image: `/workspace-add abc123xyz`
2. Edit with natural language: "Generate a sunset version of this image"
3. Clear when done: `/workspace-clear`

### Working with Multiple Items

Add multiple items for simultaneous AI operations:

```
/workspace-add image1-id
/workspace-add image2-id
/workspace-add document-id
```

## Best Practices

- Clear workspace when starting new tasks
- Check `/workspace-list` before operations
- Remove unused items to keep it clean
- Add related items together for coherent workflows

## Workspace vs. Knowledge Base

- **Workspace** - Temporary items for immediate operations during conversation
- **Knowledge Base** - Persistent documents for long-term agent reference
