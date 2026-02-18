"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var OrderStatus;
(function (OrderStatus) {
    OrderStatus["Pending"] = "PENDING";
    OrderStatus["Paid"] = "PAID";
    OrderStatus["Shipped"] = "SHIPPED";
})(OrderStatus || (OrderStatus = {}));
const queue = ["A100", "A101", "A102"];
const coordinate = [47.61, -122.33];
const orderState = OrderStatus.Paid;
queue.push("A103");
console.log("Queue:", queue);
console.log("Coordinate:", coordinate);
console.log("Order status:", orderState);
const product = [1, "Keyboard", true];
console.log("Tuple with labels:", product);
