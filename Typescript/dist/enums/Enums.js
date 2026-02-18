"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TaskStatus;
(function (TaskStatus) {
    TaskStatus["Todo"] = "TODO";
    TaskStatus["InProgress"] = "IN_PROGRESS";
    TaskStatus["Done"] = "DONE";
})(TaskStatus || (TaskStatus = {}));
const current = TaskStatus.InProgress;
console.log("Current task status:", current);
console.log("All statuses:", TaskStatus.Todo, TaskStatus.InProgress, TaskStatus.Done);
