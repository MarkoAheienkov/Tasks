const {linearSearch} = require('../../Searching');
const {insertionSort, bubbleSort} = require('../../Sorting');
const SortAndFind = require('../SortAndFind');

/**
 * Sort And Find implement with using Bubble Sort,
 * Insertion Sort and Linear Search
 */
class IBLSortAndFind extends SortAndFind {
  /**
   * Implement Find with using Linear Search
   * @param {[]} data
   * @param {String} selector
   * @param {*} value
   * @return {[]}
   */
  find(data, selector, value) {
    const searchValue = linearSearch(data, value, selector);
    console.log(searchValue);
    return searchValue;
  }
  /**
   * Implement Sort in decrease order with using Insertion Sort
   * @param {[]} data
   * @param {String} selector
   * @param {*} value
   * @return {[]}
   */
  sortDecrease(data, selector) {
    return insertionSort(data, selector, -1);
  }
  /**
   * Implement Sort in increase order with using Bubble Sort
   * @param {[]} data
   * @param {String} selector
   * @param {*} value
   * @return {[]}
   */
  sortIncrease(data, selector) {
    return bubbleSort(data, selector);
  }
}

module.exports = IBLSortAndFind;
