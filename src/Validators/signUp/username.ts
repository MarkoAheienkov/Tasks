import { body } from 'express-validator';
import { SIGN_UP_VALIDATORS_MESSAGES } from '../constants';

export default body('username')
  .trim()
  .isLength({
    min: 4,
  })
  .withMessage(SIGN_UP_VALIDATORS_MESSAGES.USERNAME_LENGTH);
