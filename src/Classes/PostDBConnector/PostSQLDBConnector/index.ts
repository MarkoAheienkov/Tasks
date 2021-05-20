import { PoolClient } from 'pg';
import { getConnector } from '../../../Connect/sqlDBConnector';
import PostData from '../../../Interfaces/Data/Post';
import PostDBConnector from '../../../Interfaces/DBConnectors/PostDBConnector';
import SQLDBConnector from '../../DBConnector/SQLDBConnector';

class PostSQLDBConnector extends SQLDBConnector implements PostDBConnector {
  connector: PoolClient;
  constructor() {
    super();
    this.connector = getConnector();
    this.createTables();
  }
  async createTables(): Promise<void> {
    try {
      await this.connector.query(`BEGIN`);
      await this.connector.query(
        `CREATE TABLE IF NOT EXISTS POSTS(
            post_id uuid PRIMARY KEY,
            title varchar(255),
            body text,
            creator uuid,
            CONSTRAINT fk_creator
              FOREIGN KEY(creator) 
              REFERENCES users(user_id)
          );`,
      );
      await this.connector.query(`COMMIT`);
    } catch (err) {
      this.connector.query(`ROLLBACK`);
      throw err;
    }
  }

  async getAll(): Promise<Array<PostData>> {
    const res = await this.connector.query(`SELECT * FROM posts`);
    return this.rowsToPostsData(res.rows);
  }

  async getById(id: string): Promise<PostData> {
    const res = await this.connector.query(
      `SELECT * FROM posts where post_id='${id}'`,
    );
    return res.rows[0];
  }

  async addRecord(record: PostData): Promise<void> {
    await this.connector.query(
      `INSERT INTO POSTS(post_id, title, body, creator)
       VALUES ('${record.id}', '${record.title}', '${record.body}', '${record.creator}')`,
    );
  }

  async getPostsByTitle(title: string): Promise<Array<PostData>> {
    const res = await this.connector.query(
      `SELECT * FROM posts WHERE title ILIKE '%${title}%'`,
    );
    return this.rowsToPostsData(res.rows);
  }

  async updateById(id: string, newRecord: PostData): Promise<void> {
    await this.connector.query(
      `UPDATE POSTS
       SET
         title='${newRecord.title}',
         body='${newRecord.body}',
       WHERE
         post_id=${id}`,
    );
  }
  async removeById(id: string): Promise<void> {
    await this.connector.query(`DELETE FROM POSTS WHERE post_id=${id}`);
  }

  toPostData(row: any): PostData {
    const { creator, title, post_id: id, body } = row;
    return {
      title,
      id,
      body,
      creator,
    };
  }

  rowsToPostsData(rows: Array<any>): Array<PostData> {
    return rows.map(this.toPostData);
  }
}

export default PostSQLDBConnector;
