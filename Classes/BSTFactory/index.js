const BST = require('../BST');

/**
 * create BST factory
 */
class BSTFactory {
  /** */
  constructor() {
    this.trees = {};
  }
  /**
   * Create BST
   * @param {String} selector - selector for BST
   */
  createBST(selector) {
    const candidateBST = this.getBST(selector);
    if (!candidateBST) {
      const bst = new BST(selector);
      this.trees[selector] = bst;
    }
  }
  /**
   * Return BST by selector
   * @param {String} selector - selector for BST
   * @return {BST}
   */
  getBST(selector) {
    return this.trees[selector];
  }
}

module.exports = BSTFactory;
