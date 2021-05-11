import Data from '../../../Interfaces/Data';
import DataBase from '../../../Interfaces/DataBase';
import DBConnector from '../../../Interfaces/DBConnectors';

class FileDBConnector implements DBConnector {
  database: DataBase;
  constructor(database: DataBase) {
    this.database = database;
  }
  async getAll(): Promise<Array<Data>> {
    return [...this.database.records];
  }
  async addRecord(record: Data): Promise<void> {
    const records = this.database.records;
    records.push(record);
    this.database.setRecords(records);
  }
  async getById(id: string): Promise<Data | void> {
    return this.database.records.find(record => {
      return record.id.toString() === id.toString();
    });
  }
  async removeById(id: string): Promise<void> {
    const records = this.database.records.filter(record => {
      return record.id.toString() !== id.toString();
    });
    this.database.setRecords(records);
  }
  async updateById(id: string, newRecordInfo: Data): Promise<void> {
    const records = this.database.records;
    const articleIdx = records.findIndex(record => {
      return record.id.toString() === id.toString();
    });
    records[articleIdx] = {
      ...records[articleIdx],
      ...newRecordInfo,
      id: records[articleIdx].id,
    };
    this.database.setRecords(records);
  }
}

export default FileDBConnector;
