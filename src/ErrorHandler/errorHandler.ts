import { NextFunction, Request, Response } from 'express';
import RequestError from '../Classes/Errors/RequestError';

const errorHandler = (
  err: RequestError,
  req: Request,
  res: Response,
  next: NextFunction,
): Response => {
  if (!err.status) {
    err.status = 500;
  }
  const { status } = err;
  return res.status(status).json({
    message: err.message,
  });
};

export default errorHandler;
