import PostDBConnector from '../Interfaces/DBConnectors/PostDBConnector';
import Model from '../Interfaces/Model';
import PostData from '../Interfaces/Data/Post';

class Post implements Model {
  title: string;
  body: string;
  postDBConnector: PostDBConnector;
  id: string;
  creator: string;
  constructor(
    title: string,
    body: string,
    creator: string,
    postDBConnector: PostDBConnector,
    id?: string,
  ) {
    this.title = title;
    this.body = body;
    this.postDBConnector = postDBConnector;
    this.id = id || postDBConnector.generateId();
    this.creator = creator;
  }

  static async getAll(postDBConnector: PostDBConnector): Promise<Array<Post>> {
    const postsData = await postDBConnector.getAll();
    const posts = postsData.map((postData: PostData) => {
      return Post.toModel(postDBConnector, postData);
    });
    return posts;
  }

  static async getById(
    postDBConnector: PostDBConnector,
    id: string,
  ): Promise<Post | void> {
    const postData = await postDBConnector.getById(id);
    return Post.toModel(postDBConnector, postData);
  }

  toObject(): PostData {
    const { title, body, id, creator } = this;
    return {
      title,
      body,
      id,
      creator,
    };
  }

  static toModel(postDBConnector: PostDBConnector, postData: PostData): Post {
    const { title, body, id, creator } = postData;
    return new Post(title, body, creator, postDBConnector, id);
  }

  async save(): Promise<void> {
    const postData = this.toObject();
    const candidate = await this.postDBConnector.getById(this.id);
    if (candidate) {
      this.postDBConnector.updateById(this.id, postData);
    } else {
      this.postDBConnector.addRecord(postData);
    }
  }

  async remove(): Promise<void> {
    await this.postDBConnector.removeById(this.id);
  }
}

export default Post;
