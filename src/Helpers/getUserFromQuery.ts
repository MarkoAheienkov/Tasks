import UserSQLDBConnector from '../Classes/UserDBConnectors/UserSQLDBConnector';
import UserRepository from '../Repositories/User';
import UserFactory from '../Classes/Factories/UserFactory';
import AdminRepository from '../Repositories/Admin';
import { LOCATIONS } from './constants';
import constructLocationError from './constructLocationError';

const getUser = async (
  auth: string,
): Promise<void | UserRepository | AdminRepository> => {
  try {
    const userDBConnector = new UserSQLDBConnector();
    const userFactory = new UserFactory();
    let user;
    switch (auth) {
      case 'admin':
        user = await UserRepository.getByEmail(
          userDBConnector,
          'admin@admin.com',
          userFactory,
        );
        break;
      case 'user':
        user = await UserRepository.getByEmail(
          userDBConnector,
          'user@user.com',
          userFactory,
        );
        break;
    }
    return user;
  } catch (err) {
    const locationError = constructLocationError(
      err,
      LOCATIONS.GET_USER_FROM_QUERY,
    );
    throw locationError;
  }
};

export default getUser;
