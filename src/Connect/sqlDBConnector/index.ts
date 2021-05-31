import { Pool, PoolClient } from 'pg';
import constructLocationError from '../../Helpers/constructLocationError';
import { LOCATIONS } from './constants';

export class SQLConnector {
  pool: Pool;
  isConnected: boolean;
  poolClient?: PoolClient;
  constructor() {
    this.pool = new Pool({
      host: 'localhost',
      port: 5432,
      database: 'forum',
      password: 'murko',
      user: 'murko',
    });
    this.isConnected = false;
    this.reconnect = this.reconnect.bind(this);
  }

  async getConnect(): Promise<PoolClient> {
    try {
      if (this.isConnected && this.poolClient) {
        return this.poolClient;
      } else {
        return await this.reconnect();
      }
    } catch (err) {
      const locationError = constructLocationError(err, LOCATIONS.GET_CONNECT);
      throw locationError;
    }
  }

  private async reconnect(): Promise<PoolClient> {
    try {
      this.removeErrorListeners();
      this.poolClient = await this.pool.connect();
      this.addErrorListeners();
      this.isConnected = true;
      return this.poolClient;
    } catch (err) {
      const locationError = constructLocationError(err, LOCATIONS.RECONNECT);
      throw locationError;
    }
  }

  private removeErrorListeners(): void {
    try {
      if (this.poolClient) {
        this.poolClient.off('error', this.reconnect);
      }
    } catch (err) {
      const locationError = constructLocationError(
        err,
        LOCATIONS.REMOVE_ERROR_LISTENERS,
      );
      throw locationError;
    }
  }

  private addErrorListeners(): void {
    try {
      if (this.poolClient) {
        this.poolClient.on('error', this.reconnect);
      }
    } catch (err) {
      const locationError = constructLocationError(
        err,
        LOCATIONS.ADD_ERROR_LISTENERS,
      );
      throw locationError;
    }
  }
}

const mongoConnector = new SQLConnector();

export default mongoConnector;
