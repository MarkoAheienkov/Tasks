import { NextFunction, Request, Response } from 'express';
import RequestError from '../Classes/Errors/RequestError';
import PostDBConnector from '../Classes/PostDBConnector/PostSQLDBConnector';
import Post from '../Models/Post';

const isPostExist = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const postDBConnector = new PostDBConnector();
    const { id } = req.params;
    const post = await Post.getById(postDBConnector, id);
    if (!post) {
      const error = new RequestError('No such post', 404);
      throw error;
    }
    next();
  } catch (err) {
    next(err);
  }
};

export default isPostExist;
