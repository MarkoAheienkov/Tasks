import { body } from 'express-validator';
import typeORMConnector from '../../Connect/typeORMConnect';
import Users from '../../Entities/user';
import constructLocationError from '../../Helpers/constructLocationError';
import { LOCATIONS, SIGN_IN_VALIDATORS_MESSAGES } from '../constants';

export default body('email')
  .trim()
  .isEmail()
  .withMessage(SIGN_IN_VALIDATORS_MESSAGES.EMAIL_IS_NOT_VALID)
  .custom(
    async (email: string): Promise<boolean> => {
      try {
        const connection = await typeORMConnector.getConnect();
        const userRepository = connection.getRepository(Users);
        const user = await userRepository.findOne({
          where: [{ email: email }],
        });
        if (!user) {
          return Promise.reject(
            SIGN_IN_VALIDATORS_MESSAGES.EMAIL_IS_NOT_CORRECT,
          );
        }
        return true;
      } catch (err) {
        const locationError = constructLocationError(
          err,
          LOCATIONS.SING_IN_EMAIL_NOT_IN_USE,
        );
        throw locationError;
      }
    },
  );
