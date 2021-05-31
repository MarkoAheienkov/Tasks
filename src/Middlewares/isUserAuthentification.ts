import { NextFunction, Request, Response } from 'express';
import RequestError from '../Classes/Errors/RequestError';
import getUser from '../Helpers/getUserFromQuery';
import User from '../Models/User';

export const isUserAuthetificated = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const user = await getUser(req);
    if (!user || !(user instanceof User)) {
      const error = new RequestError('Authorization Problem', 403);
      throw error;
    }
    next();
  } catch (err) {
    next(err);
  }
};

export default isUserAuthetificated;
