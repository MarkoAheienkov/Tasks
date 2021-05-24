import { ERRORS } from '../Constants';

const isRequestError = (err: Error): boolean => {
  return err.name === ERRORS.REQUEST_ERROR;
};

export default isRequestError;
