import { NextFunction, Request, Response } from 'express';
import RequestError from '../Classes/Errors/RequestError';
import getUser from '../Helpers/getUserFromQuery';
import Admin from '../Models/Admin';

const isAdminAuthetificated = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const user = await getUser(req);
    if (!(user instanceof Admin)) {
      const error = new RequestError('Authorization Problem', 403);
      throw error;
    }
    next();
  } catch (err) {
    next(err);
  }
};

export default isAdminAuthetificated;
