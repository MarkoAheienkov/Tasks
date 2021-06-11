const { TYPES } = require("../../constants");
const { ERRORS } = require("./constants");

const repeatString = (str, num) => {
  if (typeof str !== TYPES.STRING) {
    throw new Error(ERRORS.STR_IS_NOT_A_STRING);
  }
  if (typeof num !== TYPES.NUMBER) {
    throw new Error(ERRORS.NUM_IS_NOT_A_NUMBER);
  }
  if (num < 0) {
    throw new Error(ERRORS.NUM_IS_NEGATIVE);
  }
  if (!Number.isInteger(num)) {
    throw new Error(ERRORS.NUM_IS_NOT_INTEGER);
  }
  let result = '';
  for (let i = 0; i < num; i++) {
    result += str;
  }
  return result;
};

module.exports = repeatString;
