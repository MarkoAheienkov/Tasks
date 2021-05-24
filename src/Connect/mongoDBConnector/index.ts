import { MongoClient, ChangeStream } from 'mongodb';
import constructLocationError from '../../Helpers/constructLocationError';
import { LOCATIONS } from './constants';

export class MongoConnector {
  client: MongoClient;
  changeStream?: ChangeStream;
  constructor(url: string) {
    this.client = new MongoClient(url, {
      useUnifiedTopology: true,
    });
  }

  async getConnect(): Promise<MongoClient> {
    try {
      if (this.client.isConnected()) {
        return this.client;
      } else {
        await this.reconnect();
        return this.client;
      }
    } catch (err) {
      const locationError = constructLocationError(err, LOCATIONS.GET_CONNECT);
      throw locationError;
    }
  }

  private async reconnect(): Promise<void> {
    try {
      this.client = await this.client.connect();
      this.closeChangeStream();
      this.openChangeStream();
      this.addErrorListener();
    } catch (err) {
      const locationError = constructLocationError(err, LOCATIONS.RECONNECT);
      throw locationError;
    }
  }

  private closeChangeStream(): void {
    try {
      if (this.changeStream) {
        this.changeStream.close();
      }
    } catch (err) {
      const locationError = constructLocationError(
        err,
        LOCATIONS.CLOSE_CHANGE_STREAM,
      );
      throw locationError;
    }
  }

  private openChangeStream(): void {
    try {
      this.changeStream = this.client.watch();
    } catch (err) {
      const locationError = constructLocationError(
        err,
        LOCATIONS.OPEN_CHANGE_STREAM,
      );
      throw locationError;
    }
  }

  private addErrorListener(): void {
    try {
      if (this.changeStream) {
        this.changeStream.on('error', this.reconnect.bind(this));
      }
    } catch (err) {
      const locationError = constructLocationError(
        err,
        LOCATIONS.ADD_ERROR_LISTENER,
      );
      throw locationError;
    }
  }
}

const mongoConnector = new MongoConnector('mongodb://localhost:27017/forum');

export default mongoConnector;
