import { getDB } from '../../../Connect/mongoDBConnector';
import ArticleData from '../../../Interfaces/Data/Article';
import ArticleDBConnector from '../../../Interfaces/DBConnectors/ArticleDBConnector';
import MongoDBConnector from '../../DBConnector/MongoDBConnector';

class ArticleMongoDBConnector extends MongoDBConnector
  implements ArticleDBConnector {
  constructor() {
    super(getDB().collection('articles'));
  }

  async getApprovedArticles(): Promise<Array<ArticleData>> {
    const articles = await this.collection.find({ approved: true }).toArray();
    return this.transforArrayIds(articles) as Array<ArticleData>;
  }

  async getNotApprovedArticles(): Promise<Array<ArticleData>> {
    const articles = await this.collection.find({ approved: false }).toArray();
    return this.transforArrayIds(articles) as Array<ArticleData>;
  }

  async getArticlesByUser(userId: string): Promise<Array<ArticleData>> {
    const articles = await this.collection.find({ creator: userId }).toArray();
    return this.transforArrayIds(articles) as Array<ArticleData>;
  }

  async getArticlesByTitle(title: string): Promise<Array<ArticleData>> {
    const articles = await this.collection.find({ title: title }).toArray();
    return this.transforArrayIds(articles) as Array<ArticleData>;
  }
}

export default ArticleMongoDBConnector;
