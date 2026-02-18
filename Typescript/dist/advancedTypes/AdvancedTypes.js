"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const patch = {
    active: false
};
const endpoint = "GET /users";
const resolvedValue = 25;
console.log("Mapped type patch:", patch);
console.log("Template literal endpoint:", endpoint);
console.log("Conditional infer value:", resolvedValue);
