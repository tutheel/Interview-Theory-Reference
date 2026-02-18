export {};

enum OrderStatus {
  Pending = "PENDING",
  Paid = "PAID",
  Shipped = "SHIPPED"
}

const queue: string[] = ["A100", "A101", "A102"];
const coordinate: [number, number] = [47.61, -122.33];
const orderState: OrderStatus = OrderStatus.Paid;

queue.push("A103");

console.log("Queue:", queue);
console.log("Coordinate:", coordinate);
console.log("Order status:", orderState);

const product: [id: number, name: string, inStock: boolean] = [1, "Keyboard", true];
console.log("Tuple with labels:", product);
