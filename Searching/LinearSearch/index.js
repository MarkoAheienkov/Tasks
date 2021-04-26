const {getValueFromSelector} = require('../../helpers');

const linearSearch = (arr, value, selector) => {
  const searchingElements = [];
  for (const element of arr) {
    const elValue = getValueFromSelector(element, selector);
    if (elValue == value) {
      searchingElements.push(element);
    }
  }
  return searchingElements;
};

module.exports = linearSearch;

