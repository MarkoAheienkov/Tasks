const {getValueFromSelector} = require('../../helpers');

const binarySearch = (arr, value, selector) => {
  let start = 0;
  let end = arr.length - 1;
  let searchingElement = null;
  while (end > start) {
    const middle = Math.ceil((end + start)/2);
    const midElement = arr[middle];
    const midElVal = getValueFromSelector(midElement, selector);
    if (midElVal == value) {
      searchingElement = midElement;
      break;
    } else if (midElVal > value) {
      end = middle - 1;
    } else if (midElVal < value) {
      start = middle + 1;
    } else {
      break;
    }
  }
  return searchingElement;
};

module.exports = binarySearch;
