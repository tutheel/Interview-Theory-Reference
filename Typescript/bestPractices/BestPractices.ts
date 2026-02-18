export {};

type Role = "admin" | "user";

type Account = {
  readonly id: number;
  role: Role;
};

function assertNever(value: never): never {
  throw new Error(`Unhandled value: ${String(value)}`);
}

function permissions(role: Role): string[] {
  switch (role) {
    case "admin":
      return ["read", "write", "delete"];
    case "user":
      return ["read"];
    default:
      return assertNever(role);
  }
}

const account: Account = { id: 1, role: "admin" };
const unsafeInput: unknown = '{"ok":true}';

if (typeof unsafeInput === "string") {
  const parsed = JSON.parse(unsafeInput) as { ok: boolean };
  console.log("Parsed unknown safely:", parsed);
}

console.log("Account permissions:", permissions(account.role));
