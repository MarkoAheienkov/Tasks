import DBConnector from '..';
import CommentData from '../../Data/Comment';

export default interface CommentDBConnector extends DBConnector {
  getPostComments(postId: string): Promise<Array<CommentData>>;
  getCommentsReplies(commentId: string): Promise<Array<CommentData>>;
}
