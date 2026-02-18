export {};

type Theme = "light" | "dark";
type StatusCode = 200 | 400 | 500;
type EventName = `on${"Click" | "Submit"}`;

const theme: Theme = "dark";
const status: StatusCode = 200;
const eventName: EventName = "onClick";

console.log("Theme:", theme);
console.log("Status:", status);
console.log("Event name:", eventName);
