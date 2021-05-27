import { NextFunction, Request, Response } from 'express';
import RequestError from '../Classes/Errors/RequestError';
import { ERROR_MESSAGES, STATUS_CODES } from '../Constants';
import constructLocationError from '../Helpers/constructLocationError';
import getUser from '../Helpers/getUserFromQueryWithTypeORM';
import isRequestError from '../Helpers/isRequestError';
import { LOCATIONS } from './constants';

export const isUserAuthetificated = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { auth } = req.query;
    const user = await getUser(auth as string);
    if (!user) {
      const error = new RequestError(
        ERROR_MESSAGES.AUTHORIZATION_PROBLEM,
        STATUS_CODES.AUTHORIZATION_PROBLEM,
      );
      throw error;
    }
    next();
  } catch (err) {
    if (isRequestError(err)) {
      next(err);
    } else {
      const locationError = constructLocationError(
        err,
        LOCATIONS.IS_USER_AUTHENFICATION,
      );
      next(locationError);
    }
  }
};

export default isUserAuthetificated;
