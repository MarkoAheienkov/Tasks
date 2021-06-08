import { body } from 'express-validator';
import typeORMConnector from '../../Connect/typeORMConnect';
import Users from '../../Entities/user';
import constructLocationError from '../../Helpers/constructLocationError';
import { LOCATIONS, SIGN_UP_VALIDATORS_MESSAGES } from '../constants';

export default body('email')
  .trim()
  .isEmail()
  .withMessage(SIGN_UP_VALIDATORS_MESSAGES.EMAIL_IS_NOT_VALID)
  .custom(
    async (email: string): Promise<boolean> => {
      try {
        const connect = await typeORMConnector.getConnect();
        const userRepository = connect.getRepository(Users);
        const user = await userRepository.findOne({
          where: [{ email: email }],
        });
        if (user) {
          return Promise.reject(SIGN_UP_VALIDATORS_MESSAGES.EMAIL_IS_IN_USE);
        }
        return true;
      } catch (err) {
        const locationError = constructLocationError(
          err,
          LOCATIONS.SIGN_UP_EMAIL_IS_IN_USE,
        );
        throw locationError;
      }
    },
  );
