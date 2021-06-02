import { NextFunction, Request, Response } from 'express';
import constructLocationError from '../../Helpers/constructLocationError';
import getUser from '../../Helpers/getUserFromQueryWithTypeORM';
import typeORMConnect from '../../Connect/typeORMConnect';
import Post from '../../Entities/post';
import { LOCATIONS } from './constants';
import { SUCCESS_MESSAGES } from '../../Constants';

export const getPosts = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void | Response> => {
  try {
    const connection = await typeORMConnect.getConnect();
    const postRepository = connection.getRepository(Post);
    const posts = await postRepository.find();
    return res.status(200).json({
      posts: posts,
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
    const connection = await typeORMConnect.getConnect();
    const postRepository = connection.getRepository(Post);
    const { id } = req.params;
    const post = await postRepository.findOne({
      where: [{ post_id: id }],
    });
    return res.json(post);
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
    const connection = await typeORMConnect.getConnect();
    const postRepository = connection.getRepository(Post);
    const { id } = req.params;
    const { title, body } = req.body;
    const post = await postRepository.findOne({ where: [{ post_id: id }] });
    if (post) {
      post.title = title;
      post.body = body;
      postRepository.save(post);
    }
    return res.json({ status: SUCCESS_MESSAGES.SUCCESS });
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
    const connection = await typeORMConnect.getConnect();
    const postRepository = connection.getRepository(Post);
    const { id } = req.params;
    const post = await postRepository.findOne({ where: [{ post_id: id }] });
    if (post) {
      await postRepository.remove(post);
    }
    return res.json({ status: SUCCESS_MESSAGES.SUCCESS });
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
    const { auth } = req.query;
    const connection = await typeORMConnect.getConnect();
    const postRepository = connection.getRepository(Post);
    const user = await getUser(auth as string);
    const { title, body } = req.body;
    const post = new Post();
    post.title = title;
    post.body = body;
    if (user) {
      post.creator = user;
    }
    await postRepository.save(post);
    return res.json({
      post,
    });
  } catch (err) {
    const locationError = constructLocationError(err, LOCATIONS.POST_POST);
    return next(locationError);
  }
};
