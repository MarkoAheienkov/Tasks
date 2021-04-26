const Queue = require('../Queue');

/**
 * Create Node for BST
 */
class Node {
  /**
   * @param {*} content
   * @param {String} selector - which field check
   */
  constructor(content, selector) {
    this.left = null;
    this.right = null;
    this.selector = selector;
    this.content = [content];
  }
  /**
   * Get value from selector
   * @return {*}
   */
  get value() {
    if (!this.selector) {
      return this.content[0];
    }
    const fields = this.selector.split('.');
    const value = fields.reduce((value, field) => {
      let newValue = value[field];
      if (!isNaN(newValue)) {
        newValue = parseInt(newValue);
      }
      return newValue;
    }, this.content[0]);
    return value;
  }
  /**
   * Add content to Node
   * @param {any} content
   */
  addContent(content) {
    this.content.push(...content);
  }
}

/**
 * Create Binary Search Tree
 */
class BST {
  /**
   * @param {String} selector - selector for values
   */
  constructor(selector) {
    this.root = null;
    this.selector = selector;
  }
  /**
   * Insert new value to BST
   * @param {*} content - content of Node
   * @return {BST}
   */
  insert(content) {
    const node = new Node(content, this.selector);
    if (!this.root) {
      this.root = node;
      return this;
    }
    let prev = this.root;
    let next = this.root;
    while (next) {
      prev = next;
      if (next.value > node.value) {
        next = next.left;
      } else if (next.value < node.value) {
        next = next.right;
      } else {
        next = null;
      }
    }
    if (node.value < prev.value) {
      prev.left = node;
    } else if (node.value > prev.value) {
      prev.right = node;
    } else {
      prev.addContent(node.content);
    }
    return this;
  }
  /**
   * Find Value in BST
   * @param {*} value - value of Node
   * @return {BST}
   */
  find(value) {
    if (!this.root) {
      return null;
    }
    let next = this.root;
    while (next) {
      if (next.value > value) {
        next = next.left;
      } else if (next.value < value) {
        next = next.right;
      } else {
        return next.content;
      }
    }
    return null;
  }
  /**
   * Breath First Search for BST
   * @return {[any]} - return array of contents
   */
  breathFirstSearch() {
    const queue = new Queue();
    const visited = [];
    queue.push(this.root);
    while (queue.length > 0) {
      const current = queue.shift();
      if (current.left) {
        queue.push(current.left);
      }
      if (current.right) {
        queue.push(current.right);
      }
      visited.push(current.content);
    }
    return visited.flat();
  }
  /**
   * Depth First Search Pre Order for BST
   * @return {[any]} - return array of contents
   */
  depthFirstSearchPreOrder() {
    const visited = [];
    const current = this.root;
    const helper = (node) => {
      visited.push(node.content);
      if (node.left) {
        helper(node.left);
      }
      if (node.right) {
        helper(node.right);
      }
    };
    helper(current);
    return visited.flat();
  }
  /**
   * Depth First Search Post Order for BST
   * @return {[any]} - return array of contents
   */
  depthFirstSearchPostOrder() {
    const visited = [];
    const current = this.root;
    const helper = (node) => {
      if (node.left) {
        helper(node.left);
      }
      if (node.right) {
        helper(node.right);
      }
      visited.push(node.content);
    };
    helper(current);
    return visited.flat();
  }
  /**
   * Depth First Search In Order for BST
   * @return {[any]} - return array of contents
   */
  depthFirstSearchInOrder() {
    const visited = [];
    const current = this.root;
    const helper = (node) => {
      if (node.left) {
        helper(node.left);
      }
      visited.push(node.content);
      if (node.right) {
        helper(node.right);
      }
    };
    helper(current);
    return visited.flat();
  }
  /**
  * Depth First Search Reverse In Order
  * @return {[any]} - return array of contents
  */
  depthFirstSearchReverseInOrder() {
    const visited = [];
    const current = this.root;
    const helper = (node) => {
      if (node.right) {
        helper(node.right);
      }
      visited.push(node.content);
      if (node.left) {
        helper(node.left);
      }
    };
    helper(current);
    return visited.flat();
  }
}

module.exports = BST;
