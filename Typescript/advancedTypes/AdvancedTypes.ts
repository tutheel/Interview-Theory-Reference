export {};

type Optional<T> = {
  [K in keyof T]?: T[K];
};

type PromiseValue<T> = T extends Promise<infer U> ? U : T;

type HttpMethod = "GET" | "POST";
type Resource = "users" | "orders";
type Endpoint = `${HttpMethod} /${Resource}`;

interface Profile {
  id: number;
  name: string;
  active: boolean;
}

const patch: Optional<Profile> = {
  active: false
};

const endpoint: Endpoint = "GET /users";

type FromPromise = PromiseValue<Promise<number>>;
const resolvedValue: FromPromise = 25;

console.log("Mapped type patch:", patch);
console.log("Template literal endpoint:", endpoint);
console.log("Conditional infer value:", resolvedValue);
