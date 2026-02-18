export {};

type UserId = string | number;

interface Profile {
  id: UserId;
  name: string;
  skills: string[];
}

interface Admin extends Profile {
  role: "admin";
}

const admin: Admin = {
  id: "USR-7",
  name: "Ishaan",
  skills: ["TypeScript", "AWS"],
  role: "admin"
};

console.log("Admin profile:", admin);
