"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function identity(value) {
    return value;
}
function wrapInArray(value) {
    return [value];
}
class Box {
    constructor(value) {
        this.value = value;
    }
    getValue() {
        return this.value;
    }
}
function getProperty(obj, key) {
    return obj[key];
}
const text = identity("Hello Generics");
const wrappedNumber = wrapInArray(42);
const result = {
    success: true,
    payload: { id: 1, name: "Aarav" }
};
const numberBox = new Box(99);
const user = { id: 10, name: "Ivy", active: true };
console.log("Identity:", text);
console.log("Wrapped number:", wrappedNumber);
console.log("API result:", result);
console.log("Box value:", numberBox.getValue());
console.log("Property access:", getProperty(user, "name"));
