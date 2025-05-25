# 🚀 Deployment Guide - Sarcastic Jokes MCP Server

## Quick Setup for Claude Desktop

### Step 1: Verify Installation
```bash
cd C:\dev\dadmcp
npm run verify
```

You should see: "✅ MCP Server is running successfully!" or similar confirmation.

### Step 2: Configure Claude Desktop

1. **Locate your Claude Desktop config file:**
   - **Windows**: `%APPDATA%\Claude\claude_desktop_config.json`
   - **macOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`

2. **Add the server configuration:**
   
   If the file doesn't exist, create it with this content:
   ```json
   {
     "mcpServers": {
       "sarcastic-jokes": {
         "command": "node",
         "args": ["C:\\dev\\dadmcp\\build\\index.js"],
         "env": {}
       }
     }
   }
   ```

   If the file exists, add the `sarcastic-jokes` entry to the `mcpServers` object.

3. **For macOS users**, update the path:
   ```json
   {
     "mcpServers": {
       "sarcastic-jokes": {
         "command": "node",
         "args": ["/path/to/dadmcp/build/index.js"],
         "env": {}
       }
     }
   }
   ```

### Step 3: Restart Claude Desktop

Close and reopen Claude Desktop completely for the configuration to take effect.

### Step 4: Test the Server

In Claude Desktop, try these commands:

1. **"Tell me a programming joke"**
2. **"Give me 3 sarcastic work jokes"**
3. **"What categories of jokes do you have?"**
4. **"Give me a sarcastic response to: My code worked perfectly on the first try"**

## Troubleshooting

### ❌ "Server not found" or "Connection failed"

1. **Check the path**: Ensure the path in your config points to the correct location
2. **Verify Node.js**: Run `node --version` in terminal
3. **Rebuild**: Run `npm run build` to ensure the server is compiled
4. **Check permissions**: Ensure Claude Desktop can access the file path

### ❌ "Server won't start"

1. **Test locally**: Run `npm run verify` in the project directory
2. **Check dependencies**: Run `npm install` to ensure all packages are installed
3. **Verify TypeScript compilation**: Check that `build/index.js` exists

### ❌ "Tools not available in Claude"

1. **Restart Claude Desktop** completely
2. **Check configuration syntax**: Ensure your JSON is valid
3. **Verify server name**: Make sure you're using the exact server name from config

## Alternative Testing

### Web Client Demo
Open `web-client/index.html` in any browser to see a visual demo of how the tools work.

### Manual Testing
```bash
# Run the server directly
npm start

# In another terminal, test with raw JSON-RPC
echo '{"jsonrpc":"2.0","id":1,"method":"tools/call","params":{"name":"list-categories","arguments":{}}}' | node build/index.js
```

## Production Deployment

### Option 1: Global Installation
```bash
npm pack
npm install -g dadmcp-1.0.0.tgz
```
Then update your Claude config to use `dadmcp` instead of the full path.

### Option 2: Docker (Advanced)
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
CMD ["npm", "start"]
```

## Configuration Examples

### Multiple MCP Servers
```json
{
  "mcpServers": {
    "sarcastic-jokes": {
      "command": "node",
      "args": ["C:\\dev\\dadmcp\\build\\index.js"],
      "env": {}
    },
    "other-server": {
      "command": "python",
      "args": ["path/to/other/server.py"],
      "env": {}
    }
  }
}
```

### With Environment Variables
```json
{
  "mcpServers": {
    "sarcastic-jokes": {
      "command": "node",
      "args": ["C:\\dev\\dadmcp\\build\\index.js"],
      "env": {
        "NODE_ENV": "production",
        "DEBUG": "false"
      }
    }
  }
}
```

## Success Indicators

✅ **Server starts**: `npm run verify` shows success  
✅ **Claude recognizes tools**: You can ask Claude about joke categories  
✅ **Tools work**: Claude can generate jokes and sarcastic responses  
✅ **Web demo works**: `web-client/index.html` loads and functions  

## Getting Help

1. **Check server logs**: Run the server directly to see any error messages
2. **Validate configuration**: Use a JSON validator for your Claude config
3. **Test incrementally**: Start with basic tools like `list-categories`
4. **Review MCP documentation**: Visit https://modelcontextprotocol.io/

## Next Steps

- Add more joke categories to `src/index.ts`
- Customize sarcastic responses for specific situations
- Enhance the web client with more features
- Integrate with other MCP servers for more capabilities

Happy sarcastically coding! 🙄✨
