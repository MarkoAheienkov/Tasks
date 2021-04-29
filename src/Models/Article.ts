import ArticleDBConnector from '../Interfaces/DBConnectors/ArticleDBConnector';
import { v4 } from 'uuid';
import Model from '../Interfaces/Model';
import ArticleData from '../Interfaces/Data/Article';

class Article implements Model {
  title: string;
  body: string;
  articleDBConnector: ArticleDBConnector;
  id: string;
  approved: boolean;
  creator: string;
  constructor(
    title: string,
    body: string,
    creator: string,
    articleDBConnector: ArticleDBConnector,
    approved?: boolean,
    id?: string,
  ) {
    this.title = title;
    this.body = body;
    this.articleDBConnector = articleDBConnector;
    this.id = id || v4();
    this.approved = approved || false;
    this.creator = creator;
  }
  static async getAll(
    articleDBConnector: ArticleDBConnector,
  ): Promise<Array<Article>> {
    const articlesData = await articleDBConnector.getAll();
    const articles = articlesData.map((articleData: ArticleData) => {
      return Article.toModel(articleDBConnector, articleData);
    });
    return articles;
  }

  static async getById(
    articleDBConnector: ArticleDBConnector,
    id: string,
  ): Promise<Article | void> {
    const articleData = await articleDBConnector.getById(id);
    return Article.toModel(articleDBConnector, articleData);
  }

  toObject(): ArticleData {
    const { title, body, id, creator, approved } = this;
    return {
      title,
      body,
      id,
      creator,
      approved,
    };
  }

  static toModel(
    articleDBConnector: ArticleDBConnector,
    articleData: ArticleData,
  ): Article {
    const { title, body, id, approved, creator } = articleData;
    return new Article(title, body, creator, articleDBConnector, approved, id);
  }

  async approve(): Promise<void> {
    this.approved = true;
    await this.save();
  }

  async save(): Promise<void> {
    const articleData = this.toObject();
    const candidate = await this.articleDBConnector.getById(this.id);
    if (candidate) {
      this.articleDBConnector.updateById(this.id, articleData);
    } else {
      this.articleDBConnector.addRecord(articleData);
    }
  }

  async remove(): Promise<void> {
    await this.articleDBConnector.removeById(this.id);
  }
}

export default Article;
