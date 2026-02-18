"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function printIdentifier(id) {
    if (typeof id === "string") {
        console.log("String id:", id.toUpperCase());
    }
    else {
        console.log("Number id + 1:", id + 1);
    }
}
const state = "success";
printIdentifier("abc-123");
printIdentifier(456);
console.log("Load state:", state);
