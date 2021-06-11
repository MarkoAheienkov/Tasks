const { TYPES } = require("../../constants");
const { ERRORS } = require("./constants");

const divide = (num1, num2) => {
  if (typeof num1 !== TYPES.NUMBER) {
    throw new Error(ERRORS.NUM1_IS_NOT_A_NUMBER);
  }
  if (typeof num2 !== TYPES.NUMBER) {
    throw new Error(ERRORS.NUM2_IS_NOT_A_NUMBER);
  }
  if (num2 === 0) {
    throw new Error(ERRORS.NUM2_IS_EQUAL_TO_ZERO);
  }
  return num1 / num2;
};

module.exports = divide;
