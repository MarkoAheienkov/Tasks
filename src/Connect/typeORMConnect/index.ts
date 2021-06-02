import 'reflect-metadata';
import { createConnection, Connection } from 'typeorm';
import Articles from '../../Entities/article';
import Comments from '../../Entities/comment';
import Images from '../../Entities/image';
import Posts from '../../Entities/post';
import Replies from '../../Entities/reply';
import Sections from '../../Entities/section';
import Users from '../../Entities/user';
import constructLocationError from '../../Helpers/constructLocationError';
import { LOCATIONS } from './constants';

export class TypeORMConnector {
  isConnected: boolean;
  connection?: Connection;
  constructor() {
    this.isConnected = false;
    this.reconnect = this.reconnect.bind(this);
  }

  async getConnect(): Promise<Connection> {
    try {
      if (this.isConnected && this.connection) {
        return this.connection;
      } else {
        return await this.reconnect();
      }
    } catch (err) {
      const locationError = constructLocationError(err, LOCATIONS.GET_CONNECT);
      throw locationError;
    }
  }

  async reconnect(): Promise<Connection> {
    try {
      this.connection = await createConnection({
        host: 'localhost',
        port: 5432,
        database: 'forum',
        password: 'verysecretepassword',
        username: 'super_user',
        synchronize: true,
        type: 'postgres',
        entities: [Users, Posts, Comments, Articles, Sections, Images, Replies],
        schema: 'juggling',
      });
      this.isConnected = true;
      return this.connection;
    } catch (err) {
      const locationError = constructLocationError(err, LOCATIONS.RECONNECT);
      throw locationError;
    }
  }
}

const typeORMConnector = new TypeORMConnector();

export default typeORMConnector;
