import { v4 } from 'uuid';
import CommentDBConnector from '../Interfaces/DBConnectors/CommentDBConnector';
import Model from '../Interfaces/Model';
import CommentData from '../Interfaces/Data/Comment';

class Comment implements Model {
  text: string;
  creator: string;
  commentDBConnector: CommentDBConnector;
  id: string;
  post?: string;
  comment?: string;
  constructor(
    text: string,
    creator: string,
    commentDBConnector: CommentDBConnector,
    post?: string,
    comment?: string,
    id?: string,
  ) {
    this.text = text;
    this.commentDBConnector = commentDBConnector;
    this.id = id || v4();
    this.creator = creator;
    this.post = post;
    this.comment = comment;
  }

  static async getAll(
    commentDBConnector: CommentDBConnector,
  ): Promise<Array<Comment>> {
    const commentsData = await commentDBConnector.getAll();
    const comments = commentsData.map((commentData: CommentData) => {
      return Comment.toModel(commentDBConnector, commentData);
    });
    return comments;
  }

  static async getById(
    commentDBConnector: CommentDBConnector,
    id: string,
  ): Promise<Comment | void> {
    const commentData = await commentDBConnector.getById(id);
    return Comment.toModel(commentDBConnector, commentData);
  }

  toObject(): CommentData {
    const { text, id, creator, post, comment } = this;
    return {
      text,
      id,
      creator,
      post,
      comment,
    };
  }

  static async getPostComments(
    commentDBConnector: CommentDBConnector,
    postId: string,
  ): Promise<Array<Comment>> {
    const commentsData = await commentDBConnector.getPostComments(postId);
    const comments = commentsData.map((data: CommentData) => {
      return Comment.toModel(commentDBConnector, data);
    });
    return comments;
  }

  static async getCommentReplies(
    commentDBConnector: CommentDBConnector,
    commentId: string,
  ): Promise<Array<Comment>> {
    const commentsData = await commentDBConnector.getCommentsReplies(commentId);
    const comments = commentsData.map((data: CommentData) => {
      return Comment.toModel(commentDBConnector, data);
    });
    return comments;
  }

  static toModel(
    commentDBConnector: CommentDBConnector,
    commentData: CommentData,
  ): Comment {
    const { text, id, creator, post, comment } = commentData;
    return new Comment(text, creator, commentDBConnector, post, comment, id);
  }

  async save(): Promise<void> {
    const commentData = this.toObject();
    const candidate = await this.commentDBConnector.getById(this.id);
    if (candidate) {
      this.commentDBConnector.updateById(this.id, commentData);
    } else {
      this.commentDBConnector.addRecord(commentData);
    }
  }

  async remove(): Promise<void> {
    await this.commentDBConnector.removeById(this.id);
  }
}

export default Comment;
