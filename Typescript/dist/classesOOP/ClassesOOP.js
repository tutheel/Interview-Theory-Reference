"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Employee {
    constructor(id, name) {
        this.id = id;
        this.name = name;
    }
    describe() {
        return `${this.name} (#${this.id})`;
    }
}
class SalariedEmployee extends Employee {
    constructor(id, name, annualSalary) {
        super(id, name);
        this.annualSalary = annualSalary;
    }
    calculatePay() {
        return this.annualSalary / 12;
    }
}
class ContractEmployee extends Employee {
    constructor(id, name, hourlyRate, hoursWorked) {
        super(id, name);
        this.hourlyRate = hourlyRate;
        this.hoursWorked = hoursWorked;
    }
    calculatePay() {
        return this.hourlyRate * this.hoursWorked;
    }
}
const fullTime = new SalariedEmployee(1, "Emma", 120000);
const contractor = new ContractEmployee(2, "Raj", 60, 120);
console.log(fullTime.describe(), "Monthly pay:", fullTime.calculatePay());
console.log(contractor.describe(), "Invoice amount:", contractor.calculatePay());
