import sqlConnector from '../../../Connect/sqlDBConnector';
import constructLocationError from '../../../Helpers/constructLocationError';
import PostData from '../../../Interfaces/Data/Post';
import PostDBConnector from '../../../Interfaces/DBConnectors/PostDBConnector';
import SQLDBConnector from '../../DBConnector/SQLDBConnector';
import { LOCATIONS } from './constants';

class PostSQLDBConnector extends SQLDBConnector implements PostDBConnector {
  constructor() {
    super();
  }

  private createTablePosts(): any {
    return {
      text: `CREATE TABLE IF NOT EXISTS juggling.POSTS(
        post_id serial PRIMARY KEY,
        title varchar(255),
        body text,
        creator integer,
        CONSTRAINT fk_creator
          FOREIGN KEY(creator) 
          REFERENCES juggling.users(user_id)
      );`,
    };
  }

  async createTables(): Promise<void> {
    try {
      const connector = await sqlConnector.getConnect();
      await connector.query(`BEGIN`);
      await connector.query(this.createTablePosts());
      await connector.query(`COMMIT`);
    } catch (err) {
      const connector = await sqlConnector.getConnect();
      connector.query(`ROLLBACK`);
      const locationError = constructLocationError(
        err,
        LOCATIONS.CREATE_TABLES,
      );
      throw locationError;
    }
  }

  async init(): Promise<void> {
    try {
      await this.createTables();
    } catch (err) {
      const locationError = constructLocationError(err, LOCATIONS.INIT);
      throw locationError;
    }
  }

  private gelAllQuery(): any {
    return {
      text: `SELECT * FROM juggling.posts`,
      values: [],
    };
  }

  async getAll(): Promise<Array<PostData>> {
    try {
      const connector = await sqlConnector.getConnect();
      const res = await connector.query(this.gelAllQuery());
      return this.rowsToPostsData(res.rows);
    } catch (err) {
      const locationError = constructLocationError(err, LOCATIONS.GET_ALL);
      throw locationError;
    }
  }

  private getByIdQuery(id: string): any {
    return {
      text: `SELECT * FROM juggling.posts where post_id=$1`,
      values: [id],
    };
  }

  async getById(id: string): Promise<PostData> {
    try {
      const connector = await sqlConnector.getConnect();
      const res = await connector.query(this.getByIdQuery(id));
      return res.rows[0];
    } catch (err) {
      const locationError = constructLocationError(err, LOCATIONS.GET_BY_ID);
      throw locationError;
    }
  }

  private addRecordQuery(record: PostData): any {
    return {
      text: `INSERT INTO juggling.POSTS(title, body, creator)
        VALUES ($1, $2, $3)`,
      values: [record.title, record.body, record.creator],
    };
  }

  async addRecord(record: PostData): Promise<void> {
    try {
      const connector = await sqlConnector.getConnect();
      await connector.query(this.addRecordQuery(record));
    } catch (err) {
      const locationError = constructLocationError(err, LOCATIONS.ADD_RECORD);
      throw locationError;
    }
  }

  private getPostsByTitleQuery(title: string): any {
    return {
      text: `SELECT * FROM juggling.posts WHERE juggling.posts.title ILIKE %$1%`,
      values: [title],
    };
  }

  async getPostsByTitle(title: string): Promise<Array<PostData>> {
    try {
      const connector = await sqlConnector.getConnect();
      const res = await connector.query(this.getPostsByTitleQuery(title));
      return this.rowsToPostsData(res.rows);
    } catch (err) {
      const locationError = constructLocationError(
        err,
        LOCATIONS.GET_POSTS_BY_TITLE,
      );
      throw locationError;
    }
  }

  private updateByIdQuery(id: string, newRecord: PostData): any {
    return {
      text: `UPDATE juggling.POSTS
      SET
        title=$1,
        body=$2,
      WHERE
        post_id=$3`,
      values: [newRecord.title, newRecord.body, id],
    };
  }

  async updateById(id: string, newRecord: PostData): Promise<void> {
    try {
      const connector = await sqlConnector.getConnect();
      await connector.query(this.updateByIdQuery(id, newRecord));
    } catch (err) {
      const locationError = constructLocationError(err, LOCATIONS.UPDATE_BY_ID);
      throw locationError;
    }
  }

  private removeByIdQuery(id: string): any {
    return {
      text: `DELETE FROM juggling.POSTS WHERE post_id=$1`,
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
