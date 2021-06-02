import { NextFunction, Request, Response } from 'express';
import isRequestError from '../Helpers/isRequestError';
import RequestError from '../Classes/Errors/RequestError';
import { ERROR_MESSAGES, STATUS_CODES } from '../Constants';
import serverErrorLogger from '../Logger/ServerErrorLogger';
import createErrorMessage from '../Helpers/createErrorMessage';
import LocationError from '../Classes/Errors/LoactionError';

const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
): Response => {
  if (isRequestError(err)) {
    const { status = 400 } = err as RequestError;
    return res.status(status).json({
      message: err.message,
    });
  } else {
    serverErrorLogger.log({
      level: 'error',
      message: createErrorMessage(err as LocationError),
    });
    return res.status(STATUS_CODES.SERVER_ERROR).json({
      message: ERROR_MESSAGES.SERVER_ERROR,
    });
  }
};

export default errorHandler;
