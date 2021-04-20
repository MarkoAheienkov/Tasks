const {FileSystemAppender} = require('../../FileSystem');

/**
 * Create File System Appender for JSON
 *
 */
class FileSystemAppenderJSON extends FileSystemAppender {
  /**
   * Method for appending data to file
   * @param {String} path
   * @param {[*]} data
   */
  static async append(path, data) {
  }
}

module.exports = FileSystemAppenderJSON;
