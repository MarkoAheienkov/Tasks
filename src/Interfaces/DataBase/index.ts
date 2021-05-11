import Data from '../Data';

export default interface DataBase {
  records: Array<Data>;
  setRecords(records: Array<Data>): void;
}
