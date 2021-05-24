import PostDBConnector from '../../Interfaces/DBConnectors/PostDBConnector';
import Model from '../../Interfaces/Model';
import PostData from '../../Interfaces/Data/Post';
import constructLocationError from '../../Helpers/constructLocationError';
import { LOCATIONS } from './constants';

class PostRepository implements Model {
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

  static async getAll(
    postDBConnector: PostDBConnector,
  ): Promise<Array<PostRepository>> {
    try {
      const postsData = await postDBConnector.getAll();
      const posts = postsData.map((postData: PostData) => {
        return PostRepository.toModel(postDBConnector, postData);
      });
      return posts;
    } catch (err) {
      const locationError = constructLocationError(err, LOCATIONS.GET_ALL);
      throw locationError;
    }
  }

  static async getById(
    postDBConnector: PostDBConnector,
    id: string,
  ): Promise<PostRepository | void> {
    try {
      const postData = await postDBConnector.getById(id);
      return PostRepository.toModel(postDBConnector, postData);
    } catch (err) {
      const locationError = constructLocationError(err, LOCATIONS.GET_BY_ID);
      throw locationError;
    }
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

  static toModel(
    postDBConnector: PostDBConnector,
    postData: PostData,
  ): PostRepository {
    const { title, body, id, creator } = postData;
    return new PostRepository(title, body, creator, postDBConnector, id);
  }

  async save(): Promise<void> {
    try {
      const postData = this.toObject();
      const candidate = await this.postDBConnector.getById(this.id);
      if (candidate) {
        this.postDBConnector.updateById(this.id, postData);
      } else {
        this.postDBConnector.addRecord(postData);
      }
    } catch (err) {
      const locationError = constructLocationError(err, LOCATIONS.SAVE);
      throw locationError;
    }
  }

  static async getByTitle(
    postDBConnector: PostDBConnector,
    title: string,
  ): Promise<Array<PostRepository>> {
    try {
      const postsData = await postDBConnector.getPostsByTitle(title);
      const posts = postsData.map((postData: PostData) => {
        return PostRepository.toModel(postDBConnector, postData);
      });
      return posts;
    } catch (err) {
      const locationError = constructLocationError(err, LOCATIONS.GET_BY_TITLE);
      throw locationError;
    }
  }

  async remove(): Promise<void> {
    try {
      await this.postDBConnector.removeById(this.id);
    } catch (err) {
      const locationError = constructLocationError(err, LOCATIONS.REMOVE);
      throw locationError;
    }
  }
}

export default PostRepository;
