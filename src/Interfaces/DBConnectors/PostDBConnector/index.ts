import PostData from '../../Data/Post';
import DBConnector from '..';

export default interface PostDBConnector extends DBConnector {
  getPostsByTitle(title: string): Promise<Array<PostData>>;
}
