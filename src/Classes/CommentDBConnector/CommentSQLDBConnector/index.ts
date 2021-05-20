import { PoolClient } from 'pg';
import { getConnector } from '../../../Connect/sqlDBConnector';
import CommentData from '../../../Interfaces/Data/Comment';
import CommentDBConnector from '../../../Interfaces/DBConnectors/CommentDBConnector';
import SQLDBConnector from '../../DBConnector/SQLDBConnector';

class CommentSQLDBConnector extends SQLDBConnector
  implements CommentDBConnector {
  connector: PoolClient;
  constructor() {
    super();
    this.connector = getConnector();
    this.createTables();
  }

  async createTables(): Promise<void> {
    try {
      await this.connector.query('BEGIN');
      await this.connector.query(
        `CREATE TABLE IF NOT EXISTS COMMENTS(
            comment_id uuid PRIMARY KEY,
            text text,
            creator uuid,
            post_id uuid,
            is_reply boolean,
            CONSTRAINT fk_creator
              FOREIGN KEY(creator) 
              REFERENCES users(user_id),
            CONSTRAINT fk_post
              FOREIGN KEY(post_id) 
              REFERENCES posts(post_id)
              on delete cascade
          );`,
      );
      await this.connector.query(
        `CREATE TABLE IF NOT EXISTS REPLIES(
            comment_id uuid,
            reply_id uuid,
            CONSTRAINT fk_comment
              FOREIGN KEY(comment_id) 
              REFERENCES comments(comment_id)
              on delete cascade,
            CONSTRAINT fk_reply
              FOREIGN KEY(reply_id) 
              REFERENCES comments(comment_id)
              on delete cascade
        );`,
      );
      await this.connector.query('COMMIT');
    } catch (err) {
      await this.connector.query('ROLLBACK');
      throw err;
    }
  }

  async getAll(): Promise<Array<CommentData>> {
    const res = await this.connector.query(`SELECT * FROM COMMENTS`);
    return res.rows;
  }

  async getById(id: string): Promise<CommentData> {
    const res = await this.connector.query(
      `SELECT * FROM COMMENTS where comment_id='${id}'`,
    );
    return res.rows[0];
  }

  async addRecord(record: CommentData): Promise<void> {
    try {
      await this.connector.query('BEGIN;');
      await this.connector.query(
        `INSERT INTO COMMENTS(comment_id, text, creator, post_id, is_reply)
        VALUES (
          '${record.id}',
          '${record.text}',
          '${record.creator}',
          '${record.post}',
          ${record.comment ? true : false}
        )`,
      );
      if (record.comment) {
        await this.connector.query(
          `INSERT INTO REPLIES(comment_id, reply_Id)
          VALUES (
            '${record.comment}',
            '${record.id}'
          );`,
        );
      }
      await this.connector.query('COMMIT;');
    } catch (err) {
      await this.connector.query('ROLLBACK;');
      throw err;
    }
  }

  async updateById(id: string, newRecord: CommentData): Promise<void> {
    await this.connector.query(
      `UPDATE POSTS
       SET
         text='${newRecord.text}',
       WHERE
         comment_id=${id}`,
    );
  }
  async removeById(id: string): Promise<void> {
    await this.connector.query(`DELETE FROM COMMENTS WHERE comment_id='${id}'`);
  }

  async getCommentsReplies(commentId: string): Promise<Array<CommentData>> {
    const res = await this.connector.query(
      `SELECT * FROM COMMENTS
       INNER JOIN REPLIES ON comments.comment_id=replies.reply_id
       where replies.comment_id='${commentId}'`,
    );
    return this.rowsToRepliesData(res.rows);
  }

  async getPostComments(postId: string): Promise<Array<CommentData>> {
    const res = await this.connector.query(
      `SELECT * FROM COMMENTS WHERE post_id='${postId}' AND is_reply=false`,
    );
    return this.rowsToCommentsData(res.rows);
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
