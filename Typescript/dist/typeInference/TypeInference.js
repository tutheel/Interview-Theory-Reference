"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const framework = "Node.js";
let version = 5.7;
const tags = ["typed", "safe", "scalable"];
function add(a, b) {
    return a + b;
}
const total = add(7, 8);
console.log("Framework:", framework);
console.log("Version:", version);
console.log("Tags:", tags);
console.log("Inferred return result:", total);
