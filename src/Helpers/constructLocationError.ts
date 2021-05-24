import LocationError from '../Classes/Errors/LoactionError';

const constructLocationError = (
  err: Error,
  location: string,
): LocationError => {
  let locationError;
  if ((err as LocationError).location) {
    locationError = err as LocationError;
    locationError.location += `->${location}`;
  } else {
    locationError = new LocationError(err, location);
  }
  return locationError;
};

export default constructLocationError;
