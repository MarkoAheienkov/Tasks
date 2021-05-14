import { getDB } from '../../../Connect/mongoDBConnector';
import PostData from '../../../Interfaces/Data/Post';
import PostDBConnector from '../../../Interfaces/DBConnectors/PostDBConnector';
import MongoDBConnector from '../../DBConnector/MongoDBConnector';

class PostFileDBConnector extends MongoDBConnector implements PostDBConnector {
  constructor() {
    super(getDB().collection('posts'));
  }
  async getPostsByTitle(title: string): Promise<Array<PostData>> {
    const posts = await this.collection.find({ title: title }).toArray();
    return this.transforArrayIds(posts) as Array<PostData>;
  }
}

export default PostFileDBConnector;
