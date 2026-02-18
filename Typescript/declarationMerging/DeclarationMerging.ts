export {};

interface User {
  id: number;
}

interface User {
  name: string;
}

interface Settings {
  theme: "light" | "dark";
}

interface Settings {
  fontSize: number;
}

const user: User = { id: 1, name: "Mia" };
const settings: Settings = { theme: "dark", fontSize: 16 };

console.log("Merged user interface:", user);
console.log("Merged settings interface:", settings);
