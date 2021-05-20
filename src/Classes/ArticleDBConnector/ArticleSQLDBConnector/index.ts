import { PoolClient } from 'pg';
import { getConnector } from '../../../Connect/sqlDBConnector';
import ArticleData from '../../../Interfaces/Data/Article';
import ArticleDBConnector from '../../../Interfaces/DBConnectors/ArticleDBConnector';
import SQLDBConnector from '../../DBConnector/SQLDBConnector';

class ArticleSQLDBConnector extends SQLDBConnector
  implements ArticleDBConnector {
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
        `CREATE TABLE IF NOT EXISTS ARTICLES(
            article_id uuid Primary key,
            creator uuid,
            title varchar(255),
            cover varchar(255),
            approved boolean,
            CONSTRAINT fk_creator
              FOREIGN KEY(creator) 
              REFERENCES users(user_id)
          );`,
      );
      await this.connector.query(
        `CREATE TABLE IF NOT EXISTS SECTIONS(
            section_id uuid Primary key,
            section_title varchar(255),
            text text,
            article_id uuid,
            CONSTRAINT fk_article
              FOREIGN KEY(article_id) 
              REFERENCES articles(article_id)
              on delete cascade
        )`,
      );
      await this.connector.query(
        `CREATE TABLE IF NOT EXISTS IMAGES(
            image_id uuid Primary Key,
            section_id uuid,
            image_url varchar(255),
            CONSTRAINT fk_section
              FOREIGN KEY(section_id) 
              REFERENCES sections(section_id)
              on delete cascade
        )`,
      );
      await this.connector.query('COMMIT');
    } catch (err) {
      await this.connector.query('ROLLBACK');
      throw err;
    }
  }

  async getAll(): Promise<Array<ArticleData>> {
    const res = await this.connector.query(`SELECT * FROM ARTICLES`);
    return this.rowsToArticles(res.rows);
  }

  async getById(id: string): Promise<ArticleData | void> {
    const res = await this.connector.query(
      `SELECT * FROM ARTICLES
       LEFT JOIN SECTIONS using(article_id)
       LEFT JOIN IMAGES using(section_id)
       where article_id='${id}'
      `,
    );
    return res.rows.length > 0 ? this.rowsToArticleData(res.rows) : undefined;
  }

  async addRecord(record: ArticleData): Promise<void> {
    try {
      await this.connector.query('BEGIN');
      await this.connector.query(
        `INSERT INTO 
          ARTICLES(article_id, creator, cover, title, approved)
          VALUES ('${record.id}', '${record.creator}', '${record.cover}', '${record.title}', ${record.approved})`,
      );
      const promises: Array<Promise<any>> = [];
      for (const section of record.sections) {
        const sectionId = this.generateId();
        const promise = this.connector.query(
          `INSERT INTO 
           SECTIONS(section_id, section_title, text, article_id)
           VALUES ('${sectionId}', '${section.title}', '${section.text}', '${record.id}')`,
        );
        promises.push(promise);
        for (const image of section.images) {
          const imageId = this.generateId();
          const promise = this.connector.query(
            `INSERT INTO 
             IMAGES(image_id, section_id, image_url)
             VALUES ('${imageId}', '${sectionId}', '${image.value}')`,
          );
          promises.push(promise);
        }
      }
      await Promise.all(promises);
      await this.connector.query('COMMIT');
    } catch (err) {
      await this.connector.query('ROLLBACK');
      throw err;
    }
  }

  async removeById(id: string): Promise<void> {
    await this.connector.query(`DELETE FROM ARTICLES WHERE article_id='${id}'`);
  }

  async updateById(id: string, newRecord: ArticleData): Promise<void> {
    try {
      await this.connector.query('BEGIN');
      await this.removeById(id);
      await this.addRecord(newRecord);
      await this.connector.query('COMMIT');
    } catch (err) {
      await this.connector.query('ROLLBACK');
      throw err;
    }
  }

  async getArticlesByUser(userId: string): Promise<Array<ArticleData>> {
    const res = await this.connector.query(
      `SELECT * FROM ARTICLES WHERE creator='${userId}'`,
    );
    return this.rowsToArticles(res.rows);
  }

  async getApprovedArticles(): Promise<Array<ArticleData>> {
    const res = await this.connector.query(
      `SELECT * FROM ARTICLES WHERE approved=true`,
    );
    return this.rowsToArticles(res.rows);
  }

  async getArticlesByTitle(title: string): Promise<Array<ArticleData>> {
    const res = await this.connector.query(
      `SELECT * FROM ARTICLES WHERE title ILIKE '%${title}%'`,
    );
    return this.rowsToArticles(res.rows);
  }

  async getNotApprovedArticles(): Promise<Array<ArticleData>> {
    const res = await this.connector.query(
      `SELECT * FROM ARTICLES WHERE approved=false`,
    );
    return this.rowsToArticles(res.rows);
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
