import { ERRORS } from '../../Constants';

class RequestError extends Error {
  status: number | void;
  constructor(message: string, status?: number | void) {
    super(message);
    this.status = status;
    this.message = message || '';
    this.name = ERRORS.REQUEST_ERROR;
  }
}

export default RequestError;
