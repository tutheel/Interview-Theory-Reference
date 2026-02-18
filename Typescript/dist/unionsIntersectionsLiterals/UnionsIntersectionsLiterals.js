"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function printResult(result) {
    if (result.ok) {
        console.log("API success:", result.data);
    }
    else {
        console.log("API error:", result.error);
    }
}
const method = "card";
const latestOrder = {
    id: "ORD-101",
    amount: 199,
    createdAt: new Date()
};
console.log("Payment method:", method);
printResult({ ok: true, data: "Order placed" });
printResult({ ok: false, error: "Payment failed" });
console.log("Timestamped order:", latestOrder);
