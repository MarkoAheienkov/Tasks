const { LOCATIONS } = require('../../constants');
const { ERRORS } = require('./constants');
const repeatString = require('.');

describe(LOCATIONS.FACTORIAL, () => {
  test('Test when all parameters are correct', () => {
    const str = 'Wow';
    const num = 3;
    const predictResult = 'WowWowWow';
    const result = repeatString(str, num);
    expect(result).toBe(predictResult);
  });

  test('Test when all parameters are correct', () => {
    const str = 'H';
    const num = 10;
    const predictResult = 'HHHHHHHHHH';
    const result = repeatString(str, num);
    expect(result).toBe(predictResult);
  });

  test('Test when num is not a number', () => {
    const str = 'string';
    const num = 'Not a number';
    const error = ERRORS.NUM_IS_NOT_A_NUMBER;
    expect(() => {
      repeatString(str, num);
    }).toThrow(error);
  });

  test('Test when num is negative number', () => {
    const str = 'string';
    const num = -10;
    const error = ERRORS.NUM_IS_NEGATIVE;
    expect(() => {
      repeatString(str, num);
    }).toThrow(error);
  });

  test('Test when num is not integer number', () => {
    const str = 'string';
    const num = 9.123;
    const error = ERRORS.NUM_IS_NOT_INTEGER;
    expect(() => {
      repeatString(str, num);
    }).toThrow(error);
  });

  test('Test when str is not string', () => {
    const str = 10000;
    const num = 9;
    const error = ERRORS.STR_IS_NOT_A_STRING;
    expect(() => {
      repeatString(str, num);
    }).toThrow(error);
  });

  test('Test when num is equal to zero', () => {
    const str = 'string';
    const num = 0;
    const predictResult = '';
    const result = repeatString(str, num);
    expect(result).toBe(predictResult);
  });
});

