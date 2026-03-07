import { add, greet, Calculator } from '../src/index';

describe('Demo Functions', () => {
  test('add function should sum two numbers', () => {
    expect(add(2, 3)).toBe(5);
  });

  test('add function should handle negative numbers', () => {
    expect(add(-2, 3)).toBe(1);
  });

  test('greet function should return greeting message', () => {
    expect(greet('Alice')).toBe('Hello, Alice!');
  });
});

describe('Calculator Class', () => {
  let calculator: Calculator;

  beforeEach(() => {
    calculator = new Calculator();
  });

  test('should add two numbers', () => {
    expect(calculator.add(5, 3)).toBe(8);
  });

  test('should subtract two numbers', () => {
    expect(calculator.subtract(5, 3)).toBe(2);
  });

  test('should multiply two numbers', () => {
    expect(calculator.multiply(5, 3)).toBe(15);
  });

  test('should divide two numbers', () => {
    expect(calculator.divide(6, 2)).toBe(3);
  });

  test('should throw error on division by zero', () => {
    expect(() => {
      calculator.divide(5, 0);
    }).toThrow('Division by zero');
  });
});
