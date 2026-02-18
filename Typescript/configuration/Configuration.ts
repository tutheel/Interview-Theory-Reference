export {};

type TsConfigSummary = {
  strict: boolean;
  target: "ES2020" | "ES2022";
  module: "CommonJS" | "ESNext";
  outDir: string;
};

const config: TsConfigSummary = {
  strict: true,
  target: "ES2020",
  module: "CommonJS",
  outDir: "dist"
};

console.log("Config summary:", config);
