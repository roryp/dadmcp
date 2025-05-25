#!/usr/bin/env node

// Simple test script to verify MCP server tools work
import { spawn } from 'child_process';

console.log('🧪 Testing MCP Sarcastic Jokes Server...\n');

// Test data for each tool
const testCases = [
    {
        name: 'list-categories',
        input: {
            jsonrpc: "2.0",
            id: 1,
            method: "tools/call",
            params: {
                name: "list-categories",
                arguments: {}
            }
        }
    },
    {
        name: 'get-sarcastic-joke (programming)',
        input: {
            jsonrpc: "2.0",
            id: 2,
            method: "tools/call",
            params: {
                name: "get-sarcastic-joke",
                arguments: { category: "programming" }
            }
        }
    },
    {
        name: 'get-multiple-jokes (work, 3 jokes)',
        input: {
            jsonrpc: "2.0",
            id: 3,
            method: "tools/call",
            params: {
                name: "get-multiple-jokes",
                arguments: { category: "work", count: 3 }
            }
        }
    },
    {
        name: 'get-random-category-joke',
        input: {
            jsonrpc: "2.0",
            id: 4,
            method: "tools/call",
            params: {
                name: "get-random-category-joke",
                arguments: {}
            }
        }
    },
    {
        name: 'get-custom-sarcastic-response',
        input: {
            jsonrpc: "2.0",
            id: 5,
            method: "tools/call",
            params: {
                name: "get-custom-sarcastic-response",
                arguments: { situation: "My code works perfectly in development but fails in production" }
            }
        }
    }
];

// Function to test a single case
function testTool(testCase) {
    return new Promise((resolve, reject) => {
        const child = spawn('node', ['build/index.js'], {
            cwd: process.cwd(),
            stdio: ['pipe', 'pipe', 'pipe']
        });

        let output = '';
        let errorOutput = '';

        child.stdout.on('data', (data) => {
            output += data.toString();
        });

        child.stderr.on('data', (data) => {
            errorOutput += data.toString();
        });

        child.on('close', (code) => {
            if (code === 0) {
                resolve({ testCase, output, error: null });
            } else {
                reject({ testCase, output, error: errorOutput });
            }
        });

        // Send the test input
        child.stdin.write(JSON.stringify(testCase.input) + '\n');
        child.stdin.end();
    });
}

// Run all tests
async function runTests() {
    console.log('Running MCP server tool tests...\n');
    
    for (const testCase of testCases) {
        try {
            console.log(`Testing: ${testCase.name}`);
            const result = await testTool(testCase);
            
            if (result.output.trim()) {
                try {
                    const response = JSON.parse(result.output.trim());
                    console.log(`✅ Success:`, JSON.stringify(response, null, 2));
                } catch (e) {
                    console.log(`✅ Raw output:`, result.output.trim());
                }
            } else {
                console.log(`⚠️  No output received`);
            }
        } catch (error) {
            console.log(`❌ Error:`, error.error || error.message);
        }
        console.log('─'.repeat(50));
    }
}

runTests().catch(console.error);
