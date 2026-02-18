"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function greet(name, title) {
    return title ? `Hello ${title} ${name}` : `Hello ${name}`;
}
function multiply(a, b) {
    return a * b;
}
const divide = (a, b) => {
    if (b === 0) {
        throw new Error("Division by zero is not allowed");
    }
    return a / b;
};
function printValues(...values) {
    console.log("Values:", values.join(", "));
}
const subtract = (a, b) => a - b;
console.log(greet("Mia"));
console.log(greet("Mia", "Dr."));
console.log("Multiply:", multiply(4, 5));
console.log("Subtract:", subtract(10, 3));
printValues(1, 2, 3, 4);
try {
    console.log("Divide:", divide(10, 2));
}
catch (error) {
    console.log("Divide error:", error);
}
