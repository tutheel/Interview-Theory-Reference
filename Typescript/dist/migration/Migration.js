"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fromJavaScript = {
    id: 9,
    name: "Legacy User",
    email: "legacy@example.com"
};
const migratedUser = fromJavaScript;
function safeEmail(user) {
    return user.email ?? "email-missing";
}
console.log("Migrated user:", migratedUser);
console.log("Safe email read:", safeEmail(migratedUser));
