"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const firstName = "Ava";
const age = 29;
const isInterviewReady = true;
const scores = [88, 92, 95];
const emptyValue = null;
let dynamicValue = "TypeScript";
console.log("Name:", firstName);
console.log("Age:", age);
console.log("Ready:", isInterviewReady);
console.log("Scores:", scores);
console.log("Null value:", emptyValue);
if (typeof dynamicValue === "string") {
    console.log("Uppercase dynamic value:", dynamicValue.toUpperCase());
}
dynamicValue = 123;
if (typeof dynamicValue === "number") {
    console.log("Number dynamic value + 10:", dynamicValue + 10);
}
