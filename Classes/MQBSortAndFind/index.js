const {binarySearch} = require('../../Searching');
const {mergeSort, quickSort} = require('../../Sorting');
const SortAndFind = require('../SortAndFind');

/**
 * Sort And Find implement with using Qucik Sort,
 * Merge Sort and Binary Search
 */
class MQBSortAndFind extends SortAndFind {
  /**
   * Implement Find with using Binary Search
   * @param {[]} data
   * @param {String} selector
   * @param {*} value
   * @return {[]}
   */
  find(data, selector, value) {
    const sortData = this.sortIncrease(data, selector);
    const searchValue = binarySearch(sortData, value, selector);
    return [searchValue];
  }
  /**
   * Implement Sort in decrease order with using Merge Sort
   * @param {[]} data
   * @param {String} selector
   * @param {*} value
   * @return {[]}
   */
  sortDecrease(data, selector) {
    return mergeSort(data, selector, -1);
  }
  /**
   * Implement Sort in increase order with using Quick Sort
   * @param {[]} data
   * @param {String} selector
   * @param {*} value
   * @return {[]}
   */
  sortIncrease(data, selector) {
    return quickSort(data, selector);
  }
}

module.exports = MQBSortAndFind;
