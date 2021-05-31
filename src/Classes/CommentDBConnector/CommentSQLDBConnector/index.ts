import sqlConnector from '../../../Connect/sqlDBConnector';
import constructLocationError from '../../../Helpers/constructLocationError';
import CommentData from '../../../Interfaces/Data/Comment';
import CommentDBConnector from '../../../Interfaces/DBConnectors/CommentDBConnector';
import SQLDBConnector from '../../DBConnector/SQLDBConnector';
import { LOCATIONS } from './constants';

class CommentSQLDBConnector extends SQLDBConnector
  implements CommentDBConnector {
  constructor() {
    super();
    this.createTables();
  }

  private createTableCommentsQuery(): any {
    return {
      text: `CREATE TABLE IF NOT EXISTS COMMENTS(
        comment_id serial PRIMARY KEY,
        text text,
        creator integer,
        post_id integer,
        is_reply boolean,
        CONSTRAINT fk_creator
          FOREIGN KEY(creator) 
          REFERENCES users(user_id),
        CONSTRAINT fk_post
          FOREIGN KEY(post_id) 
          REFERENCES posts(post_id)
          on delete cascade
      );`,
    };
  }

  private createTableRepliesQuery(): any {
    return {
      text: `CREATE TABLE IF NOT EXISTS REPLIES(
        comment_id integer,
        reply_id integer,
        CONSTRAINT fk_comment
          FOREIGN KEY(comment_id) 
          REFERENCES comments(comment_id)
          on delete cascade,
        CONSTRAINT fk_reply
          FOREIGN KEY(reply_id) 
          REFERENCES comments(comment_id)
          on delete cascade
    );`,
    };
  }

  async createTables(): Promise<void> {
    try {
      const connector = await sqlConnector.getConnect();
      await connector.query('BEGIN');
      await connector.query(this.createTableCommentsQuery());
      await connector.query(this.createTableRepliesQuery());
      await connector.query('COMMIT');
    } catch (err) {
      const connector = await sqlConnector.getConnect();
      await connector.query('ROLLBACK');
      const locationError = constructLocationError(
        err,
        LOCATIONS.CREATE_TABLES,
      );
      throw locationError;
    }
  }

  async getAll(): Promise<Array<CommentData>> {
    try {
      const connector = await sqlConnector.getConnect();
      const res = await connector.query(`SELECT * FROM COMMENTS`);
      return res.rows;
    } catch (err) {
      const locationError = constructLocationError(err, LOCATIONS.GET_ALL);
      throw locationError;
    }
  }

  private getByIdQuery(id: any): any {
    return {
      text: `SELECT * FROM COMMENTS where comment_id=$1`,
      values: [id],
    };
  }

  async getById(id: string): Promise<CommentData> {
    try {
      const connector = await sqlConnector.getConnect();
      const res = await connector.query(this.getByIdQuery(id));
      return res.rows[0];
    } catch (err) {
      const locationError = constructLocationError(err, LOCATIONS.GET_BY_ID);
      throw locationError;
    }
  }

  private addRecordCommentQuery(record: CommentData): any {
    return {
      text: `INSERT INTO COMMENTS(text, creator, post_id, is_reply)
      VALUES ( $1, $2, $3, $4)
      Returning comment_id`,
      values: [
        record.text,
        record.creator,
        record.post,
        record.comment ? true : false,
      ],
    };
  }

  private addRecordReplyQuery(record: CommentData, recordId: string): any {
    return {
      text: `INSERT INTO REPLIES(comment_id, reply_Id)
      VALUES ($1, $2);`,
      values: [record.comment, recordId],
    };
  }

  async addRecord(record: CommentData): Promise<void> {
    try {
      const connector = await sqlConnector.getConnect();
      await connector.query('BEGIN;');
      const res = await connector.query(this.addRecordCommentQuery(record));
      const commentId = res.rows[0].comment_id;
      if (record.comment) {
        await connector.query(this.addRecordReplyQuery(record, commentId));
      }
      await connector.query('COMMIT;');
    } catch (err) {
      const connector = await sqlConnector.getConnect();
      await connector.query('ROLLBACK;');
      const locationError = constructLocationError(err, LOCATIONS.ADD_RECORD);
      throw locationError;
    }
  }

  private updateByIdQuery(id: string, text: string): any {
    return {
      text: `UPDATE COMMENTS
      SET
        text='$1',
      WHERE
        comment_id=$2`,
      values: [text, id],
    };
  }

  async updateById(id: string, newRecord: CommentData): Promise<void> {
    try {
      const connector = await sqlConnector.getConnect();
      await connector.query(this.updateByIdQuery(id, newRecord.text));
    } catch (err) {
      const locationError = constructLocationError(err, LOCATIONS.UPDATE_BY_ID);
      throw locationError;
    }
  }

  private removeByIdQuery(id: string): any {
    return {
      text: `DELETE FROM COMMENTS WHERE comment_id=$1`,
      values: [id],
    };
  }

  async removeById(id: string): Promise<void> {
    try {
      const connector = await sqlConnector.getConnect();
      await connector.query(this.removeByIdQuery(id));
    } catch (err) {
      const locationError = constructLocationError(err, LOCATIONS.REMOVE_BY_ID);
      throw locationError;
    }
  }

  private getCommentsRepliesQuery(commentId: string): any {
    return {
      text: `SELECT * FROM COMMENTS
       INNER JOIN REPLIES ON comments.comment_id=replies.reply_id
       where replies.comment_id=$1`,
      values: [commentId],
    };
  }

  async getCommentsReplies(commentId: string): Promise<Array<CommentData>> {
    try {
      const connector = await sqlConnector.getConnect();
      const res = await connector.query(
        this.getCommentsRepliesQuery(commentId),
      );
      return this.rowsToRepliesData(res.rows);
    } catch (err) {
      const locationError = constructLocationError(
        err,
        LOCATIONS.GET_COMMENTS_REPLIES,
      );
      throw locationError;
    }
  }

  private getPostCommentsQuery(postId: string): any {
    return {
      text: `SELECT * FROM COMMENTS WHERE post_id=$1 AND is_reply=false`,
      values: [postId],
    };
  }

  async getPostComments(postId: string): Promise<Array<CommentData>> {
    try {
      const connector = await sqlConnector.getConnect();
      const res = await connector.query(this.getPostCommentsQuery(postId));
      return this.rowsToCommentsData(res.rows);
    } catch (err) {
      const locationError = constructLocationError(
        err,
        LOCATIONS.GET_POST_COMMENTS,
      );
      throw locationError;
    }
  }

  rowsToRepliesData(rows: Array<any>): Array<CommentData> {
    return rows.map(this.toReplyData);
  }

  toReplyData(row: any): CommentData {
    const {
      creator,
      post_id: postId,
      text,
      comment_id: commentId,
      reply_id: replyId,
    } = row;
    return {
      text,
      id: replyId,
      creator: creator,
      comment: commentId,
      post: postId,
    };
  }

  toCommentData(row: any): CommentData {
    const {
      creator,
      post_id: postId,
      text,
      comment_id: id,
      reply_id: replyId,
    } = row;
    return {
      text,
      id,
      creator: creator,
      comment: replyId,
      post: postId,
    };
  }

  rowsToCommentsData(rows: Array<any>): Array<CommentData> {
    return rows.map(this.toCommentData);
  }
}

export default CommentSQLDBConnector;
