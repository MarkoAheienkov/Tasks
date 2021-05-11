import UserFileDBConnector from '../Classes/UserDBConnectors/UserFileDBConnector';
import User from '../Models/User';
import UserFactory from '../Classes/Factories/UserFactory';
import { Request } from 'express';
import Admin from '../Models/Admin';

const getUser = async (req: Request): Promise<void | User | Admin> => {
  const { auth } = req.query;
  const userFileDBConnector = new UserFileDBConnector();
  const userFactory = new UserFactory();
  let user;
  switch (auth) {
    case 'admin':
      user = await User.getByEmail(
        userFileDBConnector,
        'admin@admin.com',
        userFactory,
      );
      break;
    case 'user':
      user = await User.getByEmail(
        userFileDBConnector,
        'user@user.com',
        userFactory,
      );
      break;
  }
  return user;
};

export default getUser;
