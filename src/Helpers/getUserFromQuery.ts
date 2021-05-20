import UserDBConnectors from '../Classes/UserDBConnectors/UserSQLDBConnector';
import User from '../Models/User';
import UserFactory from '../Classes/Factories/UserFactory';
import { Request } from 'express';
import Admin from '../Models/Admin';

const getUser = async (req: Request): Promise<void | User | Admin> => {
  const { auth } = req.query;
  const userDBConnector = new UserDBConnectors();
  const userFactory = new UserFactory();
  let user;
  switch (auth) {
    case 'admin':
      user = await User.getByEmail(
        userDBConnector,
        'admin@admin.com',
        userFactory,
      );
      break;
    case 'user':
      user = await User.getByEmail(
        userDBConnector,
        'user@user.com',
        userFactory,
      );
      break;
  }
  return user;
};

export default getUser;
