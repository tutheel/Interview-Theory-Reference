export {};

class ValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ValidationError";
  }
}

function parseAmount(input: string): number {
  const amount = Number(input);
  if (Number.isNaN(amount) || amount <= 0) {
    throw new ValidationError("Amount must be a positive number");
  }
  return amount;
}

type Shape =
  | { kind: "circle"; radius: number }
  | { kind: "square"; side: number };

function area(shape: Shape): number {
  switch (shape.kind) {
    case "circle":
      return Math.PI * shape.radius ** 2;
    case "square":
      return shape.side ** 2;
    default: {
      const neverShape: never = shape;
      return neverShape;
    }
  }
}

try {
  console.log("Parsed amount:", parseAmount("250"));
  console.log("Parsed amount:", parseAmount("-5"));
} catch (error: unknown) {
  if (error instanceof ValidationError) {
    console.log("Validation issue:", error.message);
  } else {
    console.log("Unknown error:", error);
  }
}

console.log("Circle area:", area({ kind: "circle", radius: 3 }));
console.log("Square area:", area({ kind: "square", side: 4 }));
