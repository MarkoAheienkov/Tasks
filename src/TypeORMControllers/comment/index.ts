import { NextFunction, Request, Response } from 'express';
import constructLocationError from '../../Helpers/constructLocationError';
import getUser from '../../Helpers/getUserFromQueryWithTypeORM';
import typeORMConnect from '../../Connect/typeORMConnect';
import { LOCATIONS } from './constants';
import Comments from '../../Entities/comment';
import { SUCCESS_MESSAGES } from '../../Constants';
import Replies from '../../Entities/reply';
import Posts from '../../Entities/post';

export const postComment = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<Response | void> => {
  try {
    const { text } = req.body;
    const { postId } = req.params;
    const { auth } = req.query;
    const connection = await typeORMConnect.getConnect();
    const commentRepository = await connection.getRepository(Comments);
    const postConnector = await connection.getRepository(Posts);
    const post = await postConnector.findOne({ where: [{ post_id: postId }] });
    const user = await getUser(auth as string);
    const comment = new Comments();
    comment.text = text;
    comment.post_id = post;
    comment.is_reply = false;
    if (user) {
      comment.creator = user;
    }
    await commentRepository.save(comment);
    return res.json({ status: SUCCESS_MESSAGES.SUCCESS, comment });
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
    const { auth } = req.query;
    const { text, postId } = req.body;
    const { commentId } = req.params;
    const connection = await typeORMConnect.getConnect();
    const user = await getUser(auth as string);
    const postRepository = connection.getRepository(Posts);
    const post = await postRepository.findOne({
      where: [{ post_id: postId }],
    });
    const comment = new Comments();
    comment.text = text;
    comment.is_reply = true;
    comment.post_id = post;
    if (user) {
      comment.creator = user;
    }
    connection.transaction(async manager => {
      const commentRepository = manager.getRepository(Comments);
      const replyRepository = manager.getRepository(Replies);
      await commentRepository.save(comment);
      const reply = new Replies();
      reply.comment_id = Number(commentId);
      reply.reply_id = comment;
      await replyRepository.save(reply);
    });
    return res.json({ status: SUCCESS_MESSAGES.SUCCESS });
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
    const connection = await typeORMConnect.getConnect();
    const commentRepository = connection.getRepository(Comments);
    const { postId } = req.params;
    const comments = await commentRepository.find({
      where: [{ post_id: postId, is_reply: false }],
    });
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
    const connection = await typeORMConnect.getConnect();
    const commentsRepository = connection.getRepository(Comments);
    const { commentId } = req.params;
    const comment = await commentsRepository.findOne({
      relations: ['replies', 'replies.reply_id'],
      where: [{ comment_id: commentId }],
    });
    const replies = comment?.replies?.map(comment => {
      return { ...comment.reply_id };
    });
    return res.json({ replies: replies });
  } catch (err) {
    const locationError = constructLocationError(err, LOCATIONS.GET_REPLIES);
    next(locationError);
  }
};
