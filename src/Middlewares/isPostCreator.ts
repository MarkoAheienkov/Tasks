import { NextFunction, Request, Response } from 'express';
import RequestError from '../Classes/Errors/RequestError';
import PostFileDBConnector from '../Classes/PostDBConnector/PostFileDBConnector';
import getUser from '../Helpers/getUserFromQuery';
import Admin from '../Models/Admin';
import Post from '../Models/Post';

const postFileDBConnector = new PostFileDBConnector();

const isPostCreator = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { id } = req.params;
    const post = (await Post.getById(postFileDBConnector, id)) as Post;
    const user = await getUser(req);
    if (!(user instanceof Admin) || post.creator === user.id) {
      const error = new RequestError('Authorization Problem', 403);
      throw error;
    }
    next();
  } catch (err) {
    next(err);
  }
};

export default isPostCreator;
