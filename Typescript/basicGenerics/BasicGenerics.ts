export {};

function first<T>(items: T[]): T | undefined {
  return items[0];
}

function pair<T, U>(left: T, right: U): [T, U] {
  return [left, right];
}

interface Wrapper<T> {
  value: T;
}

const firstNumber = first([10, 20, 30]);
const valuePair = pair("level", 2);
const wrapped: Wrapper<boolean> = { value: true };

console.log("First number:", firstNumber);
console.log("Generic pair:", valuePair);
console.log("Wrapped value:", wrapped);
