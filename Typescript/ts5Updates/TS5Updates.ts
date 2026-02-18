export {};

type Route = {
  method: "GET" | "POST";
  path: `/${string}`;
  secure: boolean;
};

const route = {
  method: "GET",
  path: "/users",
  secure: true
} as const satisfies Route;

function literalTuple<const T extends readonly string[]>(...values: T): T {
  return values;
}

const roles = literalTuple("admin", "user", "viewer");

console.log("Route checked with satisfies:", route);
console.log("Const generic tuple:", roles);
