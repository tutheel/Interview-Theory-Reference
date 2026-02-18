"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const env = {
    NODE_ENV: "development",
    PORT: 3000
};
const commands = [
    "npm i -D typescript",
    "npm i -D ts-node",
    "npm i -D @types/node"
];
function startCommand(value) {
    return `node dist/server.js --port ${value.PORT}`;
}
console.log("Node.js TS commands:", commands);
console.log("Start command:", startCommand(env));
