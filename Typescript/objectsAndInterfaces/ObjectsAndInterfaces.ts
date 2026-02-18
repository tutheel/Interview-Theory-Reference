export {};

interface Address {
  city: string;
  country: string;
}

interface User {
  readonly id: number;
  name: string;
  email?: string;
  address: Address;
}

const user: User = {
  id: 1,
  name: "Liam",
  address: {
    city: "Seattle",
    country: "USA"
  }
};

function formatUser(value: User): string {
  const emailText = value.email ?? "email not provided";
  return `${value.name} (${value.id}) - ${emailText} - ${value.address.city}, ${value.address.country}`;
}

console.log(formatUser(user));

const userWithEmail: User = {
  ...user,
  email: "liam@example.com"
};

console.log(formatUser(userWithEmail));
