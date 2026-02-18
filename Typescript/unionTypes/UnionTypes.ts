export {};

type Identifier = string | number;
type LoadState = "loading" | "success" | "error";

function printIdentifier(id: Identifier): void {
  if (typeof id === "string") {
    console.log("String id:", id.toUpperCase());
  } else {
    console.log("Number id + 1:", id + 1);
  }
}

const state: LoadState = "success";

printIdentifier("abc-123");
printIdentifier(456);
console.log("Load state:", state);
