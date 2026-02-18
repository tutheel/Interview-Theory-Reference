"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user = {
    id: 1,
    name: "Liam",
    address: {
        city: "Seattle",
        country: "USA"
    }
};
function formatUser(value) {
    const emailText = value.email ?? "email not provided";
    return `${value.name} (${value.id}) - ${emailText} - ${value.address.city}, ${value.address.country}`;
}
console.log(formatUser(user));
const userWithEmail = {
    ...user,
    email: "liam@example.com"
};
console.log(formatUser(userWithEmail));
