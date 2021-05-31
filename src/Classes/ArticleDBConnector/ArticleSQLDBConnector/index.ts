import sqlConnector from '../../../Connect/sqlDBConnector';
import constructLocationError from '../../../Helpers/constructLocationError';
import ArticleData from '../../../Interfaces/Data/Article';
import ArticleDBConnector from '../../../Interfaces/DBConnectors/ArticleDBConnector';
import SQLDBConnector from '../../DBConnector/SQLDBConnector';
import { LOCATIONS } from './constants';

class ArticleSQLDBConnector extends SQLDBConnector
  implements ArticleDBConnector {
  constructor() {
    super();
    this.createTables();
  }

  private createTableArticlesQuery(): any {
    return {
      text: `CREATE TABLE IF NOT EXISTS ARTICLES(
        article_id serial Primary key,
        creator integer,
        title varchar(255),
        cover varchar(255),
        approved boolean,
        CONSTRAINT fk_creator
          FOREIGN KEY(creator) 
          REFERENCES users(user_id)
      )`,
      values: [],
    };
  }

  private createTableSectionsQuery(): any {
    return {
      text: `CREATE TABLE IF NOT EXISTS SECTIONS(
        section_id SERIAL Primary key,
        section_title varchar(255),
        text text,
        article_id integer,
        CONSTRAINT fk_article
          FOREIGN KEY(article_id) 
          REFERENCES articles(article_id)
          on delete cascade
      )`,
      values: [],
    };
  }

  private createTableImagesQuery(): any {
    return {
      text: `CREATE TABLE IF NOT EXISTS IMAGES(
          image_id SERIAL Primary Key,
          section_id integer,
          image_url varchar(255),
          CONSTRAINT fk_section
            FOREIGN KEY(section_id) 
            REFERENCES sections(section_id)
            on delete cascade
      )`,
      values: [],
    };
  }

  async createTables(): Promise<void> {
    try {
      const connector = await sqlConnector.getConnect();
      await connector.query('BEGIN');
      await connector.query(this.createTableArticlesQuery());
      await connector.query(this.createTableSectionsQuery());
      await connector.query(this.createTableImagesQuery());
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

  async getAll(): Promise<Array<ArticleData>> {
    try {
      const connector = await sqlConnector.getConnect();
      const res = await connector.query(`SELECT * FROM ARTICLES`);
      return this.rowsToArticles(res.rows);
    } catch (err) {
      const locationError = constructLocationError(err, LOCATIONS.GET_ALL);
      throw locationError;
    }
  }

  private getByIdQuery(id: any): any {
    return {
      text: `SELECT * FROM ARTICLES
      LEFT JOIN SECTIONS using(article_id)
      LEFT JOIN IMAGES using(section_id)
      where article_id=$1
     `,
      values: [id],
    };
  }

  async getById(id: string): Promise<ArticleData | void> {
    try {
      const connector = await sqlConnector.getConnect();
      const res = await connector.query(this.getByIdQuery(id));
      return res.rows.length > 0 ? this.rowsToArticleData(res.rows) : undefined;
    } catch (err) {
      const locationError = constructLocationError(err, LOCATIONS.GET_BY_ID);
      throw locationError;
    }
  }

  private addRecordArticleQuery(record: ArticleData): any {
    return {
      text: `
      INSERT INTO 
      ARTICLES(creator, cover, title, approved)
      VALUES ($1, $2, $3, $4)
      RETURNING article_id`,
      values: [record.creator, record.cover, record.title, record.approved],
    };
  }

  private addRecordSectionQuery(section: any, articleId: string): any {
    return {
      text: `
      INSERT INTO 
      SECTIONS(section_title, text, article_id)
      VALUES ($1, $2, $3)
      RETURNING section_id`,
      values: [section.title, section.text, articleId],
    };
  }

  private addRecordImageQuery(sectionId: string, imageUrl: string): any {
    return {
      text: `
      INSERT INTO 
      IMAGES(section_id, image_url)
      VALUES ($1, $2)`,
      values: [sectionId, imageUrl],
    };
  }

  async addRecord(record: ArticleData): Promise<void> {
    try {
      const connector = await sqlConnector.getConnect();
      await connector.query('BEGIN');
      const res = await connector.query(this.addRecordArticleQuery(record));
      const articleId = res.rows[0].article_id;
      const imagePromises: Array<Promise<any>> = [];
      for (const section of record.sections) {
        const res = await connector.query(
          this.addRecordSectionQuery(section, articleId),
        );
        const sectionId = res.rows[0].section_id;
        for (const image of section.images) {
          const promise = connector.query(
            this.addRecordImageQuery(sectionId, image.value),
          );
          imagePromises.push(promise);
        }
      }
      await Promise.all(imagePromises);
      await connector.query('COMMIT');
    } catch (err) {
      const connector = await sqlConnector.getConnect();
      await connector.query('ROLLBACK');
      const locationError = constructLocationError(err, LOCATIONS.ADD_RECORD);
      throw locationError;
    }
  }

  private removeByIdQuery(id: string): any {
    return {
      text: `DELETE FROM ARTICLES WHERE article_id=$1`,
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

  async updateById(id: string, newRecord: ArticleData): Promise<void> {
    try {
      const connector = await sqlConnector.getConnect();
      await connector.query('BEGIN');
      await this.removeById(id);
      await this.addRecord(newRecord);
      await connector.query('COMMIT');
    } catch (err) {
      const connector = await sqlConnector.getConnect();
      await connector.query('ROLLBACK');
      const locationError = constructLocationError(err, LOCATIONS.UPDATE_BY_ID);
      throw locationError;
    }
  }

  private getArticlesByUserQuery(userId: string): any {
    return {
      text: `SELECT * FROM ARTICLES WHERE creator=$1`,
      values: [userId],
    };
  }

  async getArticlesByUser(userId: string): Promise<Array<ArticleData>> {
    try {
      const connector = await sqlConnector.getConnect();
      const res = await connector.query(this.getArticlesByUserQuery(userId));
      return this.rowsToArticles(res.rows);
    } catch (err) {
      const locationError = constructLocationError(
        err,
        LOCATIONS.GET_ARTICLES_BY_USER,
      );
      throw locationError;
    }
  }

  private getArticlesByApproveQuery(approve: boolean): any {
    return {
      text: `SELECT * FROM ARTICLES WHERE approved=$1`,
      values: [approve],
    };
  }

  async getApprovedArticles(): Promise<Array<ArticleData>> {
    try {
      const connector = await sqlConnector.getConnect();
      const res = await connector.query(this.getArticlesByApproveQuery(true));
      return this.rowsToArticles(res.rows);
    } catch (err) {
      const locationError = constructLocationError(
        err,
        LOCATIONS.GET_APPROVED_ARTICLES,
      );
      throw locationError;
    }
  }

  async getNotApprovedArticles(): Promise<Array<ArticleData>> {
    try {
      const connector = await sqlConnector.getConnect();
      const res = await connector.query(this.getArticlesByApproveQuery(false));
      return this.rowsToArticles(res.rows);
    } catch (err) {
      const locationError = constructLocationError(
        err,
        LOCATIONS.GET_NOT_APPROVED_ARTICLES,
      );
      throw locationError;
    }
  }

  private getArticlesByTitleQuery(title: string): any {
    return {
      text: `SELECT * FROM ARTICLES WHERE title ILIKE $1`,
      values: [title],
    };
  }

  async getArticlesByTitle(title: string): Promise<Array<ArticleData>> {
    try {
      const connector = await sqlConnector.getConnect();
      const res = await connector.query(this.getArticlesByTitleQuery(title));
      return this.rowsToArticles(res.rows);
    } catch (err) {
      const locationError = constructLocationError(
        err,
        LOCATIONS.GET_ARTICLES_BY_TITLE,
      );
      throw locationError;
    }
  }

  toArticle(row: any): any {
    const { article_id: id, title, cover, creator } = row;
    return {
      id,
      title,
      cover,
      creator,
    };
  }

  rowsToArticles(rows: Array<any>): Array<any> {
    return rows.map(this.toArticle);
  }

  rowsToArticleData(rows: Array<any>): ArticleData {
    const { approved, title, cover, creator, article_id: id } = rows[0];
    const sectionsMap: any = {};
    rows.forEach(row => {
      const {
        section_id: sectiondId,
        section_title: sectionTitle,
        text,
        image_url: imageUrl,
        image_id: imageId,
      } = row;
      if (!sectionsMap[sectiondId]) {
        sectionsMap[sectiondId] = {
          id: sectiondId,
          title: sectionTitle,
          text: text,
          images: [],
        };
      }
      sectionsMap[sectiondId].images.push({ id: imageId, value: imageUrl });
    });
    const sections: Array<any> = Object.values(sectionsMap);
    return {
      id,
      title,
      cover,
      creator,
      approved,
      sections,
    };
  }
}

export default ArticleSQLDBConnector;
