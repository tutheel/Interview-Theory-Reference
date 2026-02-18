"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user = {
    id: 1,
    name: "Sara",
    email: "sara@example.com",
    password: "secret",
    isActive: true
};
const publicUser = {
    id: user.id,
    name: user.name,
    email: user.email
};
const patch = { isActive: false };
const requiredIdentity = { id: 2, name: "Arjun" };
const directory = {
    primary: publicUser
};
console.log("Public user:", publicUser);
console.log("Patch object:", patch);
console.log("Required identity:", requiredIdentity);
console.log("Readonly directory:", directory);
