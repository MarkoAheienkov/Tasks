/**
 * Create Node for Queue
 */
class Node {
  /**
   * @param {*} value - value for Node
   */
  constructor(value) {
    this.prev = null;
    this.next = null;
    this.value = value;
  }
}

/**
 * Crete Queue
 */
class Queue {
  /** */
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }
  /**
   * Push value to Queue
   * @param {*} value
   * @return {Queue}
   */
  push(value) {
    const node = new Node(value);
    if (!this.head || !this.tail) {
      this.head = node;
      this.tail = node;
      this.length++;
      return this;
    }
    this.tail.next = node;
    this.tail = node;
    this.length++;
    return this;
  }
  /**
   * Shift value from Queue
   * @return {*} - return value from Queue
   */
  shift() {
    if (!this.head) {
      return null;
    }
    const head = this.head;
    this.head = this.head.next;
    this.length--;
    return head.value;
  }
}

module.exports = Queue;
