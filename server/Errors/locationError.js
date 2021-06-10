const { ERRORS } = require('../Constants');

class LocationError extends Error {
  constructor(err, location) {
    super(err.message);
    this.location = location;
    this.name = ERRORS.SERVER_ERROR;
    this.stack = err.stack;
    this.message = err.message;
  }
}

module.exports = LocationError;