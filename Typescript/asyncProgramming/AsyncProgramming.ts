export {};

function wait(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function runTask(): Promise<void> {
  await wait(100);
  console.log("Async task finished");
}

runTask().catch((error: unknown) => console.log("Async error:", error));
