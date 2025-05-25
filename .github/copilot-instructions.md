<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

# MCP Sarcastic Jokes Server

This is a Model Context Protocol (MCP) server project that provides sarcastic jokes through various tools.

## Key Features
- **Sarcastic joke generation** across multiple categories (programming, work, technology, life)
- **Multiple tools** for different interaction patterns
- **Web client** for easy testing and demonstration
- **TypeScript implementation** using the official MCP SDK

## Development Guidelines

You can find more info and examples at https://modelcontextprotocol.io/llms-full.txt

### MCP Server Structure
- The main server code is in `src/index.ts`
- Uses `@modelcontextprotocol/sdk` for the MCP implementation
- Implements tools for joke generation and retrieval
- Uses Zod for input validation

### Available Tools
1. `get-sarcastic-joke` - Get a single joke from a specific category
2. `get-multiple-jokes` - Get multiple jokes from a category (1-5)
3. `get-random-category-joke` - Get a random joke from any category
4. `list-categories` - List all available joke categories
5. `get-custom-sarcastic-response` - Generate sarcastic response to any situation

### Web Client
- Located in `web-client/index.html`
- Pure HTML/CSS/JavaScript implementation
- Uses mock responses for demonstration
- Modern, responsive design with gradient styling

### Build and Run
- `npm run build` - Compile TypeScript to JavaScript
- `npm run dev` - Build and run the server
- `npm start` - Run the compiled server

### MCP Configuration
When working with this project, remember that MCP servers typically run via stdio transport and are configured in MCP clients (like Claude Desktop) through configuration files.
