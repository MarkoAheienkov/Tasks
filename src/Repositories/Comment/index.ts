import CommentDBConnector from '../../Interfaces/DBConnectors/CommentDBConnector';
import Model from '../../Interfaces/Model';
import CommentData from '../../Interfaces/Data/Comment';
import constructLocationError from '../../Helpers/constructLocationError';
import { LOCATIONS } from './constants';

class CommentRepository implements Model {
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
    this.id = id || commentDBConnector.generateId();
    this.creator = creator;
    this.post = post;
    this.comment = comment;
  }

  static async getAll(
    commentDBConnector: CommentDBConnector,
  ): Promise<Array<CommentRepository>> {
    try {
      const commentsData = await commentDBConnector.getAll();
      const comments = commentsData.map((commentData: CommentData) => {
        return CommentRepository.toModel(commentDBConnector, commentData);
      });
      return comments;
    } catch (err) {
      const locationError = constructLocationError(err, LOCATIONS.GET_ALL);
      throw locationError;
    }
  }

  static async getById(
    commentDBConnector: CommentDBConnector,
    id: string,
  ): Promise<CommentRepository | void> {
    try {
      const commentData = await commentDBConnector.getById(id);
      return CommentRepository.toModel(commentDBConnector, commentData);
    } catch (err) {
      const locationError = constructLocationError(err, LOCATIONS.GET_BY_ID);
      throw locationError;
    }
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
  ): Promise<Array<CommentRepository>> {
    try {
      const commentsData = await commentDBConnector.getPostComments(postId);
      const comments = commentsData.map((data: CommentData) => {
        return CommentRepository.toModel(commentDBConnector, data);
      });
      return comments;
    } catch (err) {
      const locationError = constructLocationError(
        err,
        LOCATIONS.GET_POST_COMMENTS,
      );
      throw locationError;
    }
  }

  static async getCommentReplies(
    commentDBConnector: CommentDBConnector,
    commentId: string,
  ): Promise<Array<CommentRepository>> {
    try {
      const commentsData = await commentDBConnector.getCommentsReplies(
        commentId,
      );
      const comments = commentsData.map((data: CommentData) => {
        return CommentRepository.toModel(commentDBConnector, data);
      });
      return comments;
    } catch (err) {
      const locationError = constructLocationError(
        err,
        LOCATIONS.GET_COMMENT_REPLIES,
      );
      throw locationError;
    }
  }

  static toModel(
    commentDBConnector: CommentDBConnector,
    commentData: CommentData,
  ): CommentRepository {
    const { text, id, creator, post, comment } = commentData;
    return new CommentRepository(
      text,
      creator,
      commentDBConnector,
      post,
      comment,
      id,
    );
  }

  async save(): Promise<void> {
    try {
      const commentData = this.toObject();
      const candidate = await this.commentDBConnector.getById(this.id);
      if (candidate) {
        this.commentDBConnector.updateById(this.id, commentData);
      } else {
        this.commentDBConnector.addRecord(commentData);
      }
    } catch (err) {
      const locationError = constructLocationError(
        err,
        LOCATIONS.GET_COMMENT_REPLIES,
      );
      throw locationError;
    }
  }

  async remove(): Promise<void> {
    try {
      await this.commentDBConnector.removeById(this.id);
    } catch (err) {
      const locationError = constructLocationError(
        err,
        LOCATIONS.GET_COMMENT_REPLIES,
      );
      throw locationError;
    }
  }
}

export default CommentRepository;
