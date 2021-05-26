import ArticleSQLDBConnector from '../Classes/ArticleDBConnector/ArticleSQLDBConnector';
import CommentSQLDBConnector from '../Classes/CommentDBConnector/CommentSQLDBConnector';
import PostSQLDBConnector from '../Classes/PostDBConnector/PostSQLDBConnector';
import UserSQLDBConnector from '../Classes/UserDBConnectors/UserSQLDBConnector';
import constructLocationError from '../Helpers/constructLocationError';
import { LOCATIONS } from './constants';

const init = async (): Promise<void> => {
  try {
    await new UserSQLDBConnector().init();
    await new ArticleSQLDBConnector().init();
    await new PostSQLDBConnector().init();
    await new CommentSQLDBConnector().init();
  } catch (err) {
    const locationError = constructLocationError(err, LOCATIONS.CREATE_TABLES);
    throw locationError;
  }
};

export default init;
