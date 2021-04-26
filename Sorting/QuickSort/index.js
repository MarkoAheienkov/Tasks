const {getValueFromSelector, comparator} = require('../../helpers');

const pivot = (arr, selector, start=0, last=arr.length, order=1) => {
  let pivot = start;
  const valP = getValueFromSelector(arr[pivot], selector);
  for (let i = start + 1; i < last; i++) {
    const valI = getValueFromSelector(arr[i], selector);
    if (comparator(order, valI, valP)) {
      pivot++;
      [arr[i], arr[pivot]] = [arr[pivot], arr[i]];
    }
  }
  [arr[start], arr[pivot]] = [arr[pivot], arr[start]];
  return pivot;
};

const quickSortHelper = (arr, selector, start=0, last=arr.length, order=1) => {
  if (last <= start) {
    return arr;
  }
  const idx = pivot(arr, selector, start, last, order);
  quickSortHelper(arr, selector, start, idx, order);
  quickSortHelper(arr, selector, idx + 1, last, order);
};

const quickSort = (arr, selector, order = 1) => {
  const resultArr = [...arr];
  quickSortHelper(resultArr, selector, 0, resultArr.length, order);
  return resultArr;
};

module.exports = quickSort;
