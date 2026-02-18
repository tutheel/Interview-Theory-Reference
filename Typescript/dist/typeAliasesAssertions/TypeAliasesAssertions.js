"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const userId = "USR-1";
const response = {
    status: 200,
    data: {
        name: "Noah",
        role: "Engineer"
    }
};
const rawJson = '{"id":1,"name":"Mia"}';
const parsed = JSON.parse(rawJson);
const found = [10, 20, 30].find((n) => n === 20);
console.log("User ID:", userId);
console.log("Typed API response:", response);
console.log("Parsed with assertion:", parsed);
console.log("Non-null assertion result:", found + 1);
