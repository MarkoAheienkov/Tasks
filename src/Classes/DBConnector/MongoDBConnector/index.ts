import { Collection, ObjectId, ObjectID } from 'mongodb';
import Data from '../../../Interfaces/Data';
import DBConnector from '../../../Interfaces/DBConnectors';

class MongoDBConnector implements DBConnector {
  collection: Collection;
  constructor(collection: Collection) {
    this.collection = collection;
  }
  async getAll(): Promise<Array<Data>> {
    const data = await this.collection.find().toArray();
    return this.transforArrayIds(data);
  }

  async getById(id: string): Promise<Data | void> {
    if (ObjectID.isValid(id)) {
      const data = await this.collection.findOne({ _id: new ObjectID(id) });
      return data && this.transformId(data);
    }
  }

  async addRecord(record: Data): Promise<void> {
    const newRecord = this.removeId(record);
    await this.collection.insertOne({
      ...newRecord,
      _id: new ObjectID(record.id),
    });
  }

  async updateById(id: string, newRecord: Data): Promise<void> {
    await this.collection.updateOne(
      { _id: new ObjectID(id) },
      { $set: { ...this.removeId(newRecord) } },
    );
  }

  async removeById(id: string): Promise<void> {
    await this.collection.deleteOne({ _id: new ObjectID(id) });
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
