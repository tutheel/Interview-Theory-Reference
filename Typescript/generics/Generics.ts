export {};

function identity<T>(value: T): T {
  return value;
}

function wrapInArray<T>(value: T): T[] {
  return [value];
}

interface ApiResult<T> {
  success: boolean;
  payload: T;
}

class Box<T> {
  constructor(private readonly value: T) {}

  getValue(): T {
    return this.value;
  }
}

function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

const text = identity<string>("Hello Generics");
const wrappedNumber = wrapInArray(42);

const result: ApiResult<{ id: number; name: string }> = {
  success: true,
  payload: { id: 1, name: "Aarav" }
};

const numberBox = new Box<number>(99);
const user = { id: 10, name: "Ivy", active: true };

console.log("Identity:", text);
console.log("Wrapped number:", wrappedNumber);
console.log("API result:", result);
console.log("Box value:", numberBox.getValue());
console.log("Property access:", getProperty(user, "name"));
