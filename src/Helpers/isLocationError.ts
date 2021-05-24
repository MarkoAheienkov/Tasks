import { ERRORS } from '../Constants';

const isLocationError = (err: Error): boolean => {
  return err.name === ERRORS.SERVER_ERROR;
};

export default isLocationError;
