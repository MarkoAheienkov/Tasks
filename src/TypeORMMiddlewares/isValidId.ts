import { NextFunction, Request, Response } from 'express';
import RequestError from '../Classes/Errors/RequestError';
import { ERROR_MESSAGES, STATUS_CODES } from '../Constants';

const isValidId = (req: Request, res: Response, next: NextFunction): void => {
  const { id } = req.params;
  if (isNaN(Number(id))) {
    const reqErr = new RequestError(
      ERROR_MESSAGES.ID_SI_NOT_VALID,
      STATUS_CODES.VALIDATION_ERROR,
    );
    return next(reqErr);
  }
  return next();
};

export default isValidId;
