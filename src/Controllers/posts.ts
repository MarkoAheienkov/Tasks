import { NextFunction, Request, Response } from 'express';
import UserFactory from '../Classes/Factories/UserFactory';
import PostFileDBConnector from '../Classes/PostDBConnector/PostFileDBConnector';
import UserFileDBConnector from '../Classes/UserDBConnectors/UserFileDBConnector';
import getUser from '../Helpers/getUserFromQuery';
import Admin from '../Models/Admin';
import Post from '../Models/Post';
import User from '../Models/User';

const postFileDBConnector = new PostFileDBConnector();
const userFileDBConnector = new UserFileDBConnector();
const userFactory = new UserFactory();

export const getPosts = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void | Response> => {
  try {
    const posts = await Post.getAll(postFileDBConnector);
    const admins = await Admin.getAllAdmins(userFileDBConnector, userFactory);
    console.log(admins);
    return res.json({
      posts,
      admins,
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
      const error = new Error('No such post');
      throw error;
    }
    return res.json(post);
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
      const error = new Error('No such post');
      throw error;
    }
    if (!user) {
      const error = new Error('Authorization Problem');
      throw error;
    }
    if (!(user instanceof Admin) && !(user.id === post.creator)) {
      const error = new Error('Authorization Problem');
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
      const error = new Error('No such post');
      throw error;
    }
    if (!user) {
      const error = new Error('Authorization Problem');
      throw error;
    }
    if (!(user instanceof Admin) && !(user.id === post.creator)) {
      const error = new Error('Authorization Problem');
      throw error;
    }
    await user.removeArticle(post.id);
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
    const { title, body } = req.body;
    const user = await getUser(req);
    if (!user || !(user instanceof User)) {
      const error = new Error('Authorization Problem');
      throw error;
    }
    const post = new Post(title, body, user.id, postFileDBConnector);
    await post.save();
    await user.addPost(post.id);
    return res.json({
      status: 'success',
    });
  } catch (err) {
    return next(err);
  }
};
