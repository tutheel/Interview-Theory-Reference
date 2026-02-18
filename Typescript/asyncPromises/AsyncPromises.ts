export {};

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function fetchUser(id: number): Promise<{ id: number; name: string }> {
  await delay(200);
  return { id, name: `User-${id}` };
}

async function run(): Promise<void> {
  const user = await fetchUser(1);
  console.log("Fetched single user:", user);

  const users = await Promise.all([fetchUser(2), fetchUser(3)]);
  console.log("Fetched multiple users:", users);
}

run().catch((error: unknown) => {
  console.log("Async error:", error);
});
