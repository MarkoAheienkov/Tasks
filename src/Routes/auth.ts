import { Router } from 'express';

import * as authController from '../TypeORMControllers/auth';

import middleWares from '../TypeORMMiddlewares';
import signInValidators from '../Validators/signIn';
import signUpValidators from '../Validators/signUp';

const router = Router();

router.post(
  '/sign-in',
  signInValidators,
  middleWares.hasValidationError,
  authController.signIn,
);

router.post(
  '/sign-up',
  signUpValidators,
  middleWares.hasValidationError,
  authController.signUp,
);

router.post('/log-out', authController.logOut);

router.get('/user', middleWares.isAuth, authController.getUser);

export default router;
