export {};

interface Product {
  id: number;
  name: string;
  price: number;
  inStock: boolean;
}

function getProp<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

const product: Product = { id: 1, name: "Keyboard", price: 70, inStock: true };
const key: keyof Product = "price";

console.log("Selected key:", key);
console.log("Selected value:", getProp(product, key));
