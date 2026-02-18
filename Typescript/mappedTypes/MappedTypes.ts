export {};

interface Todo {
  title: string;
  completed: boolean;
  priority: number;
}

type ReadonlyTodo = {
  readonly [K in keyof Todo]: Todo[K];
};

type NullableTodo = {
  [K in keyof Todo]: Todo[K] | null;
};

const readonlyTodo: ReadonlyTodo = {
  title: "Learn TS",
  completed: false,
  priority: 1
};

const nullableTodo: NullableTodo = {
  title: null,
  completed: null,
  priority: null
};

console.log("Readonly todo:", readonlyTodo);
console.log("Nullable todo:", nullableTodo);
