import LocationError from '../Classes/Errors/LoactionError';

const createErrorMessage = (err: LocationError): string => {
  return `
  Error name:
    ${err.name}
  Error location:
    ${err.location}
  Error message:
    ${err.message}
  Error Stack:
    ${err.stack}`;
};

export default createErrorMessage;
