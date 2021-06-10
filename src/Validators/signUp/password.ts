import { body } from 'express-validator';
import { SIGN_UP_VALIDATORS_MESSAGES } from '../constants';

export default body('password')
  .trim()
  .isLength({
    min: 6,
  })
  .withMessage(SIGN_UP_VALIDATORS_MESSAGES.PASSWORD_LENGTH)
  .custom((password: string): boolean => {
    const reg = /[A-Z]/;
    if (!reg.test(password)) {
      throw new Error(SIGN_UP_VALIDATORS_MESSAGES.PASSWORD_MUST_BE_VALID);
    }
    return true;
  })
  .custom((password: string): boolean => {
    const reg = /\d/;
    if (!reg.test(password)) {
      throw new Error(SIGN_UP_VALIDATORS_MESSAGES.PASSWORD_MUST_BE_VALID);
    }
    return true;
  })
  .custom((password: string): boolean => {
    const reg = /_/;
    if (!reg.test(password)) {
      throw new Error(SIGN_UP_VALIDATORS_MESSAGES.PASSWORD_MUST_BE_VALID);
    }
    return true;
  })
  .withMessage(SIGN_UP_VALIDATORS_MESSAGES.PASSWORD_MUST_BE_VALID);
