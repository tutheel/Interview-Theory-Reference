export {};

declare global {
  var externalHash: ((value: string) => string) | undefined;
}

function hashValue(value: string): string {
  if (typeof globalThis.externalHash === "function") {
    return globalThis.externalHash(value);
  }
  return `mock-hash(${value})`;
}

console.log("Without external lib:", hashValue("typescript"));

globalThis.externalHash = (value: string) => `real-hash(${value.toUpperCase()})`;
console.log("With simulated external lib:", hashValue("typescript"));
