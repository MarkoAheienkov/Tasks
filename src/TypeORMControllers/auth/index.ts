import { NextFunction, Request, Response } from 'express';
import { SUCCESS_MESSAGES } from '../../Constants';
import constructLocationError from '../../Helpers/constructLocationError';
import { LOCATIONS } from './constants';

export const signUp = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<Response | void> => {
  try {
    return res.json({
      message: SUCCESS_MESSAGES.SUCCESS,
    });
  } catch (err) {
    const locationError = constructLocationError(err, LOCATIONS.SIGN_UP);
    return next(locationError);
  }
};
