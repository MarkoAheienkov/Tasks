import { NextFunction, Request, Response } from 'express';
import CommentFileDBConnector from '../Classes/CommentDBConnector/CommentFileDBConnector';
import RequestError from '../Classes/Errors/RequestError';
import PostFileDBConnector from '../Classes/PostDBConnector/PostFileDBConnector';
import getUser from '../Helpers/getUserFromQuery';
import Admin from '../Models/Admin';
import Comment from '../Models/Comment';
import Post from '../Models/Post';
import User from '../Models/User';

const postFileDBConnector = new PostFileDBConnector();
const commentDBConnector = new CommentFileDBConnector();

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
      const error = new RequestError('Authorization Problem', 401);
      throw error;
    }
    const post = new Post(title, body, user.id, postFileDBConnector);
    await post.save();
    return res.json({
      status: 'success',
      post: post.toObject(),
    });
  } catch (err) {
    return next(err);
  }
};

export const postPostAddComment = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<Response | void> => {
  try {
    const { text } = req.body;
    const { id } = req.params;
    const user = await getUser(req);
    if (!user || !(user instanceof User)) {
      const error = new RequestError('Authorization Problem', 401);
      throw error;
    }
    const post = await Post.getById(postFileDBConnector, id);
    if (!post) {
      const error = new RequestError('No such post', 404);
      throw error;
    }
    const comment = new Comment(text, user.id, commentDBConnector, id);
    await comment.save();
    return res.json({
      status: 'success',
      comment: comment,
    });
  } catch (err) {
    next(err);
  }
};

export const postPostAddReply = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<Response | void> => {
  try {
    const { text } = req.body;
    const { id } = req.params;
    const user = await getUser(req);
    if (!user || !(user instanceof User)) {
      const error = new RequestError('Authorization Problem', 401);
      throw error;
    }
    const comment = await Comment.getById(commentDBConnector, id);
    if (!comment) {
      const error = new RequestError('No such comment', 404);
      throw error;
    }
    const reply = new Comment(text, user.id, commentDBConnector);
    await reply.save();
    return res.json({
      status: 'success',
      comment: reply,
    });
  } catch (err) {
    next(err);
  }
};
