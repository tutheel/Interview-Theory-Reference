export {};

let country = "USA";
let population: number = 333_000_000;

const skills = ["TypeScript", "Node.js"]; // inferred as string[]

let mix: (string | number)[] = [];
mix.push("users");
mix.push(1200);

function addTax(price: number, taxRate = 0.18): number {
  return price + price * taxRate;
}

const total = addTax(100);
const role = "admin" as const;

type Role = typeof role;
const currentRole: Role = "admin";

console.log("Country:", country);
console.log("Population:", population);
console.log("Skills:", skills);
console.log("Mixed values:", mix);
console.log("Total with inferred tax:", total);
console.log("Role:", currentRole);
