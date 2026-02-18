export {};

type LegacyUser = {
  id: number;
  name: string;
  email?: string;
};

const fromJavaScript: any = {
  id: 9,
  name: "Legacy User",
  email: "legacy@example.com"
};

const migratedUser: LegacyUser = fromJavaScript;

function safeEmail(user: LegacyUser): string {
  return user.email ?? "email-missing";
}

console.log("Migrated user:", migratedUser);
console.log("Safe email read:", safeEmail(migratedUser));
