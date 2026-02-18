export {};

function greet(name: string, title?: string): string {
  return title ? `Hello ${title} ${name}` : `Hello ${name}`;
}

function multiply(a: number, b: number): number {
  return a * b;
}

const divide = (a: number, b: number): number => {
  if (b === 0) {
    throw new Error("Division by zero is not allowed");
  }
  return a / b;
};

function printValues(...values: number[]): void {
  console.log("Values:", values.join(", "));
}

type MathOperation = (a: number, b: number) => number;
const subtract: MathOperation = (a, b) => a - b;

console.log(greet("Mia"));
console.log(greet("Mia", "Dr."));
console.log("Multiply:", multiply(4, 5));
console.log("Subtract:", subtract(10, 3));
printValues(1, 2, 3, 4);

try {
  console.log("Divide:", divide(10, 2));
} catch (error) {
  console.log("Divide error:", error);
}
