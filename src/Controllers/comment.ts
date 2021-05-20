import { NextFunction, Request, Response } from 'express';
// import CommentFileDBConnector from '../Classes/CommentDBConnector/CommentFileDBConnector';
import CommentDBConnector from '../Classes/CommentDBConnector/CommentSQLDBConnector';
import getUser from '../Helpers/getUserFromQuery';
import Comment from '../Models/Comment';
import User from '../Models/User';

export const postComment = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<Response | void> => {
  try {
    const commentDBConnector = new CommentDBConnector();
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
    const commentDBConnector = new CommentDBConnector();
    const user = (await getUser(req)) as User;
    const { text, postId } = req.body;
    const { commentId } = req.params;
    const reply = new Comment(
      text,
      user.id,
      commentDBConnector,
      postId,
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
    const commentDBConnector = new CommentDBConnector();
    const { postId } = req.params;
    const commentModels = await Comment.getPostComments(
      commentDBConnector,
      postId,
    );
    const comments = commentModels.map(model => model.toObject());
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
    const commentDBConnector = new CommentDBConnector();
    const { commentId } = req.params;
    const replieModels = await Comment.getCommentReplies(
      commentDBConnector,
      commentId,
    );
    const replies = replieModels.map(model => model.toObject());
    return res.json({ replies });
  } catch (err) {
    next(err);
  }
};
