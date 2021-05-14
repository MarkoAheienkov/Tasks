import UserDBConnector from '../../../Interfaces/DBConnectors/UserDBConnector';

import UserData from '../../../Interfaces/Data/User';

import MongoDBConnector from '../../DBConnector/MongoDBConnector';
import { getDB } from '../../../Connect/mongoDBConnector';

class UserMongoDBConnector extends MongoDBConnector implements UserDBConnector {
  constructor() {
    super(getDB().collection('users'));
  }
  async getUserByEmail(email: string): Promise<UserData | void> {
    return this.transformId(
      await this.collection.findOne({ email: email }),
    ) as UserData;
  }
  async getAllAdmins(): Promise<Array<UserData>> {
    const admins = await this.collection.find({ isAdmin: true }).toArray();
    return this.transforArrayIds(admins) as Array<UserData>;
  }
}

export default UserMongoDBConnector;
