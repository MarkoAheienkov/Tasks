import { NextFunction, Request, Response } from 'express';
import PostDBConnector from '../Classes/PostDBConnector/PostMongoDBConnector';
import getUser from '../Helpers/getUserFromQuery';
import Post from '../Models/Post';
import User from '../Models/User';

export const getPosts = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void | Response> => {
  try {
    const postDBConnector = new PostDBConnector();
    const { search } = req.query;
    let postsModels;
    if (search) {
      postsModels = await Post.getByTitle(postDBConnector, search.toString());
    } else {
      postsModels = await Post.getAll(postDBConnector);
    }
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
    const postDBConnector = new PostDBConnector();
    const { id } = req.params;
    const post = (await Post.getById(postDBConnector, id)) as Post;
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
    const postDBConnector = new PostDBConnector();
    const { id } = req.params;
    const post = (await Post.getById(postDBConnector, id)) as Post;
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
    const postDBConnector = new PostDBConnector();
    const { id } = req.params;
    const post = (await Post.getById(postDBConnector, id)) as Post;
    await post.remove();
    return res.json({ status: 'success' });
  } catch (err) {
    return next(err);
  }
};

export const postPost = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<Response | void> => {
  try {
    const postDBConnector = new PostDBConnector();
    const { title, body } = req.body;
    const user = (await getUser(req)) as User;
    const post = new Post(title, body, user.id, postDBConnector);
    await post.save();
    return res.json({
      status: 'success',
      post: post.toObject(),
    });
  } catch (err) {
    return next(err);
  }
};
