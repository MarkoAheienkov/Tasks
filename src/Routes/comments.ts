import { Router } from 'express';

import * as commentController from '../TypeORMControllers/comment';

import middleWares from '../TypeORMMiddlewares';

const router = Router();

router.get('/replies/:commentId', commentController.getReplies);

router.get('/:postId', commentController.getComments);

router.post(
  '/replies/:commentId',
  middleWares.isAuth,
  commentController.postReply,
);

router.post(
  '/:postId',
  middleWares.isAuth,
  middleWares.isPostExist,
  commentController.postComment,
);

export default router;
