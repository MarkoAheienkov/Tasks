const logger = require('node-color-log');

const BSTFactory = require('../BSTFactory');
const {FileSystemReader} = require('../FileSystemJSON');

/**
 * Class for create Program
 */
class Program {
  /**
   * @param {String} pathToFile - path to file from which read data
  */
  constructor(pathToFile) {
    this.data = [];
    this.onLine = this.onLine.bind(this);
    this.bstFactory = new BSTFactory();
    this.options = {
      show: this.showOption.bind(this),
      find: this.findOption.bind(this),
      sort: this.sortedOption.bind(this),
      help: this.logOptions.bind(this),
    };
    this.pathToFile = pathToFile;
  }
  /**
   * @return {Promise<[]>}
   */
  async getData() {
    return await FileSystemReader.read(this.pathToFile);
  }
  /**
   * Log options
   */
  logOptions() {
    logger.color('cyan').log('Options:');
    logger.color('cyan').log(`
option=help - show all operations

option=show - show first 100 records
option=show limit=1 - show first record
option=show all=true - show all records

option=find selector=s value=v - find first 100 records with value=v
option=find selector=s value=v limit=1 - find first record with value=v
option=find selector=s value=v all=true - find all records with value=v

option=sort selector=s - show first 100 records sorted by selector
option=sort selector=s limit=1 - show first record in sorted array
option=sort selector=s all=true - show all records sorted by selector
option=sort selector=s order=1 - show sorted array in increase order
option=sort selector=s order=-1 - show sorted array in decrease order
        `);
  }
  /**
   * Log error
   * @param {String} errorText - error text
   */
  logError(errorText) {
    logger.color('red').log(errorText);
    logger
        .color('cyan')
        .log('Write: option=help for get more info about program');
  }
  /**
   * Main function
   */
  async main() {
    this.data = await this.getData();
    this.onLine();
  }
  /**
   * Event listener for readLine
   */
  onLine() {
    const option = this.getOptionFromInput();
    this.callOption(option);
  }
  /**
   * @return {String}
   */
  getOptionFromInput() {
    const option = process.env.option;
    return option;
  }

  /**
   * @param {String} option - option
   * @return {void}
   */
  callOption(option) {
    if (!this.options[option]) {
      this.logError(`No such option like: '${option}'`);
      return;
    }
    this.options[option]();
  }
  /**
   * Show options
   */
  showOption() {
    const {limit, all} = process.env;
    if (all) {
      this.showAll(this.data);
    } else if (this.data) {
      this.show(this.data, limit);
    } else {
      this.show(this.data);
    }
  }
  /**
   * Show all records
   * @param {[]} data - data to show
   */
  showAll(data) {
    for (let i = 0; i < data.length; i++) {
      console.log(this.data[i]);
    }
  }
  /**
   * Show records
   * @param {[]} data - data which will log
   * @param {Nubmer} limit - limit of records to show
   */
  show(data, limit = 100) {
    if (isNaN(limit)) {
      this.logError(`Limit must be a number`);
      return;
    }
    for (let i = 0; i < limit; i++) {
      console.log(data[i]);
    }
  }
  /**
   * Find options
   */
  findOption() {
    const {selector, value, limit, all} = process.env;
    if (!selector || !value) {
      this.logError(`Paramters: value and selector are required for find!`);
      return;
    }
    const data = this.findBySelector(selector, value);
    if (all) {
      this.showAll(data);
    } else {
      this.show(data, limit);
    }
  }
  /**
   * @param {String} selector
   * @param {String} value
   * @return {[]} - data with finding value
   */
  findBySelector(selector, value) {
    this.bstFactory.createBST(selector, this.data);
    const bst = this.bstFactory.getBST(selector);
    const data = bst.find(value);
    return data;
  }
  /**
   * Sorted options
   */
  sortedOption() {
    const {selector, limit, all, order} = process.env;
    if (!selector) {
      this.logError(`Paramter: selector is required for sorted!`);
      return;
    }
    const data = this.sortDataBySelector(selector, order);
    if (all) {
      this.showAll(data);
    } else {
      this.show(data, limit);
    }
  }
  /**
   * @param {String} selector - selector by which sort
   * @param {Number} order - order 1 - increase, -1 - decrease
   * @return {[]} - data sorted by selector
   */
  sortDataBySelector(selector, order = 1) {
    this.bstFactory.createBST(selector, this.data);
    const bst = this.bstFactory.getBST(selector);
    order = parseInt(order);
    let data;
    if (order === 1) {
      data = bst.depthFirstSearchInOrder();
    } else if (order === -1) {
      data = bst.depthFirstSearchReverseInOrder();
    } else {
      this.logError('Order must be equal to 1 or -1');
      return;
    }
    return data;
  }
}

module.exports = Program;
