import { Router } from 'express';

import * as postController from '../TypeORMControllers/post';

import middleWares from '../TypeORMMiddlewares';

const router = Router();

router.post('/sign-in');

router.post('/sign-up');

router.post('/log-out');

export default router;
