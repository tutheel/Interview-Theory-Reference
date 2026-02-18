export {};

type ApiData = { kind: "user"; name: string } | { kind: "error"; message: string };

function isUser(data: ApiData): data is { kind: "user"; name: string } {
  return data.kind === "user";
}

function handle(data: ApiData): void {
  if (isUser(data)) {
    console.log("User:", data.name);
  } else {
    console.log("Error:", data.message);
  }
}

handle({ kind: "user", name: "Noah" });
handle({ kind: "error", message: "Not found" });
