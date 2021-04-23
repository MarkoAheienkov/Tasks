/**
 * Create File System Writer
 *
 */
class FileSystemWriter {
  /**
   * Method for write data to file
   * @param {String} path
   * @param {[*]} data
   */
  static async write(path, data) {
    throw new Error('Method write(path, data) must be implemented');
  }
}

module.exports = FileSystemWriter;
