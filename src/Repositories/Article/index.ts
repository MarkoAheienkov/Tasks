import ArticleDBConnector from '../../Interfaces/DBConnectors/ArticleDBConnector';
import Model from '../../Interfaces/Model';
import ArticleData from '../../Interfaces/Data/Article';
import Section from '../../Interfaces/Data/Section';
import constructLocationError from '../../Helpers/constructLocationError';
import { LOCATIONS } from './constants';

class ArticleRepository implements Model {
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
    this.id = id || articleDBConnector.generateId();
    this.approved = approved || false;
    this.creator = creator;
    this.sections = sections;
  }
  static async getAll(
    articleDBConnector: ArticleDBConnector,
  ): Promise<Array<ArticleRepository>> {
    try {
      const articlesData = await articleDBConnector.getAll();
      const articles = articlesData.map((articleData: ArticleData) => {
        return ArticleRepository.toModel(articleDBConnector, articleData);
      });
      return articles;
    } catch (err) {
      const locationError = constructLocationError(err, LOCATIONS.GET_ALL);
      throw locationError;
    }
  }

  static async getAllApproved(
    articleDBConnector: ArticleDBConnector,
  ): Promise<Array<ArticleRepository>> {
    try {
      const articlesData = await articleDBConnector.getApprovedArticles();
      const articles = articlesData.map((articleData: ArticleData) => {
        return ArticleRepository.toModel(articleDBConnector, articleData);
      });
      return articles;
    } catch (err) {
      const locationError = constructLocationError(
        err,
        LOCATIONS.GET_ALL_APPROVED,
      );
      throw locationError;
    }
  }

  static async getAllNotApproved(
    articleDBConnector: ArticleDBConnector,
  ): Promise<Array<ArticleRepository>> {
    try {
      const articlesData = await articleDBConnector.getNotApprovedArticles();
      const articles = articlesData.map((articleData: ArticleData) => {
        return ArticleRepository.toModel(articleDBConnector, articleData);
      });
      return articles;
    } catch (err) {
      const locationError = constructLocationError(
        err,
        LOCATIONS.GET_ALL_NOT_APPROVED,
      );
      throw locationError;
    }
  }

  static async getUserArticles(
    articleDBConnector: ArticleDBConnector,
    userId: string,
  ): Promise<Array<ArticleRepository>> {
    try {
      const articlesData = await articleDBConnector.getArticlesByUser(userId);
      const articles = articlesData.map((articleData: ArticleData) => {
        return ArticleRepository.toModel(articleDBConnector, articleData);
      });
      return articles;
    } catch (err) {
      const locationError = constructLocationError(
        err,
        LOCATIONS.GET_USER_ARTICLES,
      );
      throw locationError;
    }
  }

  static async getById(
    articleDBConnector: ArticleDBConnector,
    id: string,
  ): Promise<ArticleRepository | void> {
    try {
      const articleData = await articleDBConnector.getById(id);
      return ArticleRepository.toModel(articleDBConnector, articleData);
    } catch (err) {
      const locationError = constructLocationError(err, LOCATIONS.GET_BY_ID);
      throw locationError;
    }
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
  ): ArticleRepository {
    const { title, sections, cover, id, approved, creator } = articleData;
    return new ArticleRepository(
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
    try {
      this.approved = true;
      await this.save();
    } catch (err) {
      const locationError = constructLocationError(err, LOCATIONS.APPROVE);
      throw locationError;
    }
  }

  async save(): Promise<void> {
    try {
      const articleData = this.toObject();
      const candidate = await this.articleDBConnector.getById(this.id);
      if (candidate) {
        this.articleDBConnector.updateById(this.id, articleData);
      } else {
        this.articleDBConnector.addRecord(articleData);
      }
    } catch (err) {
      const locationError = constructLocationError(err, LOCATIONS.SAVE);
      throw locationError;
    }
  }

  async remove(): Promise<void> {
    try {
      await this.articleDBConnector.removeById(this.id);
    } catch (err) {
      const locationError = constructLocationError(err, LOCATIONS.REMOVE);
      throw locationError;
    }
  }
}

export default ArticleRepository;
