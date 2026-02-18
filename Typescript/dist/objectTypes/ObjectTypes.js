"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const employee = {
    id: 101,
    name: "Riya",
    department: "Engineering"
};
function printEmployee(value) {
    console.log(`${value.name} (${value.id}) - ${value.department}`);
    console.log("Manager:", value.manager ?? "Not assigned");
}
printEmployee(employee);
