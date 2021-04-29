import articlesDB from '../../../DB/articles';
import ArticleData from '../../../Interfaces/Data/Article';
import ArticleDBConnector from '../../../Interfaces/DBConnectors/ArticleDBConnector';

class ArticleFileDBConnector implements ArticleDBConnector {
  async getAll(): Promise<Array<ArticleData>> {
    return [...articlesDB.articles];
  }
  async addRecord(article: ArticleData): Promise<void> {
    const articles = articlesDB.articles;
    articles.push(article);
    articlesDB.setArticles(articles);
  }
  async getById(id: string): Promise<ArticleData | void> {
    return articlesDB.articles.find(article => {
      return article.id.toString() === id.toString();
    });
  }
  async removeById(id: string): Promise<void> {
    const articles = articlesDB.articles.filter(article => {
      return article.id.toString() !== id.toString();
    });
    articlesDB.setArticles(articles);
  }
  async updateById(id: string, newArticleInfo: ArticleData): Promise<void> {
    const articles = articlesDB.articles;
    const articleIdx = articles.findIndex(article => {
      return article.id.toString() === id.toString();
    });
    articles[articleIdx] = {
      ...articles[articleIdx],
      ...newArticleInfo,
      id: articles[articleIdx].id,
    };
    articlesDB.setArticles(articles);
  }
  async getArticlesBySelector(): Promise<Array<ArticleData>> {
    return articlesDB.articles;
  }
}

export default ArticleFileDBConnector;
