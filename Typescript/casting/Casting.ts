export {};

const rawValue: unknown = "42";
const asString = rawValue as string;
const asNumber = Number(asString);

type ApiUser = { id: number; name: string };
const parsed = JSON.parse('{"id":1,"name":"Ava"}') as ApiUser;

const maybeFound = ["ts", "js", "node"].find((v) => v === "ts")!;

console.log("Casted string:", asString);
console.log("Converted number:", asNumber + 8);
console.log("Parsed user:", parsed);
console.log("Non-null assertion value:", maybeFound);
