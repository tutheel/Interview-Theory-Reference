export {};

namespace StringTools {
  export function shout(value: string): string {
    return value.toUpperCase();
  }
}

console.log("Namespace output:", StringTools.shout("typescript"));
