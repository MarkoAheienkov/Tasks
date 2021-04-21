/**
 * @abstract
 * Sort and find creator
 */
class SortAndFind {
  /**
   * Find value
   * @param {[]} data
   * @param {String} selector - selector
   * @param {*} value - value, which you want find
   * @return {[]}
   */
  find(data, selector, value) {
    return [];
  }
  /**
   * Sort value increase by selector
   * @param {[]} data
   * @param {String} selector
   * @return {[]}
   */
  sortIncrease(data, selector) {
    return [];
  }
  /**
   * Sort value decrease by selector
   * @param {[]} data
   * @param {String} selector
   * @return {[]}
   */
  sortDecrease(data, selector) {
    return [];
  }
}

module.exports = SortAndFind;
