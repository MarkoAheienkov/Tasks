const {getValueFromSelector, comparator} = require('../../helpers');

const insertionSort = (arr, selector, order = 1) => {
  const resArr = [...arr];
  for (let i = 0; i < resArr.length; i++) {
    const valI = getValueFromSelector(resArr[i], selector);
    let prevI = i;
    for (let j = i - 1; j >= 0; j--) {
      const valJ = getValueFromSelector(resArr[j], selector);
      if (comparator(order, valI, valJ)) {
        [resArr[prevI], resArr[j]] = [resArr[j], resArr[prevI]];
        prevI--;
      } else {
        break;
      }
    }
  }
  return resArr;
};

module.exports = insertionSort;
