const BSTFactory = require('../BSTFactory');
const SortAndFind = require('../SortAndFind');

/**
 * Sort And Find implement with using BST
 */
class BSTSortAndFind extends SortAndFind {
  /**
   */
  constructor() {
    super();
    this.bstFactory = new BSTFactory();
  }
  /**
   * Implement Find with using BST
   * @param {[]} data
   * @param {String} selector
   * @param {*} value
   * @return {[]}
   */
  find(data, selector, value) {
    this.bstFactory.createBST(selector, data);
    const bst = this.bstFactory.getBST(selector);
    return bst.find(value);
  }
  /**
   * Implement Sort in decrease order with using BST
   * @param {[]} data
   * @param {String} selector
   * @param {*} value
   * @return {[]}
   */
  sortDecrease(data, selector) {
    this.bstFactory.createBST(selector, data);
    const bst = this.bstFactory.getBST(selector);
    return bst.depthFirstSearchReverseInOrder();
  }
  /**
   * Implement Sort in increase order with using BST
   * @param {[]} data
   * @param {String} selector
   * @param {*} value
   * @return {[]}
   */
  sortIncrease(data, selector) {
    this.bstFactory.createBST(selector, data);
    const bst = this.bstFactory.getBST(selector);
    return bst.depthFirstSearchInOrder();
  }
}

module.exports = BSTSortAndFind;
