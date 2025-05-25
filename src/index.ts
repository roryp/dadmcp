#!/usr/bin/env node

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

// Sarcastic jokes database
const sarcasticJokes = {
  programming: [
    "Oh great, another semicolon error. Because clearly the computer can't handle your revolutionary approach to punctuation.",
    "Sure, let's just add another JavaScript framework. The world definitely needs 500 more ways to build a todo app.",
    "Debugging is like being a detective in a crime movie where you are also the murderer. How delightfully meta.",
    "Oh, you're refactoring legacy code? I'm sure the previous developer was definitely thinking about your feelings when they wrote that masterpiece.",
    "Copy-pasting from Stack Overflow? How original. I'm sure no one has ever thought of that groundbreaking development strategy.",
  ],
  work: [
    "Oh, another meeting that could have been an email? How thrilling. I live for these productivity black holes.",
    "Sure, let's pivot the strategy again. Because consistency is overrated and your team loves starting from scratch every quarter.",
    "An urgent task that's sat in someone's inbox for 3 weeks? The urgency is truly palpable.",
    "Working overtime again? I'm sure your work-life balance appreciates your dedication to corporate servitude.",
    "Another 'quick sync'? Because nothing says efficiency like interrupting everyone's flow for 30 minutes of circular discussion.",
  ],
  technology: [
    "Oh, you updated your software and now nothing works? Who could have possibly seen that coming?",
    "Your phone died right when you needed it most? Technology timing at its absolute finest.",
    "Another app asking for location permissions to show you ads? Privacy is so last century anyway.",
    "The WiFi is down but you have full bars? The universe's sense of humor is truly unmatched.",
    "Your smart home device is ignoring you? Even your own appliances are giving you the silent treatment now.",
  ],
  life: [
    "Traffic is backed up for miles because someone sneezed in the wrong lane? Peak human coordination right there.",
    "Your coffee maker broke on Monday morning? The universe clearly has your best interests at heart.",
    "The weather app was wrong again? Who needs accuracy when you can have constant disappointment?",
    "Your favorite restaurant is closed for renovation when you finally decide to go? Perfect timing, as always.",
    "The elevator is out of order and you live on the 20th floor? Today's cardio session courtesy of Murphy's Law.",
  ],
};

// Create server instance
const server = new McpServer({
  name: "sarcastic-jokes",
  version: "1.0.0",
  capabilities: {
    resources: {},
    tools: {},
  },
});

// Get a random joke from a specific category
function getRandomJoke(category: keyof typeof sarcasticJokes): string {
  const jokes = sarcasticJokes[category];
  return jokes[Math.floor(Math.random() * jokes.length)];
}

// Get multiple jokes from a category
function getMultipleJokes(category: keyof typeof sarcasticJokes, count: number): string[] {
  const jokes = sarcasticJokes[category];
  const shuffled = [...jokes].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, Math.min(count, jokes.length));
}

// Register the tools
server.tool(
  "get-sarcastic-joke",
  "Get a random sarcastic joke from a specific category",
  {
    category: z.enum(["programming", "work", "technology", "life"]).describe(
      "The category of sarcastic joke to retrieve"
    ),
  },
  async ({ category }) => {
    const joke = getRandomJoke(category);
    return {
      content: [
        {
          type: "text",
          text: `🙄 Here's your ${category} joke:\n\n"${joke}"`,
        },
      ],
    };
  }
);

server.tool(
  "get-multiple-jokes",
  "Get multiple sarcastic jokes from a specific category",
  {
    category: z.enum(["programming", "work", "technology", "life"]).describe(
      "The category of sarcastic jokes to retrieve"
    ),
    count: z.number().min(1).max(5).describe(
      "Number of jokes to retrieve (1-5)"
    ),
  },
  async ({ category, count }) => {
    const jokes = getMultipleJokes(category, count);
    const jokesList = jokes.map((joke, index) => `${index + 1}. "${joke}"`).join('\n\n');
    
    return {
      content: [
        {
          type: "text",
          text: `🙄 Here are ${count} ${category} jokes for you:\n\n${jokesList}`,
        },
      ],
    };
  }
);

server.tool(
  "get-random-category-joke",
  "Get a random sarcastic joke from any category",
  {},
  async () => {
    const categories = Object.keys(sarcasticJokes) as (keyof typeof sarcasticJokes)[];
    const randomCategory = categories[Math.floor(Math.random() * categories.length)];
    const joke = getRandomJoke(randomCategory);
    
    return {
      content: [
        {
          type: "text",
          text: `🎲 Random ${randomCategory} joke:\n\n"${joke}"`,
        },
      ],
    };
  }
);

server.tool(
  "list-categories",
  "List all available joke categories",
  {},
  async () => {
    const categories = Object.keys(sarcasticJokes);
    const categoriesText = categories.map(cat => `• ${cat}`).join('\n');
    
    return {
      content: [
        {
          type: "text",
          text: `📝 Available sarcastic joke categories:\n\n${categoriesText}\n\nUse these categories with the other tools to get specific types of jokes!`,
        },
      ],
    };
  }
);

server.tool(
  "get-custom-sarcastic-response",
  "Generate a sarcastic response to any situation or statement",
  {
    situation: z.string().describe("The situation or statement to respond to sarcastically"),
  },
  async ({ situation }) => {
    const sarcasticPrefixes = [
      "Oh, absolutely fantastic!",
      "Well, isn't that just wonderful?",
      "How utterly delightful!",
      "Oh, what a surprise!",
      "That's just marvelous!",
      "How incredibly shocking!",
      "Well, well, well...",
      "Oh, the humanity!",
    ];
    
    const sarcasticResponses = [
      `${sarcasticPrefixes[Math.floor(Math.random() * sarcasticPrefixes.length)]} ${situation}? I'm sure that's exactly what everyone was hoping for today.`,
      `"${situation}" - said no one ever who was having a good day.`,
      `Oh, "${situation}"? Because clearly the universe has nothing better to do than orchestrate this moment of pure irony.`,
      `Let me guess, "${situation}" happened at the absolute perfect time? Murphy's Law strikes again!`,
      `"${situation}" - another delightful reminder that life has such a wonderful sense of humor.`,
    ];
    
    const response = sarcasticResponses[Math.floor(Math.random() * sarcasticResponses.length)];
    
    return {
      content: [
        {
          type: "text",
          text: `🙄 ${response}`,
        },
      ],
    };
  }
);

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Sarcastic Jokes MCP Server running on stdio");
}

main().catch((error) => {
  console.error("Fatal error in main():", error);
  process.exit(1);
});
