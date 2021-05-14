import { getDB } from '../../../Connect/mongoDBConnector';
import CommentData from '../../../Interfaces/Data/Comment';
import CommentDBConnector from '../../../Interfaces/DBConnectors/CommentDBConnector';
import MongoDBConnector from '../../DBConnector/MongoDBConnector';

class CommentMongoDBConnector extends MongoDBConnector
  implements CommentDBConnector {
  constructor() {
    super(getDB().collection('comments'));
  }
  async getPostComments(postId: string): Promise<Array<CommentData>> {
    const comments = await this.collection.find({ post: postId }).toArray();
    return this.transforArrayIds(comments) as Array<CommentData>;
  }
  async getCommentsReplies(commentId: string): Promise<Array<CommentData>> {
    const comments = await this.collection
      .find({ comment: commentId })
      .toArray();
    return this.transforArrayIds(comments) as Array<CommentData>;
  }
}

export default CommentMongoDBConnector;
