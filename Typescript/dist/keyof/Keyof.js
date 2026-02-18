"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getProp(obj, key) {
    return obj[key];
}
const product = { id: 1, name: "Keyboard", price: 70, inStock: true };
const key = "price";
console.log("Selected key:", key);
console.log("Selected value:", getProp(product, key));
