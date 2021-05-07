import ArticleDBConnector from '../Interfaces/DBConnectors/ArticleDBConnector';
import { v4 } from 'uuid';
import Model from '../Interfaces/Model';
import ArticleData from '../Interfaces/Data/Article';
import Section from '../Interfaces/Data/Section';

class Article implements Model {
  title: string;
  cover: string;
  articleDBConnector: ArticleDBConnector;
  id: string;
  approved: boolean;
  creator: string;
  sections: Array<Section>;
  constructor(
    title: string,
    cover: string,
    creator: string,
    sections: Array<Section>,
    articleDBConnector: ArticleDBConnector,
    approved?: boolean,
    id?: string,
  ) {
    this.title = title;
    this.cover = cover;
    this.articleDBConnector = articleDBConnector;
    this.id = id || v4();
    this.approved = approved || false;
    this.creator = creator;
    this.sections = sections;
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

  static async getAllApproved(
    articleDBConnector: ArticleDBConnector,
  ): Promise<Array<Article>> {
    const articlesData = await articleDBConnector.getApprovedArticles();
    const articles = articlesData.map((articleData: ArticleData) => {
      return Article.toModel(articleDBConnector, articleData);
    });
    return articles;
  }

  static async getAllNotApproved(
    articleDBConnector: ArticleDBConnector,
  ): Promise<Array<Article>> {
    const articlesData = await articleDBConnector.getNotApprovedArticles();
    const articles = articlesData.map((articleData: ArticleData) => {
      return Article.toModel(articleDBConnector, articleData);
    });
    return articles;
  }

  static async getUserArticles(
    articleDBConnector: ArticleDBConnector,
    userId: string,
  ): Promise<Array<Article>> {
    const articlesData = await articleDBConnector.getArticlesByUser(userId);
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
    const { title, cover, id, creator, approved, sections } = this;
    return {
      title,
      cover,
      id,
      creator,
      sections,
      approved,
    };
  }

  static toModel(
    articleDBConnector: ArticleDBConnector,
    articleData: ArticleData,
  ): Article {
    const { title, sections, cover, id, approved, creator } = articleData;
    return new Article(
      title,
      cover,
      creator,
      sections,
      articleDBConnector,
      approved,
      id,
    );
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
