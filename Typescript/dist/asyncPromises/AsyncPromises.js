"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}
async function fetchUser(id) {
    await delay(200);
    return { id, name: `User-${id}` };
}
async function run() {
    const user = await fetchUser(1);
    console.log("Fetched single user:", user);
    const users = await Promise.all([fetchUser(2), fetchUser(3)]);
    console.log("Fetched multiple users:", users);
}
run().catch((error) => {
    console.log("Async error:", error);
});
