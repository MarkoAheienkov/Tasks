import { NextFunction, Request, Response } from 'express';

export const getPosts = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void | Response> => {
  try {
    return res.json();
  } catch (err) {
    next(err);
  }
};

export const getPostById = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void | Response> => {
  try {
    return res.json();
  } catch (err) {
    next(err);
  }
};

export const putPost = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void | Response> => {
  try {
    return res.json();
  } catch (err) {
    next(err);
  }
};

export const deletePost = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    return res.json();
  } catch (err) {
    next(err);
  }
};

export const postPost = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    return res.json();
  } catch (err) {
    next(err);
  }
};
