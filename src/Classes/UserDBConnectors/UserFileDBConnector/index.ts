import UserDBConnector from '../../../Interfaces/DBConnectors/UserDBConnector';

import usersDB from '../../../DB/users';
import UserData from '../../../Interfaces/Data/User';

class UserFileDBConnector implements UserDBConnector {
  async getAll(): Promise<Array<UserData>> {
    return [...usersDB.users];
  }
  async addRecord(user: UserData): Promise<void> {
    const users = usersDB.users;
    users.push(user);
    usersDB.setUsers(users);
  }
  async getById(id: string): Promise<UserData | void> {
    return usersDB.users.find(user => user.id.toString() === id.toString());
  }
  async getUserByEmail(email: string): Promise<UserData | void> {
    return usersDB.users.find(user => {
      return user.email.toString() === email.toString();
    });
  }
  async removeById(id: string): Promise<void> {
    const users = usersDB.users.filter(user => {
      return user.id.toString() !== id.toString();
    });
    usersDB.setUsers(users);
  }
  async updateById(id: string, newUserInfo: UserData): Promise<void> {
    const users = usersDB.users;
    const userIdx = users.findIndex(user => {
      return user.id.toString() === id.toString();
    });
    users[userIdx] = {
      ...users[userIdx],
      ...newUserInfo,
      id: users[userIdx].id,
    };
    usersDB.setUsers(users);
  }
  async getAllAdmins(): Promise<Array<UserData>> {
    return usersDB.users.filter(user => user.isAdmin);
  }
}

export default UserFileDBConnector;
