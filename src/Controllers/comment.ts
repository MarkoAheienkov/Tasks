import { NextFunction, Request, Response } from 'express';
import CommentFileDBConnector from '../Classes/CommentDBConnector/CommentFileDBConnector';
import getUser from '../Helpers/getUserFromQuery';
import Comment from '../Models/Comment';
import User from '../Models/User';

const commentDBConnector = new CommentFileDBConnector();

export const postComment = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<Response | void> => {
  try {
    const user = (await getUser(req)) as User;
    const { text } = req.body;
    const { postId } = req.params;
    const comment = new Comment(text, user.id, commentDBConnector, postId);
    await comment.save();
    return res.json({ status: 'Success' });
  } catch (err) {
    next(err);
  }
};

export const postReply = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<Response | void> => {
  try {
    const user = (await getUser(req)) as User;
    const { text } = req.body;
    const { commentId } = req.params;
    const reply = new Comment(
      text,
      user.id,
      commentDBConnector,
      undefined,
      commentId,
    );
    await reply.save();
    return res.json({ status: 'Success' });
  } catch (err) {
    next(err);
  }
};

export const getComments = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<Response | void> => {
  try {
    const { postId } = req.params;
    const comments = await Comment.getPostComments(commentDBConnector, postId);
    return res.json({ comments });
  } catch (err) {
    next(err);
  }
};

export const getReplies = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<Response | void> => {
  try {
    const { commentId } = req.params;
    const replies = await Comment.getCommentReplies(
      commentDBConnector,
      commentId,
    );
    return res.json({ replies });
  } catch (err) {
    next(err);
  }
};
