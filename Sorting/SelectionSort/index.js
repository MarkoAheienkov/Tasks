const {getValueFromSelector, comparator} = require('../../helpers');

const selectionSort = (arr, selector, order = 1) => {
  const resArr = [...arr];
  for (let i = 0; i < arr.length; i++) {
    let minIdx = i;
    for (let j = i; j < arr.length; j++) {
      const minVal = getValueFromSelector(resArr[minIdx], selector);
      const curVal = getValueFromSelector(resArr[j], selector);
      if (comparator(order, curVal, minVal)) {
        minIdx = j;
      }
    }
    [resArr[i], resArr[minIdx]] = [resArr[minIdx], resArr[i]];
  }
  return resArr;
};

module.exports = selectionSort;
