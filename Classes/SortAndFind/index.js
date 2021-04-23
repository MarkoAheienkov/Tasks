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
   */
  find(data, selector, value) {
    throw new Error('Method find(data, selector, value) must be implemented');
  }
  /**
   * Sort value increase by selector
   * @param {[]} data
   * @param {String} selector
   */
  sortIncrease(data, selector) {
    throw new Error('Method sortIncrease(data, selector) must be implemented');
  }
  /**
   * Sort value decrease by selector
   * @param {[]} data
   * @param {String} selector
   */
  sortDecrease(data, selector) {
    throw new Error('Method sortDecrease(data, selector) must be implemented');
  }
}

module.exports = SortAndFind;
