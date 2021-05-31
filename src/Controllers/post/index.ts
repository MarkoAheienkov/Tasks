import { NextFunction, Request, Response } from 'express';
import PostDBConnector from '../../Classes/PostDBConnector/PostSQLDBConnector';
import constructLocationError from '../../Helpers/constructLocationError';
import getUser from '../../Helpers/getUserFromQuery';
import PostRepository from '../../Repositories/Post';
import UserRepository from '../../Repositories/User';
import { LOCATIONS } from './constants';

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
      postsModels = await PostRepository.getByTitle(
        postDBConnector,
        search.toString(),
      );
    } else {
      postsModels = await PostRepository.getAll(postDBConnector);
    }
    const posts = postsModels.map(post => post.toObject());
    return res.json({
      posts,
    });
  } catch (err) {
    const locationError = constructLocationError(err, LOCATIONS.GET_POSTS);
    return next(locationError);
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
    const post = (await PostRepository.getById(
      postDBConnector,
      id,
    )) as PostRepository;
    return res.json(post.toObject());
  } catch (err) {
    const locationError = constructLocationError(err, LOCATIONS.GET_POST_BY_ID);
    return next(locationError);
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
    const post = (await PostRepository.getById(
      postDBConnector,
      id,
    )) as PostRepository;
    const { title, body } = req.body;
    post.body = body;
    post.title = title;
    await post.save();
    return res.json({ status: 'success' });
  } catch (err) {
    const locationError = constructLocationError(err, LOCATIONS.PUT_POST);
    return next(locationError);
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
    const post = (await PostRepository.getById(
      postDBConnector,
      id,
    )) as PostRepository;
    await post.remove();
    return res.json({ status: 'success' });
  } catch (err) {
    const locationError = constructLocationError(err, LOCATIONS.DELETE_POST);
    return next(locationError);
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
    const { auth } = req.query;
    const user = (await getUser(auth as string)) as UserRepository;
    const post = new PostRepository(title, body, user.id, postDBConnector);
    await post.save();
    return res.json({
      status: 'success',
      post: post.toObject(),
    });
  } catch (err) {
    const locationError = constructLocationError(err, LOCATIONS.POST_POST);
    return next(locationError);
  }
};
