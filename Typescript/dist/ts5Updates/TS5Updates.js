"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const route = {
    method: "GET",
    path: "/users",
    secure: true
};
function literalTuple(...values) {
    return values;
}
const roles = literalTuple("admin", "user", "viewer");
console.log("Route checked with satisfies:", route);
console.log("Const generic tuple:", roles);
