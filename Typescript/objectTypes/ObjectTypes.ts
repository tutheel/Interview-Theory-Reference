export {};

type Employee = {
  id: number;
  name: string;
  department: string;
  manager?: string;
};

const employee: Employee = {
  id: 101,
  name: "Riya",
  department: "Engineering"
};

function printEmployee(value: Employee): void {
  console.log(`${value.name} (${value.id}) - ${value.department}`);
  console.log("Manager:", value.manager ?? "Not assigned");
}

printEmployee(employee);
