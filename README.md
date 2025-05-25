# 🙄 Sarcastic Jokes MCP Server

A Model Context Protocol (MCP) server that provides sarcastic jokes across multiple categories. Because sometimes you need AI to point out life's ironies with the perfect amount of cynicism.

## Features

### 🎭 Available Tools

1. **get-sarcastic-joke** - Get a single sarcastic joke from a specific category
2. **get-multiple-jokes** - Get multiple jokes from a category (1-5 jokes)
3. **get-random-category-joke** - Get a random joke from any category
4. **list-categories** - List all available joke categories
5. **get-custom-sarcastic-response** - Generate a sarcastic response to any situation

### 📂 Joke Categories

- **Programming** 💻 - For when your code is "working as intended"
- **Work** 💼 - Corporate life in all its glory
- **Technology** 📱 - When tech doesn't work as advertised
- **Life** 🌍 - General life situations that deserve sarcasm

## Quick Start

### Prerequisites

- Node.js 16 or higher
- npm

### Installation

1. Clone this repository:
```bash
git clone <repository-url>
cd dadmcp
```

2. Install dependencies:
```bash
npm install
```

3. Build the project:
```bash
npm run build
```

4. Run the server:
```bash
npm start
```

### Development

```bash
# Build and run in development mode
npm run dev

# Just build TypeScript
npm run build
```

## Usage

### With Claude Desktop

1. Add the server configuration to your Claude Desktop config file:

**Windows**: `%APPDATA%\\Claude\\claude_desktop_config.json`
**macOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`

```json
{
  "mcpServers": {
    "sarcastic-jokes": {
      "command": "node",
      "args": ["/absolute/path/to/dadmcp/build/index.js"]
    }
  }
}
```

2. Restart Claude Desktop

3. Ask Claude for sarcastic jokes:
   - "Tell me a programming joke"
   - "Give me 3 work-related sarcastic jokes"
   - "What sarcastic response would you have for 'my code worked on the first try'?"

### Web Client Demo

Open `web-client/index.html` in your browser to try out the tools with a visual interface. This client uses mock responses to demonstrate how the MCP server tools would work.

## Project Structure

```
dadmcp/
├── src/
│   └── index.ts          # Main MCP server implementation
├── web-client/
│   └── index.html        # Demo web client
├── build/                # Compiled JavaScript (generated)
├── .vscode/
│   ├── mcp.json         # MCP server configuration
│   └── tasks.json       # VS Code tasks
├── .github/
│   └── copilot-instructions.md  # Copilot customizations
├── package.json
├── tsconfig.json
└── README.md
```

## MCP Server Implementation

The server is built using the official MCP TypeScript SDK and implements:

- **Server capabilities**: Tool execution
- **Transport**: Standard I/O (stdio)
- **Validation**: Zod schemas for type safety
- **Error handling**: Graceful error responses

### Tool Examples

```typescript
// Get a single joke
{
  "tool": "get-sarcastic-joke",
  "parameters": {
    "category": "programming"
  }
}

// Get multiple jokes
{
  "tool": "get-multiple-jokes", 
  "parameters": {
    "category": "work",
    "count": 3
  }
}

// Custom sarcastic response
{
  "tool": "get-custom-sarcastic-response",
  "parameters": {
    "situation": "My code worked on the first try"
  }
}
```

## Development Notes

- Built with TypeScript for type safety
- Uses the official `@modelcontextprotocol/sdk`
- Zod for runtime type validation
- Modular joke database for easy expansion
- Error handling for graceful failures

## Contributing

Feel free to add more categories or jokes! The joke database is stored in `src/index.ts` and can be easily extended.

## License

ISC License - See package.json for details
