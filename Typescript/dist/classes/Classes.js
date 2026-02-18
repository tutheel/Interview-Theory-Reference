"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class User {
    constructor(id, name) {
        this.id = id;
        this.name = name;
    }
    describe() {
        return `${this.name} (#${this.id})`;
    }
}
const user = new User(1, "Ava");
console.log("Class instance:", user.describe());
