import UserFactory from '../Classes/Factories/UserFactory';
import UserData from '../Interfaces/Data/User';
import UserDBConnector from '../Interfaces/DBConnectors/UserDBConnector';
import User from './User';

class Admin extends User {
  isAdmin: boolean;
  constructor(
    username: string,
    email: string,
    password: string,
    userDBConnector: UserDBConnector,
    id?: string,
  ) {
    super(username, email, password, userDBConnector, id);
    this.isAdmin = true;
  }

  toObject(): UserData {
    const user = super.toObject();
    return {
      ...user,
      isAdmin: true,
    };
  }

  static async getAllAdmins(
    userDBConnector: UserDBConnector,
    userFactory: UserFactory,
  ): Promise<Array<User>> {
    const adminData = await userDBConnector.getAllAdmins();
    return adminData.map(adminData => {
      return Admin.toModel(userDBConnector, adminData, userFactory);
    });
  }
}

export default Admin;
