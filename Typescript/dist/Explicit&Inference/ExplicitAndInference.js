"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let country = "USA";
let population = 333000000;
const skills = ["TypeScript", "Node.js"]; // inferred as string[]
let mix = [];
mix.push("users");
mix.push(1200);
function addTax(price, taxRate = 0.18) {
    return price + price * taxRate;
}
const total = addTax(100);
const role = "admin";
const currentRole = "admin";
console.log("Country:", country);
console.log("Population:", population);
console.log("Skills:", skills);
console.log("Mixed values:", mix);
console.log("Total with inferred tax:", total);
console.log("Role:", currentRole);
