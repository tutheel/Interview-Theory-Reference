"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const setupSteps = [
    "npm init -y",
    "npm i -D typescript",
    "npx tsc --init"
];
function compileCommand(file) {
    return `npx tsc ${file}`;
}
console.log("Setup steps:", setupSteps);
console.log("Compile command:", compileCommand("src/index.ts"));
console.log("Run command:", "node dist/index.js");
