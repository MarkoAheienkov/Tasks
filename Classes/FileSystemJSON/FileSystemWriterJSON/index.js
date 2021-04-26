const fs = require('fs/promises');

const {FileSystemWriter} = require('../../FileSystem');

/**
 * Create File System Reader for JSON
 *
 */
class FileSystemWriterJSON extends FileSystemWriter {
  /**
   * Method for write data to file
   * @param {String} path
   * @param {[*]} data
   */
  static async write(path, data) {
    let newData = data;
    if (!(data instanceof Array)) {
      newData = [data];
    }
    const jsonData = JSON.stringify(newData);
    await fs.writeFile(path, jsonData);
  }
}

module.exports = FileSystemWriterJSON;
