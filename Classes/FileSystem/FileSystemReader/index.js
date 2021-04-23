/**
 * Create File System Reader
 *
 */
class FileSystemReader {
  /**
   * Method for read datafrom file
   * @param {String} path
   * @return {Promise<[]>}
   */
  static async read(path) {
    throw new Error('Method read(path) must be implemented');
  }
}

module.exports = FileSystemReader;
