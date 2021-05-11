import { NextFunction, Request, Response } from 'express';
import RequestError from '../Classes/Errors/RequestError';
import PostFileDBConnector from '../Classes/PostDBConnector/PostFileDBConnector';
import Post from '../Models/Post';

const postDBConnector = new PostFileDBConnector();

const isPostExist = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
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
