const logger = require('node-color-log');
/**
 * Class Logger to log data
 */
class Logger {
  /**
   * Log data
   * @param {*} data
   */
  log(data) {
    if (data) {
      console.log(data);
    }
  }
  /**
   * Log Error Text
   * @param {String} errorText
   */
  logError(errorText) {
    if (errorText) {
      logger.color('red').log(errorText);
    }
  }
  /**
   * Log data in Primary color
   * @param {*} data
  */
  logPrimary(data) {
    if (data) {
      logger.color('cyan').log(data);
    }
  }
}

module.exports = Logger;
