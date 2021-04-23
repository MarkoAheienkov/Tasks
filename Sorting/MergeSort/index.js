const {getValueFromSelector, comparator} = require('../../helpers');

const merge = (arr1, arr2, selector, order = 1) => {
  let idx1 = 0;
  let idx2 = 0;
  const length = arr1.length + arr2.length;
  const result = [];
  for (let i = 0; i < length; i++) {
    const el1 = arr1[idx1];
    const el2 = arr2[idx2];
    if (el1 === undefined) {
      result.push(el2);
      idx2++;
      continue;
    } else if (el2 === undefined) {
      result.push(el1);
      idx1++;
      continue;
    }
    const val1 = getValueFromSelector(el1, selector);
    const val2 = getValueFromSelector(el2, selector);
    if (comparator(order, val1, val2)) {
      result.push(el1);
      idx1++;
    } else {
      result.push(el2);
      idx2++;
    }
  }
  return result;
};

const mergeSort = (arr, selector, order = 1) => {
  if (arr.length <= 1) {
    return arr;
  }
  const middle = Math.floor(arr.length/2);
  const arr1 = arr.slice(0, middle);
  const arr2 = arr.slice(middle, arr.length);
  return merge(
      mergeSort(arr1, selector, order),
      mergeSort(arr2, selector, order),
      selector,
      order,
  );
};

module.exports = mergeSort;
