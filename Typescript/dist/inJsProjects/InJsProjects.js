"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function describeUser(user) {
    return `${user.id}: ${user.name}`;
}
const jsDocHint = "Use // @ts-check in .js files for gradual adoption.";
console.log("JS project typed user:", describeUser({ id: 5, name: "Noah" }));
console.log("JSDoc hint:", jsDocHint);
