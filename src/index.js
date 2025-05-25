#!/usr/bin/env node
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
var mcp_js_1 = require("@modelcontextprotocol/sdk/server/mcp.js");
var stdio_js_1 = require("@modelcontextprotocol/sdk/server/stdio.js");
var zod_1 = require("zod");
// Sarcastic jokes database
var sarcasticJokes = {
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
var server = new mcp_js_1.McpServer({
    name: "sarcastic-jokes",
    version: "1.0.0",
    capabilities: {
        resources: {},
        tools: {},
    },
});
// Get a random joke from a specific category
function getRandomJoke(category) {
    var jokes = sarcasticJokes[category];
    return jokes[Math.floor(Math.random() * jokes.length)];
}
// Get multiple jokes from a category
function getMultipleJokes(category, count) {
    var jokes = sarcasticJokes[category];
    var shuffled = __spreadArray([], jokes, true).sort(function () { return 0.5 - Math.random(); });
    return shuffled.slice(0, Math.min(count, jokes.length));
}
// Register the tools
server.tool("get-sarcastic-joke", "Get a random sarcastic joke from a specific category", {
    category: zod_1.z.enum(["programming", "work", "technology", "life"]).describe("The category of sarcastic joke to retrieve"),
}, function (_a) { return __awaiter(void 0, [_a], void 0, function (_b) {
    var joke;
    var category = _b.category;
    return __generator(this, function (_c) {
        joke = getRandomJoke(category);
        return [2 /*return*/, {
                content: [
                    {
                        type: "text",
                        text: "\uD83D\uDE44 Here's your ".concat(category, " joke:\n\n\"").concat(joke, "\""),
                    },
                ],
            }];
    });
}); });
server.tool("get-multiple-jokes", "Get multiple sarcastic jokes from a specific category", {
    category: zod_1.z.enum(["programming", "work", "technology", "life"]).describe("The category of sarcastic jokes to retrieve"),
    count: zod_1.z.number().min(1).max(5).describe("Number of jokes to retrieve (1-5)"),
}, function (_a) { return __awaiter(void 0, [_a], void 0, function (_b) {
    var jokes, jokesList;
    var category = _b.category, count = _b.count;
    return __generator(this, function (_c) {
        jokes = getMultipleJokes(category, count);
        jokesList = jokes.map(function (joke, index) { return "".concat(index + 1, ". \"").concat(joke, "\""); }).join('\n\n');
        return [2 /*return*/, {
                content: [
                    {
                        type: "text",
                        text: "\uD83D\uDE44 Here are ".concat(count, " ").concat(category, " jokes for you:\n\n").concat(jokesList),
                    },
                ],
            }];
    });
}); });
server.tool("get-random-category-joke", "Get a random sarcastic joke from any category", {}, function () { return __awaiter(void 0, void 0, void 0, function () {
    var categories, randomCategory, joke;
    return __generator(this, function (_a) {
        categories = Object.keys(sarcasticJokes);
        randomCategory = categories[Math.floor(Math.random() * categories.length)];
        joke = getRandomJoke(randomCategory);
        return [2 /*return*/, {
                content: [
                    {
                        type: "text",
                        text: "\uD83C\uDFB2 Random ".concat(randomCategory, " joke:\n\n\"").concat(joke, "\""),
                    },
                ],
            }];
    });
}); });
server.tool("list-categories", "List all available joke categories", {}, function () { return __awaiter(void 0, void 0, void 0, function () {
    var categories, categoriesText;
    return __generator(this, function (_a) {
        categories = Object.keys(sarcasticJokes);
        categoriesText = categories.map(function (cat) { return "\u2022 ".concat(cat); }).join('\n');
        return [2 /*return*/, {
                content: [
                    {
                        type: "text",
                        text: "\uD83D\uDCDD Available sarcastic joke categories:\n\n".concat(categoriesText, "\n\nUse these categories with the other tools to get specific types of jokes!"),
                    },
                ],
            }];
    });
}); });
server.tool("get-custom-sarcastic-response", "Generate a sarcastic response to any situation or statement", {
    situation: zod_1.z.string().describe("The situation or statement to respond to sarcastically"),
}, function (_a) { return __awaiter(void 0, [_a], void 0, function (_b) {
    var sarcasticPrefixes, sarcasticResponses, response;
    var situation = _b.situation;
    return __generator(this, function (_c) {
        sarcasticPrefixes = [
            "Oh, absolutely fantastic!",
            "Well, isn't that just wonderful?",
            "How utterly delightful!",
            "Oh, what a surprise!",
            "That's just marvelous!",
            "How incredibly shocking!",
            "Well, well, well...",
            "Oh, the humanity!",
        ];
        sarcasticResponses = [
            "".concat(sarcasticPrefixes[Math.floor(Math.random() * sarcasticPrefixes.length)], " ").concat(situation, "? I'm sure that's exactly what everyone was hoping for today."),
            "\"".concat(situation, "\" - said no one ever who was having a good day."),
            "Oh, \"".concat(situation, "\"? Because clearly the universe has nothing better to do than orchestrate this moment of pure irony."),
            "Let me guess, \"".concat(situation, "\" happened at the absolute perfect time? Murphy's Law strikes again!"),
            "\"".concat(situation, "\" - another delightful reminder that life has such a wonderful sense of humor."),
        ];
        response = sarcasticResponses[Math.floor(Math.random() * sarcasticResponses.length)];
        return [2 /*return*/, {
                content: [
                    {
                        type: "text",
                        text: "\uD83D\uDE44 ".concat(response),
                    },
                ],
            }];
    });
}); });
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var transport;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    transport = new stdio_js_1.StdioServerTransport();
                    return [4 /*yield*/, server.connect(transport)];
                case 1:
                    _a.sent();
                    console.error("Sarcastic Jokes MCP Server running on stdio");
                    return [2 /*return*/];
            }
        });
    });
}
main().catch(function (error) {
    console.error("Fatal error in main():", error);
    process.exit(1);
});
