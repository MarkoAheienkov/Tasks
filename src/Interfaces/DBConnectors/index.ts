export default interface DBConnector {
  getAll(): Promise<Array<any>>;
  getById(id: string): Promise<any>;
  updateById(id: string, newRecord: any): Promise<void>;
  removeById(id: string): Promise<void>;
  addRecord(newRecord: any): Promise<void>;
  generateId(): string;
}
