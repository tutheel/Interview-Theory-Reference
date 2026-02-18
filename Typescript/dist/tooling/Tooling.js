"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const scripts = {
    tsc: "npx tsc -p .",
    eslint: "npx eslint .",
    prettier: "npx prettier --check .",
    vitest: "npx vitest"
};
function run(tool) {
    return scripts[tool];
}
console.log("Tool command (tsc):", run("tsc"));
console.log("Tool command (eslint):", run("eslint"));
