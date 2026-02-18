"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function wait(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}
async function runTask() {
    await wait(100);
    console.log("Async task finished");
}
runTask().catch((error) => console.log("Async error:", error));
