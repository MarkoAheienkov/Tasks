const { LOCATIONS } = require('../../constants');
const add = require('./');
const { ERRORS } = require('./constants');

describe(LOCATIONS.ADD, () => {
  test('Test when all parameters are correct', () => {
    const num1 = 2;
    const num2 = 1230;
    const predictResult = 1232;
    const result = add(num1, num2);
    expect(result).toBe(predictResult);
  });

  test('Test when first parameter is not a number', () => {
    const num1 = 'Not a number';
    const num2 = 1230;
    const error = ERRORS.NUM1_IS_NOT_A_NUMBER;
    expect(() => {
      add(num1, num2);
    }).toThrow(error);
  });

  test('Test when second parameter is not a number', () => {
    const num1 = 2;
    const num2 = 'Not a number';
    const predictResult = 1232;
    const error = ERRORS.NUM2_IS_NOT_A_NUMBER;
    expect(() => {
      add(num1, num2);
    }).toThrow(error);
  });
});

