export {};

type ToolName = "tsc" | "eslint" | "prettier" | "vitest";

const scripts: Record<ToolName, string> = {
  tsc: "npx tsc -p .",
  eslint: "npx eslint .",
  prettier: "npx prettier --check .",
  vitest: "npx vitest"
};

function run(tool: ToolName): string {
  return scripts[tool];
}

console.log("Tool command (tsc):", run("tsc"));
console.log("Tool command (eslint):", run("eslint"));
