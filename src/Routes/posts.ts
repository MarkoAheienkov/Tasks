import { Router } from 'express';

import * as postController from '../TypeORMControllers/post';

import middleWares from '../TypeORMMiddlewares';

const router = Router();

router.get('/', postController.getPosts);

router.get('/:id', postController.getPostById);

router.post('/', middleWares.isAuth, postController.postPost);

router.put(
  '/:id',
  middleWares.isAuth,
  middleWares.isPostCreator,
  postController.putPost,
);

router.delete(
  '/:id',
  middleWares.isAuth,
  middleWares.isPostCreator,
  postController.deletePost,
);

export default router;
