import { Collection, ObjectId, ObjectID } from 'mongodb';
import Data from '../../../Interfaces/Data';
import DBConnector from '../../../Interfaces/DBConnectors';
import { MongoConnector } from '../../../Connect/mongoDBConnector';
import constructLocationError from '../../../Helpers/constructLocationError';
import { LOCATIONS } from './constants';

class MongoDBConnector implements DBConnector {
  mongoConnector: MongoConnector;
  collectionName: string;
  constructor(mongoConnector: MongoConnector, collectionName: string) {
    this.mongoConnector = mongoConnector;
    this.collectionName = collectionName;
  }

  async getCollection(): Promise<Collection> {
    try {
      const client = await this.mongoConnector.getConnect();
      return client.db().collection(this.collectionName);
    } catch (err) {
      const locationError = constructLocationError(
        err,
        LOCATIONS.GET_COLLECTION,
      );
      throw locationError;
    }
  }

  async getAll(): Promise<Array<Data>> {
    try {
      const collection = await this.getCollection();
      const data = await collection.find().toArray();
      return this.transforArrayIds(data);
    } catch (err) {
      const locationError = constructLocationError(err, LOCATIONS.GET_ALL);
      throw locationError;
    }
  }

  async getById(id: string): Promise<Data | void> {
    try {
      if (ObjectID.isValid(id)) {
        const collection = await this.getCollection();
        const data = await collection.findOne({ _id: new ObjectID(id) });
        return data && this.transformId(data);
      } else {
        throw new Error('Not valid id');
      }
    } catch (err) {
      const locationError = constructLocationError(err, LOCATIONS.GET_BY_ID);
      throw locationError;
    }
  }

  async addRecord(record: Data): Promise<void> {
    try {
      const newRecord = this.removeId(record);
      const collection = await this.getCollection();
      await collection.insertOne({
        ...newRecord,
        _id: new ObjectID(record.id),
      });
    } catch (err) {
      const locationError = constructLocationError(err, LOCATIONS.ADD_RECORD);
      throw locationError;
    }
  }

  async updateById(id: string, newRecord: Data): Promise<void> {
    try {
      const collection = await this.getCollection();
      await collection.updateOne(
        { _id: new ObjectID(id) },
        { $set: { ...this.removeId(newRecord) } },
      );
    } catch (err) {
      const locationError = constructLocationError(err, LOCATIONS.UPDATE_BY_ID);
      throw locationError;
    }
  }

  async removeById(id: string): Promise<void> {
    try {
      const collection = await this.getCollection();
      await collection.deleteOne({ _id: new ObjectID(id) });
    } catch (err) {
      const locationError = constructLocationError(err, LOCATIONS.REMOVE_BY_ID);
      throw locationError;
    }
  }

  generateId(): string {
    return new ObjectId().toHexString();
  }

  transformId(data: { _id: ObjectID }): Data {
    return { ...data, id: data._id.toHexString() };
  }

  removeId(data: any): any {
    const keys: Array<string> = Object.keys(data).filter(key => key !== 'id');
    const obj: any = {};
    for (const key of keys) {
      obj[key] = data[key];
    }
    return obj;
  }

  transforArrayIds(records: Array<{ _id: ObjectID }>): Array<Data> {
    return records.map(this.transformId);
  }
}

export default MongoDBConnector;
