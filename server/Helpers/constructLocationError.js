const LocationError = require('../Errors/locationError');

const constructLocationError = (err, location) => {
  let locationError;
  if (err.location) {
    locationError = err;
    locationError.location += `->${location}`;
  } else {
    locationError = new LocationError(err, location);
  }
  return locationError;
};

module.exports.constructLocationError = constructLocationError;