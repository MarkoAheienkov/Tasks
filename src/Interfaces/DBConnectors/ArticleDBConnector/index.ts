import ArticleData from '../../Data/Article';
import DBConnector from '..';

export default interface ArticleDBConnector extends DBConnector {
  getArticlesBySelector(
    selector: string,
    value: string,
  ): Promise<Array<ArticleData>>;
}
