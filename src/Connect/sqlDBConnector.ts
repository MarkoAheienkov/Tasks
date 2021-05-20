import { Pool, PoolClient } from 'pg';

import RequestError from '../Classes/Errors/RequestError';

let connector: PoolClient;

export const connect = async (): Promise<void> => {
  try {
    const pool = new Pool({
      host: 'localhost',
      port: 5432,
      database: 'forum',
      password: 'murko',
      user: 'murko',
    });
    connector = await pool.connect();
    connector.query(
      `CREATE TABLE IF NOT EXISTS USERS(
          user_id uuid PRIMARY KEY,
          username varchar(255),
          email varchar(255),
          password varchar(255),
          isAdmin boolean
        );`,
    );
  } catch (err) {
    const error = new RequestError(err, 500);
    throw error;
  }
};

export const getConnector = (): PoolClient => {
  if (connector) {
    return connector;
  }
  throw new RequestError('Porblem with connection', 500);
};
