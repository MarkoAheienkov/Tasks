import articlesDB from '../../../DB/articles';
import ArticleData from '../../../Interfaces/Data/Article';
import ArticleDBConnector from '../../../Interfaces/DBConnectors/ArticleDBConnector';
import FileDBConnector from '../../DBConnector/DBFileConnector';

class ArticleFileDBConnector extends FileDBConnector
  implements ArticleDBConnector {
  constructor() {
    super(articlesDB);
  }
  async getArticlesByTitle(title: string): Promise<Array<ArticleData>> {
    const articles = this.database.records as Array<ArticleData>;
    return articles.filter(artData => artData.title === title);
  }
  async getApprovedArticles(): Promise<Array<ArticleData>> {
    const articles = this.database.records as Array<ArticleData>;
    return articles.filter(artData => artData.approved);
  }
  async getNotApprovedArticles(): Promise<Array<ArticleData>> {
    const articles = this.database.records as Array<ArticleData>;
    return articles.filter(artData => !artData.approved);
  }
  async getArticlesByUser(userId: string): Promise<Array<ArticleData>> {
    const articles = this.database.records as Array<ArticleData>;
    return articles.filter(article => article.creator === userId);
  }
}

export default ArticleFileDBConnector;
