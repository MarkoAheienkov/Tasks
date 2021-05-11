import commentDB from '../../../DB/comments';
import CommentData from '../../../Interfaces/Data/Comment';
import CommentDBConnector from '../../../Interfaces/DBConnectors/CommentDBConnector';
import FileDBConnector from '../../DBConnector/DBFileConnector';

class CommentFileDBConnector extends FileDBConnector
  implements CommentDBConnector {
  constructor() {
    super(commentDB);
  }
  async getPostComments(postId: string): Promise<Array<CommentData>> {
    const comments = this.database.records as Array<CommentData>;
    return comments.filter(({ post }) => post === postId);
  }
  async getCommentsReplies(commentId: string): Promise<Array<CommentData>> {
    const replies = (await this.getAll()) as Array<CommentData>;
    return replies.filter(({ comment }) => commentId === comment);
  }
}

export default CommentFileDBConnector;
