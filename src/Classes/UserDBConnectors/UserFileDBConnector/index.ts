import UserDBConnector from '../../../Interfaces/DBConnectors/UserDBConnector';

import usersDB from '../../../DB/users';
import UserData from '../../../Interfaces/Data/User';

import FileDBConnector from '../../DBConnector/DBFileConnector';

class UserFileDBConnector extends FileDBConnector implements UserDBConnector {
  constructor() {
    super(usersDB);
  }
  async getUserByEmail(email: string): Promise<UserData | void> {
    const users = this.database.records as Array<UserData>;
    return users.find(user => {
      return user.email.toString() === email.toString();
    });
  }
  async getAllAdmins(): Promise<Array<UserData>> {
    const users = this.database.records as Array<UserData>;
    return users.filter(user => user.isAdmin);
  }
}

export default UserFileDBConnector;
