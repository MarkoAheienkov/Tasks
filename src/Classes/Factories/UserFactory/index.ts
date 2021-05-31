import UserData from '../../../Interfaces/Data/User';
import UserDBConnector from '../../../Interfaces/DBConnectors/UserDBConnector';
import Admin from '../../../Models/Admin';
import User from '../../../Models/User';

export default class UserFactory {
  createUser(
    userDBConnector: UserDBConnector,
    userData: UserData,
  ): User | Admin {
    let user;
    const { id, username, isAdmin, email, password } = userData;
    if (isAdmin) {
      user = new Admin(username, email, password, userDBConnector, id);
    } else {
      user = new User(username, email, password, userDBConnector, id);
    }
    return user;
  }
}
