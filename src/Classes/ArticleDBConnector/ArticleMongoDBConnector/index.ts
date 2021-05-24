import mongoConnector from '../../../Connect/mongoDBConnector';
import constructLocationError from '../../../Helpers/constructLocationError';
import ArticleData from '../../../Interfaces/Data/Article';
import ArticleDBConnector from '../../../Interfaces/DBConnectors/ArticleDBConnector';
import MongoDBConnector from '../../DBConnector/MongoDBConnector';
import { LOCATIONS } from './constants';

class ArticleMongoDBConnector extends MongoDBConnector
  implements ArticleDBConnector {
  constructor() {
    super(mongoConnector, 'articles');
    this.createIndex();
  }

  async createIndex(): Promise<void> {
    try {
      const collection = await this.getCollection();
      collection.createIndex({ title: 1 });
    } catch (err) {
      const locationError = constructLocationError(err, LOCATIONS.CREATE_INDEX);
      throw locationError;
    }
  }

  async getApprovedArticles(): Promise<Array<ArticleData>> {
    try {
      const collection = await this.getCollection();
      const articles = await collection.find({ approved: true }).toArray();
      return this.transforArrayIds(articles) as Array<ArticleData>;
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
      const collection = await this.getCollection();
      const articles = await collection.find({ approved: false }).toArray();
      return this.transforArrayIds(articles) as Array<ArticleData>;
    } catch (err) {
      const locationError = constructLocationError(
        err,
        LOCATIONS.GET_NOT_APPROVED_ARTICLES,
      );
      throw locationError;
    }
  }

  async getArticlesByUser(userId: string): Promise<Array<ArticleData>> {
    try {
      const collection = await this.getCollection();
      const articles = await collection.find({ creator: userId }).toArray();
      return this.transforArrayIds(articles) as Array<ArticleData>;
    } catch (err) {
      const locationError = constructLocationError(
        err,
        LOCATIONS.GET_ARTICLES_BY_USER,
      );
      throw locationError;
    }
  }

  async getArticlesByTitle(title: string): Promise<Array<ArticleData>> {
    try {
      const collection = await this.getCollection();
      const articles = await collection.find({ title: title }).toArray();
      return this.transforArrayIds(articles) as Array<ArticleData>;
    } catch (err) {
      const locationError = constructLocationError(
        err,
        LOCATIONS.GET_ARTICLES_BY_TITLE,
      );
      throw locationError;
    }
  }
}

export default ArticleMongoDBConnector;
