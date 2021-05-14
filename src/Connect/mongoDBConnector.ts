import { MongoClient, Db } from 'mongodb';
import RequestError from '../Classes/Errors/RequestError';

let _db: Db;

//'mongodb://localhost:27017/forum'

export const connect = async (mongoUrl: string): Promise<void> => {
  try {
    const mongoClient = new MongoClient(mongoUrl, {
      useUnifiedTopology: true,
    });
    const client = await mongoClient.connect();
    _db = client.db();
    process.on('SIGINT', () => {
      client.close();
      process.exit();
    });
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const getDB = (): Db => {
  if (_db) {
    return _db;
  }
  throw new RequestError('Problem with connecting', 500);
};
