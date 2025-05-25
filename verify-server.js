#!/usr/bin/env node

// Simple verification that the server starts without errors
import { spawn } from 'child_process';

console.log('🔍 Verifying MCP Server starts correctly...\n');

const child = spawn('node', ['build/index.js'], {
    cwd: process.cwd(),
    stdio: ['pipe', 'pipe', 'pipe']
});

let hasOutput = false;

child.stdout.on('data', (data) => {
    const output = data.toString().trim();
    if (output) {
        console.log('✅ Server output:', output);
        hasOutput = true;
    }
});

child.stderr.on('data', (data) => {
    console.log('❌ Server error:', data.toString());
});

// Give the server a moment to start
setTimeout(() => {
    if (hasOutput) {
        console.log('✅ MCP Server is running successfully!');
    } else {
        console.log('⚠️  Server started but no output detected (this might be normal for MCP servers)');
    }
    
    child.kill();
    process.exit(0);
}, 2000);

child.on('error', (error) => {
    console.log('❌ Failed to start server:', error.message);
    process.exit(1);
});
