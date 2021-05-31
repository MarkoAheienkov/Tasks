import UserData from '../../../Interfaces/Data/User';
import UserDBConnector from '../../../Interfaces/DBConnectors/UserDBConnector';
import AdminRepository from '../../../Repositories/Admin';
import UserRepository from '../../../Repositories/User';

export default class UserFactory {
  createUser(
    userDBConnector: UserDBConnector,
    userData: UserData,
  ): UserRepository | AdminRepository {
    let user;
    const { id, username, isAdmin, email, password } = userData;
    if (isAdmin) {
      user = new AdminRepository(
        username,
        email,
        password,
        userDBConnector,
        id,
      );
    } else {
      user = new UserRepository(username, email, password, userDBConnector, id);
    }
    return user;
  }
}
