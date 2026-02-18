export {};

interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  isActive: boolean;
}

type PublicUser = Pick<User, "id" | "name" | "email">;
type UserPatch = Partial<User>;
type RequiredIdentity = Required<Pick<User, "id" | "name">>;
type UserDirectory = Record<string, PublicUser>;

const user: User = {
  id: 1,
  name: "Sara",
  email: "sara@example.com",
  password: "secret",
  isActive: true
};

const publicUser: PublicUser = {
  id: user.id,
  name: user.name,
  email: user.email
};

const patch: UserPatch = { isActive: false };
const requiredIdentity: RequiredIdentity = { id: 2, name: "Arjun" };

const directory: Readonly<UserDirectory> = {
  primary: publicUser
};

console.log("Public user:", publicUser);
console.log("Patch object:", patch);
console.log("Required identity:", requiredIdentity);
console.log("Readonly directory:", directory);
