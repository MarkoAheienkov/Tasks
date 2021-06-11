const { LOCATIONS } = require('../../constants');
const divide = require('./');
const { ERRORS } = require('./constants');

describe(LOCATIONS.DIVIDE, () => {
  test('Test when all parameters are correct', () => {
    const num1 = 1230;
    const num2 = 2;
    const predictResult = 615;
    const result = divide(num1, num2);
    expect(result).toBe(predictResult);
  });

  test('Test when first parameter is not a number', () => {
    const num1 = 'Not a number';
    const num2 = 1230;
    const error = ERRORS.NUM1_IS_NOT_A_NUMBER;
    expect(() => {
      divide(num1, num2);
    }).toThrow(error);
  });

  test('Test when second parameter is not a number', () => {
    const num1 = 2;
    const num2 = 'Not a number';
    const error = ERRORS.NUM2_IS_NOT_A_NUMBER;
    expect(() => {
      divide(num1, num2);
    }).toThrow(error);
  });

  test('Test when second parameter is zero', () => {
    const num1 = 1230;
    const num2 = 0;
    const error = ERRORS.NUM2_IS_EQUAL_TO_ZERO;
    expect(() => {
      divide(num1, num2);
    }).toThrow(error);
  });
});

