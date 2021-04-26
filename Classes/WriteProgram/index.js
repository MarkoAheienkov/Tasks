const fetch = require('node-fetch');
const {FileSystemWriter} = require('../../Classes/FileSystem');
/**
 * Class for Writing Data from API
 */
class WriteProgram {
  /**
   * @param {String} pathToFile
   * @param {String} url
   * @param {Number} countOfRequests
   * @param {Class<FileSystemWriter>} FileSystemWriter
   * @param {Function} mapResponses - function for transform array of responses
   * @param {String} queryForPages - query to make next page
   */
  constructor(pathToFile, url, countOfRequests, FileSystemWriter, mapResponses, queryForPages) {
    this._pathToFile = pathToFile;
    this._url = url;
    this._countOfRequests = countOfRequests;
    this._FileSystemWriter = FileSystemWriter;
    this._mapResponses = mapResponses;
    this._queryForPages = queryForPages;
  }
  /**
   * Fetching data
   * @param {String} url
   * @return {[*]}
   */
  async _fetchData(url) {
    const res = await fetch(url);
    const data = await res.json();
    return data;
  }
  /**
   * Create url with adding query
   * @param {String} page
   * @return {String}
   */
  _createUrl(page) {
    return `${this._url}&${this._queryForPages}=${page}`;
  }
  /**
   * Get data from API
   * @return {[*]}
   */
  async _getDataFromAPI() {
    const dataPromises = [];
    for (let i = 1; i <= this._countOfRequests; i++) {
      dataPromises.push(
          this._fetchData(this._createUrl(i)),
      );
    }
    const responces = await Promise.all(dataPromises);
    return responces;
  }
  /**
   * @param {[*]} data
   */
  async _writeData(data) {
    await this._FileSystemWriter.write(this._pathToFile, data);
  }
  /** */
  async main() {
    const responces = await this._getDataFromAPI(this._countOfRequests, this._url);
    const data = this._mapResponses(responces);
    await this._writeData(data);
  }
}

module.exports = WriteProgram;
