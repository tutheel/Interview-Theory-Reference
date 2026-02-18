export {};

const scores: number[] = [70, 85, 92, 100];
const names: Array<string> = ["Ava", "Noah", "Mia"];

const topScores = scores.filter((s) => s >= 90);
const upperNames = names.map((name) => name.toUpperCase());

console.log("Scores:", scores);
console.log("Top scores:", topScores);
console.log("Names:", names);
console.log("Uppercase names:", upperNames);
