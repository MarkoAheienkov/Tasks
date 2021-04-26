const {FileSystemReader} = require('../FileSystem');
const Logger = require('../Logger');
const SortAndFind = require('../SortAndFind');

/**
 * Class for create Program
 */
class Program {
  /**
   * @param {String} pathToFile - path to file from which read data
   * @param {SortAndFind} sortAndFind - sort and find data
   * @param {Logger} logger - log data
   * @param {Class<FileSystemReader>} FileSystemReader - file system reader
  */
  constructor(pathToFile, sortAndFind, logger, FileSystemReader) {
    this._data = [];
    this._options = {
      show: this._showOption.bind(this),
      find: this._findOption.bind(this),
      sort: this._sortOption.bind(this),
      help: this._logOption.bind(this),
    };
    this._sortAndFind = sortAndFind;
    this._logger = logger;
    this._pathToFile = pathToFile;
    this._FileSystemReader = FileSystemReader;
  }
  /**
   * @return {Promise<[]>}
   */
  async _getData() {
    return await this._FileSystemReader.read(this._pathToFile);
  }
  /**
   * Log options
   */
  _logOption() {
    this._logger.logPrimary('Options:');
    this._logger.logPrimary(`
      option=help - show all operations

      option=show - show first 100 records
      option=show limit=1 - show first record
      option=show all=true - show all records
      option=show page=2 - show next 100 records

      option=find selector=s value=v - find first 100 records with value=v
      option=find selector=s value=v limit=1 - find first record with value=v
      option=find selector=s value=v all=true - find all records with value=v
      option=find selector=s value=v page=2 - find next 100 records with value=v

      option=sort selector=s - show first 100 records sorted by selector
      option=sort selector=s limit=1 - show first record in sorted array
      option=sort selector=s all=true - show all records sorted by selector
      option=sort selector=s order=1 - show sorted array in increase order
      option=sort selector=s order=-1 - show sorted array in decrease order
      option=sort selector=s page=2 - show next 100 sorted records
    `);
  }
  /**
   * Main function
   */
  async main() {
    this._data = await this._getData();
    this._processData();
  }
  /**
   * Process data
   */
  _processData() {
    const option = this._getOptionFromInput();
    this._callOption(option);
  }
  /**
   * @return {String}
   */
  _getOptionFromInput() {
    const option = process.env.option;
    return option;
  }

  /**
   * @param {String} option - option
   * @return {void}
   */
  _callOption(option) {
    if (!this._options[option]) {
      this._logger.logError(`No such option like: '${option}'`);
      this._logger.log('Write option=help - to gel list of all options');
      return;
    }
    this._options[option]();
  }
  /**
   * Show options
   */
  _showOption() {
    const {limit, all, page} = process.env;
    if (all) {
      this._showAll(this._data);
    } else {
      this._show(this._data, limit, page);
    }
  }
  /**
   * Show all records
   * @param {[]} data - data to show
   */
  _showAll(data) {
    for (let i = 0; i < data.length; i++) {
      this._logger.log(data[i]);
    }
  }
  /**
   * Show records
   * @param {[]} data - data which will log
   * @param {Nubmer} limit - limit of records to show
   * @param {Number} page - page of records to show
   */
  _show(data, limit = 100, page = 1) {
    if (isNaN(limit)) {
      this._logger.logError(`Limit must be a number`);
      return;
    }
    if (isNaN(page)) {
      this._logger.logError(`Page must be a number`);
      return;
    }
    const from = limit*(page-1);
    const to = limit*page;
    for (let i = from; i < to; i++) {
      this._logger.log(data[i]);
    }
  }
  /**
   * Find options
   */
  _findOption() {
    const {selector, value, limit, all, page} = process.env;
    if (!selector || !value) {
      this._logger.logError(`Paramters: value and selector are required for find!`);
      return;
    }
    const data = this._findBySelector(selector, value);
    if (all) {
      this._showAll(data);
    } else {
      this._show(data, limit, page);
    }
  }
  /**
   * @param {String} selector
   * @param {String} value
   * @return {[]} - data with finding value
   */
  _findBySelector(selector, value) {
    return this._sortAndFind.find(this._data, selector, value);
  }
  /**
   * Sort options
   */
  _sortOption() {
    const {selector, limit, all, order, page} = process.env;
    if (!selector) {
      this._logger.logError(`Paramter: selector is required for sorted!`);
      return;
    }
    const data = this._sortDataBySelector(selector, order);
    if (all) {
      this._showAll(data);
    } else {
      this._show(data, limit, page);
    }
  }
  /**
   * @param {String} selector - selector by which sort
   * @param {Number} order - order 1 - increase, -1 - decrease
   * @return {[]} - data sorted by selector
   */
  _sortDataBySelector(selector, order = 1) {
    order = parseInt(order);
    let data;
    if (order === 1) {
      data = this._sortAndFind.sortIncrease(this._data, selector);
    } else if (order === -1) {
      data = this._sortAndFind.sortDecrease(this._data, selector);
    } else {
      this._logger.logError('Order must be equal to 1 or -1');
      return;
    }
    return data;
  }
}

module.exports = Program;
