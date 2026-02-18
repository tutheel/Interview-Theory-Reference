export {};

const message: string = "TypeScript adds static types to JavaScript";
const releaseYear: number = 2012;

function chapterSummary(topic: string): string {
  return `${topic} is useful for large codebases and safer refactoring.`;
}

console.log(message);
console.log("Initial release year:", releaseYear);
console.log(chapterSummary("TypeScript"));
