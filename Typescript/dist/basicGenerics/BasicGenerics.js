"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function first(items) {
    return items[0];
}
function pair(left, right) {
    return [left, right];
}
const firstNumber = first([10, 20, 30]);
const valuePair = pair("level", 2);
const wrapped = { value: true };
console.log("First number:", firstNumber);
console.log("Generic pair:", valuePair);
console.log("Wrapped value:", wrapped);
