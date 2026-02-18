"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function hashValue(value) {
    if (typeof globalThis.externalHash === "function") {
        return globalThis.externalHash(value);
    }
    return `mock-hash(${value})`;
}
console.log("Without external lib:", hashValue("typescript"));
globalThis.externalHash = (value) => `real-hash(${value.toUpperCase()})`;
console.log("With simulated external lib:", hashValue("typescript"));
