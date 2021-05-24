import UserDBConnector from '../../Interfaces/DBConnectors/UserDBConnector';
import Model from '../../Interfaces/Model';
import UserData from '../../Interfaces/Data/User';
import UserFactory from '../../Classes/Factories/UserFactory';
import constructLocationError from '../../Helpers/constructLocationError';
import { LOCATIONS } from './constants';

class UserRepository implements Model {
  username: string;
  email: string;
  password: string;
  userDbConnector: UserDBConnector;
  id: string;
  constructor(
    username: string,
    email: string,
    password: string,
    userDbConnector: UserDBConnector,
    id?: string,
  ) {
    this.username = username;
    this.email = email;
    this.password = password;
    this.userDbConnector = userDbConnector;
    this.id = id || userDbConnector.generateId();
  }
  static async getByEmail(
    userDBConnector: UserDBConnector,
    email: string,
    userFactory: UserFactory,
  ): Promise<UserRepository | void> {
    try {
      const userData = await userDBConnector.getUserByEmail(email);
      if (userData) {
        return this.toModel(userDBConnector, userData, userFactory);
      }
    } catch (err) {
      const locationError = constructLocationError(err, LOCATIONS.GET_BY_EMAIL);
      throw locationError;
    }
  }

  toObject(): UserData {
    const { username, password, email, id } = this;
    return {
      username,
      password,
      email,
      id,
    };
  }

  static toModel(
    userDBConnector: UserDBConnector,
    userData: UserData,
    userFactory: UserFactory,
  ): UserRepository {
    return userFactory.createUser(userDBConnector, userData);
  }

  async remove(): Promise<void> {
    try {
      await this.userDbConnector.removeById(this.id);
    } catch (err) {
      const locationError = constructLocationError(err, LOCATIONS.REMOVE);
      throw locationError;
    }
  }

  async save(): Promise<void> {
    try {
      const userData = this.toObject();
      const candidate = await this.userDbConnector.getById(this.id);
      if (candidate) {
        this.userDbConnector.updateById(this.id, userData);
      } else {
        this.userDbConnector.addRecord(userData);
      }
    } catch (err) {
      const locationError = constructLocationError(err, LOCATIONS.SAVE);
      throw locationError;
    }
  }
}

export default UserRepository;
