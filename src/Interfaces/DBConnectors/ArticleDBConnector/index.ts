import ArticleData from '../../Data/Article';
import DBConnector from '..';

export default interface ArticleDBConnector extends DBConnector {
  getArticlesByTitle(title: string): Promise<Array<ArticleData>>;
}
