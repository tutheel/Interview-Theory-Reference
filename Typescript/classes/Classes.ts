export {};

class User {
  constructor(private readonly id: number, public name: string) {}

  describe(): string {
    return `${this.name} (#${this.id})`;
  }
}

const user = new User(1, "Ava");
console.log("Class instance:", user.describe());
