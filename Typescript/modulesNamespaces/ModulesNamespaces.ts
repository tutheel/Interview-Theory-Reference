export {};

namespace LegacyMath {
  export const PI = 3.14159;

  export function areaOfCircle(radius: number): number {
    return PI * radius * radius;
  }
}

const ModernMath = {
  add(a: number, b: number): number {
    return a + b;
  },
  multiply(a: number, b: number): number {
    return a * b;
  }
};

console.log("Namespace area:", LegacyMath.areaOfCircle(3));
console.log("Object module add:", ModernMath.add(10, 5));
console.log("Object module multiply:", ModernMath.multiply(4, 6));
