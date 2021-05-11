import { Router } from 'express';

import * as commentController from '../Controllers/comment';

import middleWares from '../Middlewares';

const router = Router();

router.get('/replies/:commentId', commentController.getReplies);

router.get('/:postId', commentController.getComments);

router.post(
  '/:postId',
  middleWares.isUserAuthentification,
  commentController.postComment,
);

router.post(
  '/:commentId',
  middleWares.isUserAuthentification,
  commentController.postReply,
);

export default router;
