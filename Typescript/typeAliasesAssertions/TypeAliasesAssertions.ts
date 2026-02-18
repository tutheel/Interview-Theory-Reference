export {};

type UserId = string | number;

type ApiResponse<T> = {
  status: number;
  data: T;
};

const userId: UserId = "USR-1";
const response: ApiResponse<{ name: string; role: string }> = {
  status: 200,
  data: {
    name: "Noah",
    role: "Engineer"
  }
};

const rawJson = '{"id":1,"name":"Mia"}' as string;
const parsed = JSON.parse(rawJson) as { id: number; name: string };

const found = [10, 20, 30].find((n) => n === 20)!;

console.log("User ID:", userId);
console.log("Typed API response:", response);
console.log("Parsed with assertion:", parsed);
console.log("Non-null assertion result:", found + 1);
