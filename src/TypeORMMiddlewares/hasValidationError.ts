import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { STATUS_CODES } from '../Constants';
import constructLocationError from '../Helpers/constructLocationError';
import isRequestError from '../Helpers/isRequestError';
import { LOCATIONS } from './constants';

const hasValidationError = (
  req: Request,
  res: Response,
  next: NextFunction,
): void | Response => {
  try {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(STATUS_CODES.VALIDATION_ERROR).json({
        errors: result.array(),
      });
    }
    return next();
  } catch (err) {
    if (isRequestError(err)) {
      next(err);
    } else {
      const locationError = constructLocationError(
        err,
        LOCATIONS.HAS_VALIDATIONS_ERROR,
      );
      next(locationError);
    }
  }
};

export default hasValidationError;
