import postDB from '../../../DB/posts';
import PostData from '../../../Interfaces/Data/Post';
import PostDBConnector from '../../../Interfaces/DBConnectors/PostDBConnector';
import FileDBConnector from '../../DBConnector/DBFileConnector';

class PostFileDBConnector extends FileDBConnector implements PostDBConnector {
  constructor() {
    super(postDB);
  }
  async getPostsByTitle(title: string): Promise<Array<PostData>> {
    const posts = this.database.records as Array<PostData>;
    return posts.filter(postData => postData.title === title);
  }

  async getPostsByText(text: string): Promise<Array<PostData>> {
    const posts = this.database.records as Array<PostData>;
    return posts.filter(postData => postData.body === text);
  }
}

export default PostFileDBConnector;
