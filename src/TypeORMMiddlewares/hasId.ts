import { NextFunction, Request, Response } from 'express';
import RequestError from '../Classes/Errors/RequestError';
import { ERROR_MESSAGES, STATUS_CODES } from '../Constants';

const hasId = (req: Request, res: Response, next: NextFunction): void => {
  try {
    if (!req.params.id) {
      const error = new RequestError(
        ERROR_MESSAGES.ID_IS_REQUIRED,
        STATUS_CODES.VALIDATION_ERROR,
      );
      throw error;
    }
    return next();
  } catch (err) {
    return next(err);
  }
};

export default hasId;
