export {};

const firstName: string = "Ava";
const age: number = 29;
const isInterviewReady: boolean = true;
const scores: number[] = [88, 92, 95];
const emptyValue: null = null;

let dynamicValue: unknown = "TypeScript";

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
