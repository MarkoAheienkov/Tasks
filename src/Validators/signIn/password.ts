import { body } from 'express-validator';
import typeORMConnector from '../../Connect/typeORMConnect';
import Users from '../../Entities/user';
import constructLocationError from '../../Helpers/constructLocationError';
import { LOCATIONS, SIGN_IN_VALIDATORS_MESSAGES } from '../constants';
import bcrypt from 'bcryptjs';

export default body('password')
  .trim()
  .custom(
    async (password: string, { req }): Promise<boolean> => {
      try {
        const { email } = req.body;
        const connection = await typeORMConnector.getConnect();
        const userRepository = connection.getRepository(Users);
        const user = await userRepository.findOne({
          where: [{ email: email }],
        });
        if (!user) {
          return Promise.reject(
            SIGN_IN_VALIDATORS_MESSAGES.PASSWORD_IS_NOT_CORRECT,
          );
        }
        const compare = await bcrypt.compare(password, user.password as string);
        if (!compare) {
          return Promise.reject(
            SIGN_IN_VALIDATORS_MESSAGES.PASSWORD_IS_NOT_CORRECT,
          );
        }
        return true;
      } catch (err) {
        const locationError = constructLocationError(
          err,
          LOCATIONS.SING_IN_PASSWROD_IS_NOT_COORECT,
        );
        throw locationError;
      }
    },
  );
