export {};

interface AppEnv {
  NODE_ENV: "development" | "production";
  PORT: number;
}

const env: AppEnv = {
  NODE_ENV: "development",
  PORT: 3000
};

const commands: string[] = [
  "npm i -D typescript",
  "npm i -D ts-node",
  "npm i -D @types/node"
];

function startCommand(value: AppEnv): string {
  return `node dist/server.js --port ${value.PORT}`;
}

console.log("Node.js TS commands:", commands);
console.log("Start command:", startCommand(env));
