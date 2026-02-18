export {};

type PaymentMethod = "card" | "upi" | "cash";

type Success = {
  ok: true;
  data: string;
};

type Failure = {
  ok: false;
  error: string;
};

type ApiResult = Success | Failure;

type Order = {
  id: string;
  amount: number;
};

type Timestamped = {
  createdAt: Date;
};

type TimestampedOrder = Order & Timestamped;

function printResult(result: ApiResult): void {
  if (result.ok) {
    console.log("API success:", result.data);
  } else {
    console.log("API error:", result.error);
  }
}

const method: PaymentMethod = "card";
const latestOrder: TimestampedOrder = {
  id: "ORD-101",
  amount: 199,
  createdAt: new Date()
};

console.log("Payment method:", method);
printResult({ ok: true, data: "Order placed" });
printResult({ ok: false, error: "Payment failed" });
console.log("Timestamped order:", latestOrder);
