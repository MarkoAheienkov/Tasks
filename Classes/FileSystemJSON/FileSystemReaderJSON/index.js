const fs = require('fs/promises');
const {FileSystemReader} = require('../../FileSystem');

/**
 * Create File System Reader for JSON
 *
 */
class FileSystemReaderJSON extends FileSystemReader {
  /**
   * Method for read data from file
   * @param {String} path
   * @return {Promise<[]>}
   */
  static async read(path) {
    const data = await fs.readFile(path, 'utf-8');
    return JSON.parse(data);
  }
}

module.exports = FileSystemReaderJSON;
