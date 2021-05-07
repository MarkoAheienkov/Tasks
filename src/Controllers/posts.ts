import { NextFunction, Request, Response } from 'express';
import RequestError from '../Classes/Errors/RequestError';
import PostFileDBConnector from '../Classes/PostDBConnector/PostFileDBConnector';
import getUser from '../Helpers/getUserFromQuery';
import Admin from '../Models/Admin';
import Post from '../Models/Post';
import User from '../Models/User';

const postFileDBConnector = new PostFileDBConnector();

export const getPosts = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void | Response> => {
  try {
    const postsModels = await Post.getAll(postFileDBConnector);
    const posts = postsModels.map(post => post.toObject());
    return res.json({
      posts,
    });
  } catch (err) {
    return next(err);
  }
};

export const getPostById = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void | Response> => {
  try {
    const { id } = req.params;
    const post = await Post.getById(postFileDBConnector, id);
    if (!post) {
      const error = new RequestError('No such post', 404);
      throw error;
    }
    return res.json(post.toObject());
  } catch (err) {
    return next(err);
  }
};

export const putPost = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void | Response> => {
  try {
    const { id } = req.params;
    const user = await getUser(req);
    const post = await Post.getById(postFileDBConnector, id);
    if (!post) {
      const error = new RequestError('No such post', 404);
      throw error;
    }
    if (!user) {
      const error = new RequestError('Authorization Problem', 401);
      throw error;
    }
    if (!(user instanceof Admin) && !(user.id === post.creator)) {
      const error = new RequestError('Authorization Problem', 401);
      throw error;
    }
    const { title, body } = req.body;
    post.body = body;
    post.title = title;
    await post.save();
    return res.json({ status: 'success' });
  } catch (err) {
    return next(err);
  }
};

export const deletePost = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<Response | void> => {
  try {
    const { id } = req.params;
    const user = await getUser(req);
    const post = await Post.getById(postFileDBConnector, id);
    if (!post) {
      const error = new RequestError('No such post', 404);
      throw error;
    }
    if (!user) {
      const error = new RequestError('Authorization Problem', 401);
      throw error;
    }
    if (!(user instanceof Admin) && !(user.id === post.creator)) {
      const error = new RequestError('Authorization Problem', 401);
      throw error;
    }
    await user.removePost(post.id);
    await post.remove();
    return res.json({ status: 'success' });
  } catch (err) {
    return next(err as RequestError);
  }
};

export const postPost = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<Response | void> => {
  try {
    const { title, body } = req.body;
    const user = await getUser(req);
    if (!user || !(user instanceof User)) {
      const error = new RequestError('Authorization Problem', 401);
      throw error;
    }
    const post = new Post(title, body, user.id, postFileDBConnector);
    await post.save();
    await user.addPost(post.id);
    return res.json({
      status: 'success',
      post: post.toObject(),
    });
  } catch (err) {
    return next(err);
  }
};
