export {};

function LogMethod(
  _target: object,
  propertyKey: string,
  descriptor: PropertyDescriptor
): PropertyDescriptor {
  const originalMethod = descriptor.value as (...args: number[]) => number;

  descriptor.value = function (...args: number[]): number {
    console.log(`[Decorator] Calling ${propertyKey} with`, args);
    const result = originalMethod.apply(this, args);
    console.log(`[Decorator] ${propertyKey} returned`, result);
    return result;
  };

  return descriptor;
}

class Calculator {
  @LogMethod
  add(a: number, b: number): number {
    return a + b;
  }
}

const calculator = new Calculator();
console.log("Decorator demo result:", calculator.add(5, 7));
