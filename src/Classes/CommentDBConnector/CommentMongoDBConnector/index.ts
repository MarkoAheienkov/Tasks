import mongoConnector from '../../../Connect/mongoDBConnector';
import constructLocationError from '../../../Helpers/constructLocationError';
import CommentData from '../../../Interfaces/Data/Comment';
import CommentDBConnector from '../../../Interfaces/DBConnectors/CommentDBConnector';
import MongoDBConnector from '../../DBConnector/MongoDBConnector';
import { LOCATIONS } from './constants';

class CommentMongoDBConnector extends MongoDBConnector
  implements CommentDBConnector {
  constructor() {
    super(mongoConnector, 'comments');
  }
  async getPostComments(postId: string): Promise<Array<CommentData>> {
    try {
      const collection = await this.getCollection();
      const comments = await collection.find({ post: postId }).toArray();
      return this.transforArrayIds(comments) as Array<CommentData>;
    } catch (err) {
      const locationError = constructLocationError(
        err,
        LOCATIONS.GET_POST_COMMENTS,
      );
      throw locationError;
    }
  }
  async getCommentsReplies(commentId: string): Promise<Array<CommentData>> {
    try {
      const collection = await this.getCollection();
      const comments = await collection.find({ comment: commentId }).toArray();
      return this.transforArrayIds(comments) as Array<CommentData>;
    } catch (err) {
      const locationError = constructLocationError(
        err,
        LOCATIONS.GET_COMMENTS_REPLIES,
      );
      throw locationError;
    }
  }
}

export default CommentMongoDBConnector;
