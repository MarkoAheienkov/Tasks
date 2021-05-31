import UserDBConnector from '../../../Interfaces/DBConnectors/UserDBConnector';

import UserData from '../../../Interfaces/Data/User';

import MongoDBConnector from '../../DBConnector/MongoDBConnector';
import mongoConnector from '../../../Connect/mongoDBConnector';
import constructLocationError from '../../../Helpers/constructLocationError';
import { LOCATIONS } from './constants';

class UserMongoDBConnector extends MongoDBConnector implements UserDBConnector {
  constructor() {
    super(mongoConnector, 'users');
  }
  async getUserByEmail(email: string): Promise<UserData | void> {
    try {
      const collection = await this.getCollection();
      return this.transformId(
        await collection.findOne({ email: email }),
      ) as UserData;
    } catch (err) {
      const locationError = constructLocationError(
        err,
        LOCATIONS.GET_USER_BY_EMAIL,
      );
      throw locationError;
    }
  }
  async getAllAdmins(): Promise<Array<UserData>> {
    try {
      const collection = await this.getCollection();
      const admins = await collection.find({ isAdmin: true }).toArray();
      return this.transforArrayIds(admins) as Array<UserData>;
    } catch (err) {
      const locationError = constructLocationError(
        err,
        LOCATIONS.GET_ALL_ADMINS,
      );
      throw locationError;
    }
  }
}

export default UserMongoDBConnector;
