import { Router } from 'express';

import * as postController from '../Controllers/post';

import middleWares from '../Middlewares';

const router = Router();

router.get('/', postController.getPosts);

router.get('/:id', postController.getPostById);

router.post('/', middleWares.isUserAuthentification, postController.postPost);

router.put(
  '/:id',
  middleWares.isUserAuthentification,
  middleWares.isPostCreator,
  postController.putPost,
);

router.delete(
  '/:id',
  middleWares.isUserAuthentification,
  middleWares.isPostCreator,
  postController.deletePost,
);

export default router;
