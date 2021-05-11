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
    const {
      id,
      username,
      isAdmin,
      email,
      password,
      articles,
      articlesToApprove,
      posts,
    } = userData;
    if (isAdmin) {
      user = new Admin(
        username,
        email,
        password,
        userDBConnector,
        articles,
        articlesToApprove,
        posts,
        id,
      );
    } else {
      user = new User(
        username,
        email,
        password,
        userDBConnector,
        articles,
        posts,
        id,
      );
    }
    return user;
  }
}
