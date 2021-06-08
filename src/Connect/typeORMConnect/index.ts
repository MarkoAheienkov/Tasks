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
  schema: string;
  connection?: Connection;
  constructor(schema: string) {
    this.isConnected = false;
    this.reconnect = this.reconnect.bind(this);
    this.schema = schema;
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
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT),
        database: process.env.DB_DB_NAME,
        password: process.env.DB_PASSWORD,
        username: process.env.DB_USER,
        synchronize: true,
        type: 'postgres',
        entities: [Users, Posts, Comments, Articles, Sections, Images, Replies],
        schema: this.schema,
      });
      this.isConnected = true;
      return this.connection;
    } catch (err) {
      const locationError = constructLocationError(err, LOCATIONS.RECONNECT);
      throw locationError;
    }
  }
}

const typeORMConnector = new TypeORMConnector(process.env.DB_SCHEMA as string);

export default typeORMConnector;
