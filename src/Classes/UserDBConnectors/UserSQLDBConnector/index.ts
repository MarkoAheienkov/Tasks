import UserDBConnector from '../../../Interfaces/DBConnectors/UserDBConnector';

import UserData from '../../../Interfaces/Data/User';

import { getConnector } from '../../../Connect/sqlDBConnector';
import { PoolClient } from 'pg';
import SQLDBConnector from '../../DBConnector/SQLDBConnector';

class UserSQLDBConnector extends SQLDBConnector implements UserDBConnector {
  connector: PoolClient;
  constructor() {
    super();
    this.connector = getConnector();
    this.createTables();
  }

  async createTables(): Promise<void> {
    try {
      await this.connector.query('BEGIN');
      await this.connector.query(
        `CREATE TABLE IF NOT EXISTS USERS(
            user_id uuid PRIMARY KEY,
            username varchar(255),
            email varchar(255),
            password varchar(255),
            isAdmin boolean
          );`,
      );
      await this.connector.query('COMMIT');
    } catch (err) {
      await this.connector.query('ROLLBACK');
      throw err;
    }
  }

  async getAll(): Promise<Array<UserData>> {
    const res = await this.connector.query(`SELECT * FROM USERS;`);
    return res.rows;
  }

  async getById(id: string): Promise<UserData> {
    const res = await this.connector.query(
      `SELECT * FROM USERS WHERE user_id=${id}`,
    );
    return this.toUserData(res.rows[0]);
  }

  async addRecord(record: UserData): Promise<void> {
    await this.connector.query(
      `INSERT INTO USERS(user_id, username, email, password, isAdmin)
       VALUES (${record.id}, '${record.username}', '${record.email}', '${record.password}', ${record.isAdmin})`,
    );
  }

  async removeById(id: string): Promise<void> {
    await this.connector.query(`DELETE FROM USERS WHERE user_id=${id}`);
  }

  async updateById(id: string, newRecord: UserData): Promise<void> {
    await this.connector.query(
      `UPDATE users
       SET
         username='${newRecord.username}',
         email='${newRecord.email}',
         password='${newRecord.password}',
         isAdmin=${newRecord.isAdmin}
       WHERE
         user_id=${id}`,
    );
  }

  async getAllAdmins(): Promise<Array<UserData>> {
    const res = await this.connector.query(
      `SELECT * FROM USERS WHERE isAdmin=true`,
    );
    return res.rows;
  }

  async getUserByEmail(email: string): Promise<UserData> {
    const res = await this.connector.query(
      `SELECT * FROM USERS WHERE email='${email}'`,
    );
    return this.toUserData(res.rows[0]);
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
