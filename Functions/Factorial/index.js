const { TYPES } = require("../../constants");
const { ERRORS } = require("./constants");

const factorial = (num1) => {
  if (typeof num1 !== TYPES.NUMBER) {
    throw new Error(ERRORS.NUM_IS_NOT_A_NUMBER);
  }
  if (num1 < 0) {
    throw new Error(ERRORS.NUM_IS_NEGATIVE);
  }
  if (!Number.isInteger(num1)) {
    throw new Error(ERRORS.NUM_IS_NOT_INTEGER);
  }
  let result = 1;
  for (let i = 1; i <= num1; i++) {
    result *= i;
  }
  return result;
};

module.exports = factorial;
