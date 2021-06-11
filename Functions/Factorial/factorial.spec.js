const { LOCATIONS } = require('../../constants');
const { ERRORS } = require('./constants');
const factorial = require('.');

describe(LOCATIONS.FACTORIAL, () => {
  test('Test when all parameters are correct', () => {
    const num1 = 10;
    const predictResult = 3628800;
    const result = factorial(num1);
    expect(result).toBe(predictResult);
  });

  test('Test when all parameters are correct', () => {
    const num1 = 8;
    const predictResult = 40320;
    const result = factorial(num1);
    expect(result).toBe(predictResult);
  });

  test('Test when parameter is not a number', () => {
    const num1 = 'Not a number';
    const error = ERRORS.NUM_IS_NOT_A_NUMBER;
    expect(() => {
      factorial(num1);
    }).toThrow(error);
  });

  test('Test when parameter is negative number', () => {
    const num1 = -10;
    const error = ERRORS.NUM_IS_NEGATIVE;
    expect(() => {
      factorial(num1);
    }).toThrow(error);
  });

  test('Test when parameter is not integer number', () => {
    const num1 = 9.123;
    const error = ERRORS.NUM_IS_NOT_INTEGER;
    expect(() => {
      factorial(num1);
    }).toThrow(error);
  });

  test('Test when parameter is equal to zero', () => {
    const num1 = 0;
    const predictResult = 1;
    const result = factorial(num1);
    expect(result).toBe(predictResult);
  });
});

