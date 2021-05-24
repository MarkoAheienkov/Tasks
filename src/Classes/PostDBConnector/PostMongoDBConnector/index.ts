import mongoConnector from '../../../Connect/mongoDBConnector';
import constructLocationError from '../../../Helpers/constructLocationError';
import PostData from '../../../Interfaces/Data/Post';
import PostDBConnector from '../../../Interfaces/DBConnectors/PostDBConnector';
import MongoDBConnector from '../../DBConnector/MongoDBConnector';
import { LOCATIONS } from './constants';

class PostFileDBConnector extends MongoDBConnector implements PostDBConnector {
  constructor() {
    super(mongoConnector, 'posts');
    this.createIndex();
  }

  async createIndex(): Promise<void> {
    try {
      const collection = await this.getCollection();
      collection.createIndex({ title: 'text' });
    } catch (err) {
      const error = constructLocationError(err, LOCATIONS.CREATE_INDEX);
      throw error;
    }
  }

  async getPostsByTitle(title: string): Promise<Array<PostData>> {
    try {
      const collection = await this.getCollection();
      const posts = await collection
        .find({ $text: { $search: title } })
        .toArray();
      return this.transforArrayIds(posts) as Array<PostData>;
    } catch (err) {
      const error = constructLocationError(err, LOCATIONS.CREATE_INDEX);
      throw error;
    }
  }
}

export default PostFileDBConnector;
