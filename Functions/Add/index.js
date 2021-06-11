const { TYPES } = require("../../constants");
const { ERRORS } = require("./constants");

const add = (num1, num2) => {
  if (typeof num1 !== TYPES.NUMBER) {
    throw new Error(ERRORS.NUM1_IS_NOT_A_NUMBER);
  }
  if (typeof num2 !== TYPES.NUMBER) {
    throw new Error(ERRORS.NUM2_IS_NOT_A_NUMBER);
  }
  return num1 + num2;
};

module.exports = add;
