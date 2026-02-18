"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const readonlyTodo = {
    title: "Learn TS",
    completed: false,
    priority: 1
};
const nullableTodo = {
    title: null,
    completed: null,
    priority: null
};
console.log("Readonly todo:", readonlyTodo);
console.log("Nullable todo:", nullableTodo);
