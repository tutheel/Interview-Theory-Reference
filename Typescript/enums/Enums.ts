export {};

enum TaskStatus {
  Todo = "TODO",
  InProgress = "IN_PROGRESS",
  Done = "DONE"
}

const current: TaskStatus = TaskStatus.InProgress;

console.log("Current task status:", current);
console.log("All statuses:", TaskStatus.Todo, TaskStatus.InProgress, TaskStatus.Done);
