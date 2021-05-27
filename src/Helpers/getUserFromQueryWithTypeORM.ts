import typeORMConnect from '../Connect/typeORMConnect';
import User from '../Entities/user';
import { LOCATIONS } from './constants';
import constructLocationError from './constructLocationError';

const getUser = async (auth: string): Promise<void | User> => {
  try {
    const connection = await typeORMConnect.getConnect();
    const userRepository = connection.getRepository(User);
    let user;
    switch (auth) {
      case 'admin':
        user = await userRepository.findOne({
          where: [{ email: 'admin@admin.com' }],
        });
        break;
      case 'user':
        user = await userRepository.findOne({
          where: [{ email: 'user@user.com' }],
        });
        break;
      default:
        break;
    }
    return user;
  } catch (err) {
    const locationError = constructLocationError(
      err,
      LOCATIONS.GET_USER_FROM_QUERY_TYPE_ORM,
    );
    throw locationError;
  }
};

export default getUser;
