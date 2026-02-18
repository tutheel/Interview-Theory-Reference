export {};

type HttpResponse = [statusCode: number, body: string];
const okResponse: HttpResponse = [200, "OK"];

const rgb: [number, number, number] = [52, 152, 219];

console.log("HTTP response tuple:", okResponse);
console.log("RGB tuple:", rgb);
