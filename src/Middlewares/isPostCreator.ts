import { NextFunction, Request, Response } from 'express';
import RequestError from '../Classes/Errors/RequestError';
import PostDBConnector from '../Classes/PostDBConnector/PostSQLDBConnector';
import getUser from '../Helpers/getUserFromQuery';
import Admin from '../Models/Admin';
import Post from '../Models/Post';
import User from '../Models/User';

const isPostCreator = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const postDBConnector = new PostDBConnector();
    const { id } = req.params;
    const post = (await Post.getById(postDBConnector, id)) as Post;
    const user = (await getUser(req)) as User;
    if (!(user instanceof Admin) && post.creator !== user.id) {
      const error = new RequestError('Authorization Problem', 403);
      throw error;
    }
    next();
  } catch (err) {
    next(err);
  }
};

export default isPostCreator;
