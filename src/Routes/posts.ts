import { Router } from 'express';

import * as postController from '../Controllers/posts';

const router = Router();

router.get('/', postController.getPosts);

router.get('/:id', postController.getPostById);

router.post('/', postController.postPost);

router.put('/:id', postController.putPost);

router.delete('/:id', postController.deletePost);

export default router;
