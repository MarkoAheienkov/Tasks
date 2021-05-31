import { NextFunction, Request, Response } from 'express';
import CommentDBConnector from '../../Classes/CommentDBConnector/CommentSQLDBConnector';
import constructLocationError from '../../Helpers/constructLocationError';
import getUser from '../../Helpers/getUserFromQuery';
import CommentRepository from '../../Repositories/Comment';
import UserRepository from '../../Repositories/User';
import { LOCATIONS } from './constants';

export const postComment = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<Response | void> => {
  try {
    const commentDBConnector = new CommentDBConnector();
    const { auth } = req.query;
    const user = (await getUser(auth as string)) as UserRepository;
    const { text } = req.body;
    const { postId } = req.params;
    const comment = new CommentRepository(
      text,
      user.id,
      commentDBConnector,
      postId,
    );
    await comment.save();
    return res.json({ status: 'Success' });
  } catch (err) {
    const locationError = constructLocationError(err, LOCATIONS.POST_COMMENT);
    next(locationError);
  }
};

export const postReply = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<Response | void> => {
  try {
    const commentDBConnector = new CommentDBConnector();
    const { auth } = req.query;
    const user = (await getUser(auth as string)) as UserRepository;
    const { text } = req.body;
    const { commentId } = req.params;
    const reply = new CommentRepository(
      text,
      user.id,
      commentDBConnector,
      undefined,
      commentId,
    );
    await reply.save();
    return res.json({ status: 'Success' });
  } catch (err) {
    const locationError = constructLocationError(err, LOCATIONS.POST_REPLY);
    next(locationError);
  }
};

export const getComments = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<Response | void> => {
  try {
    const commentDBConnector = new CommentDBConnector();
    const { postId } = req.params;
    const commentModels = await CommentRepository.getPostComments(
      commentDBConnector,
      postId,
    );
    const comments = commentModels.map(model => model.toObject());
    return res.json({ comments });
  } catch (err) {
    const locationError = constructLocationError(err, LOCATIONS.GET_COMMENTS);
    next(locationError);
  }
};

export const getReplies = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<Response | void> => {
  try {
    const commentDBConnector = new CommentDBConnector();
    const { commentId } = req.params;
    const replieModels = await CommentRepository.getCommentReplies(
      commentDBConnector,
      commentId,
    );
    const replies = replieModels.map(model => model.toObject());
    return res.json({ replies });
  } catch (err) {
    const locationError = constructLocationError(err, LOCATIONS.GET_REPLIES);
    next(locationError);
  }
};
