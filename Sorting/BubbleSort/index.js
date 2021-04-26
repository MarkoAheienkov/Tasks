const {getValueFromSelector, comparator} = require('../../helpers');

const bubbleSort = (arr, selector, order = 1) => {
  const resArr = [...arr];
  for (let i = arr.length; i >= 0; i--) {
    for (let j = 0; j < i - 1; j++) {
      const val1 = getValueFromSelector(resArr[j+1], selector);
      const val2 = getValueFromSelector(resArr[j], selector);
      if (comparator(order, val2, val1)) {
        [resArr[j+1], resArr[j]] = [resArr[j], resArr[j+1]];
      }
    }
  }
  console.log('Bubble');
  return resArr;
};

module.exports = bubbleSort;
