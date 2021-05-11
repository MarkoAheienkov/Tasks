import postDB from '../../../DB/posts';
import PostData from '../../../Interfaces/Data/Article';
import ArticleDBConnector from '../../../Interfaces/DBConnectors/PostDBConnector';
import FileDBConnector from '../../DBConnector/DBFileConnector';

class PostFileDBConnector extends FileDBConnector
  implements ArticleDBConnector {
  constructor() {
    super(postDB);
  }
  async getPostsByTitle(title: string): Promise<Array<PostData>> {
    const posts = this.database.records as Array<PostData>;
    return posts.filter(postData => postData.title === title);
  }
}

export default PostFileDBConnector;
