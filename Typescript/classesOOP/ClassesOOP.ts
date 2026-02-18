export {};

abstract class Employee {
  constructor(public id: number, public name: string) {}

  abstract calculatePay(): number;

  describe(): string {
    return `${this.name} (#${this.id})`;
  }
}

class SalariedEmployee extends Employee {
  constructor(id: number, name: string, private annualSalary: number) {
    super(id, name);
  }

  calculatePay(): number {
    return this.annualSalary / 12;
  }
}

class ContractEmployee extends Employee {
  constructor(id: number, name: string, private hourlyRate: number, private hoursWorked: number) {
    super(id, name);
  }

  calculatePay(): number {
    return this.hourlyRate * this.hoursWorked;
  }
}

const fullTime = new SalariedEmployee(1, "Emma", 120000);
const contractor = new ContractEmployee(2, "Raj", 60, 120);

console.log(fullTime.describe(), "Monthly pay:", fullTime.calculatePay());
console.log(contractor.describe(), "Invoice amount:", contractor.calculatePay());
