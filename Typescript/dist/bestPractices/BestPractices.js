"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function assertNever(value) {
    throw new Error(`Unhandled value: ${String(value)}`);
}
function permissions(role) {
    switch (role) {
        case "admin":
            return ["read", "write", "delete"];
        case "user":
            return ["read"];
        default:
            return assertNever(role);
    }
}
const account = { id: 1, role: "admin" };
const unsafeInput = '{"ok":true}';
if (typeof unsafeInput === "string") {
    const parsed = JSON.parse(unsafeInput);
    console.log("Parsed unknown safely:", parsed);
}
console.log("Account permissions:", permissions(account.role));
