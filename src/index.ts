/**
 * Demo TypeScript Application
 */

export function add(a: number, b: number): number {
  return a + b;
}

export function greet(name: string): string {
  return `Hello, ${name}!`;
}

export class Calculator {
  public add(a: number, b: number): number {
    return a + b;
  }

  public subtract(a: number, b: number): number {
    return a - b;
  }

  public multiply(a: number, b: number): number {
    return a * b;
  }

  public divide(a: number, b: number): number {
    if (b === 0) {
      throw new Error('Division by zero');
    }
    return a / b;
  }
}

if (require.main === module) {
  console.log(greet('World'));
  const calc = new Calculator();
  console.log(`5 + 3 = ${calc.add(5, 3)}`);
  console.log(`5 - 3 = ${calc.subtract(5, 3)}`);
  console.log(`5 * 3 = ${calc.multiply(5, 3)}`);
  console.log(`5 / 3 = ${calc.divide(5, 3).toFixed(2)}`);
}
