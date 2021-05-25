import UserDBConnector from '../../../Interfaces/DBConnectors/UserDBConnector';
import UserData from '../../../Interfaces/Data/User';
import sqlConnector from '../../../Connect/sqlDBConnector';
import SQLDBConnector from '../../DBConnector/SQLDBConnector';
import constructLocationError from '../../../Helpers/constructLocationError';
import { LOCATIONS } from './constants';

class UserSQLDBConnector extends SQLDBConnector implements UserDBConnector {
  constructor() {
    super();
    this.createTables();
  }

  private createTableUsers(): any {
    return {
      text: `CREATE TABLE IF NOT EXISTS USERS(
        user_id serial PRIMARY KEY,
        username varchar(255),
        email varchar(255),
        password varchar(255),
        isAdmin boolean
      );`,
    };
  }

  async createTables(): Promise<void> {
    try {
      const connector = await sqlConnector.getConnect();
      await connector.query('BEGIN');
      await connector.query(this.createTableUsers());
      await connector.query('COMMIT');
    } catch (err) {
      const connector = await sqlConnector.getConnect();
      await connector.query('ROLLBACK');
      const locationError = constructLocationError(
        err,
        LOCATIONS.CREATE_TABLES,
      );
      throw locationError;
    }
  }

  async getAll(): Promise<Array<UserData>> {
    try {
      const connector = await sqlConnector.getConnect();
      const res = await connector.query(`SELECT * FROM USERS;`);
      return res.rows;
    } catch (err) {
      const locationError = constructLocationError(err, LOCATIONS.GET_ALL);
      throw locationError;
    }
  }

  private getByIdQuery(id: string): any {
    return {
      text: `SELECT * FROM USERS WHERE user_id=$1`,
      values: [id],
    };
  }

  async getById(id: string): Promise<UserData> {
    try {
      const connector = await sqlConnector.getConnect();
      const res = await connector.query(this.getByIdQuery(id));
      return this.toUserData(res.rows[0]);
    } catch (err) {
      const locationError = constructLocationError(err, LOCATIONS.GET_BY_ID);
      throw locationError;
    }
  }

  private addRecordQuery(record: UserData): any {
    return {
      text: `INSERT INTO USERS(username, email, password, isAdmin)
      VALUES ($1, $2, $3, $4)`,
      values: [record.username, record.email, record.password, record.isAdmin],
    };
  }

  async addRecord(record: UserData): Promise<void> {
    try {
      const connector = await sqlConnector.getConnect();
      await connector.query(this.addRecordQuery(record));
    } catch (err) {
      const locationError = constructLocationError(err, LOCATIONS.ADD_RECORD);
      throw locationError;
    }
  }

  private removeByIdQuery(id: string): any {
    return {
      text: `DELETE FROM USERS WHERE user_id=$1`,
      values: [id],
    };
  }

  async removeById(id: string): Promise<void> {
    try {
      const connector = await sqlConnector.getConnect();
      await connector.query(this.removeByIdQuery(id));
    } catch (err) {
      const locationError = constructLocationError(err, LOCATIONS.REMOVE_BY_ID);
      throw locationError;
    }
  }

  private updateByIdQuery(id: string, newRecord: UserData): any {
    return {
      text: `UPDATE users
      SET
        username=$1,
        email=$2,
        password=$3,
        isAdmin=$4
      WHERE
        user_id=$5`,
      values: [
        newRecord.username,
        newRecord.email,
        newRecord.password,
        newRecord.isAdmin,
        id,
      ],
    };
  }

  async updateById(id: string, newRecord: UserData): Promise<void> {
    try {
      const connector = await sqlConnector.getConnect();
      await connector.query(this.updateByIdQuery(id, newRecord));
    } catch (err) {
      const locationError = constructLocationError(err, LOCATIONS.UPDATE_BY_ID);
      throw locationError;
    }
  }

  private getAllAdminsQuery(): any {
    return {
      text: `SELECT * FROM USERS WHERE isAdmin=true`,
    };
  }

  async getAllAdmins(): Promise<Array<UserData>> {
    try {
      const connector = await sqlConnector.getConnect();
      const res = await connector.query(this.getAllAdminsQuery());
      return res.rows;
    } catch (err) {
      const locationError = constructLocationError(
        err,
        LOCATIONS.GET_ALL_ADMINS,
      );
      throw locationError;
    }
  }

  private getUserByEmailQuery(email: string): any {
    return {
      text: `SELECT * FROM USERS WHERE email=$1`,
      values: [email],
    };
  }

  async getUserByEmail(email: string): Promise<UserData> {
    try {
      const connector = await sqlConnector.getConnect();
      const res = await connector.query(this.getUserByEmailQuery(email));
      return this.toUserData(res.rows[0]);
    } catch (err) {
      const locationError = constructLocationError(
        err,
        LOCATIONS.GET_ALL_ADMINS,
      );
      throw locationError;
    }
  }

  toUserData(row: any): UserData {
    const { user_id: userId, username, email, password, isadmin } = row;
    return {
      id: userId,
      username: username,
      email: email,
      password: password,
      isAdmin: isadmin,
    };
  }
}

export default UserSQLDBConnector;
