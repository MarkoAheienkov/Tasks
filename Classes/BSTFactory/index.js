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
   * @param {[]} data - data for populating tree
   */
  createBST(selector, data = []) {
    const candidateBST = this.getBST(selector);
    if (!candidateBST) {
      const bst = new BST(selector);
      this.trees[selector] = bst;
      this._populateTree(selector, data);
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
  /**
   * Populate tree with data from array
   * @param {String} selector - selector for tree
   * @param {[]} arr - array with data
  */
  _populateTree(selector, arr) {
    arr.forEach((data) => {
      this.trees[selector].insert(data);
    });
  }
}

module.exports = BSTFactory;
