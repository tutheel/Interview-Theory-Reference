"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function isUser(data) {
    return data.kind === "user";
}
function handle(data) {
    if (isUser(data)) {
        console.log("User:", data.name);
    }
    else {
        console.log("Error:", data.message);
    }
}
handle({ kind: "user", name: "Noah" });
handle({ kind: "error", message: "Not found" });
