import UserDBConnector from '../Interfaces/DBConnectors/UserDBConnector';
import { v4 } from 'uuid';
import Model from '../Interfaces/Model';
import UserData from '../Interfaces/Data/User';
import UserFactory from '../Classes/Factories/UserFactory';

class User implements Model {
  username: string;
  email: string;
  password: string;
  userDbConnector: UserDBConnector;
  id: string;
  articles: Array<string>;
  posts: Array<string>;
  constructor(
    username: string,
    email: string,
    password: string,
    userDbConnector: UserDBConnector,
    articles?: Array<string>,
    posts?: Array<string>,
    id?: string,
  ) {
    this.username = username;
    this.email = email;
    this.password = password;
    this.userDbConnector = userDbConnector;
    this.id = id || v4();
    this.articles = articles || [];
    this.posts = posts || [];
  }
  static async getByEmail(
    userDBConnector: UserDBConnector,
    email: string,
    userFactory: UserFactory,
  ): Promise<User | void> {
    const userData = await userDBConnector.getUserByEmail(email);
    if (userData) {
      return this.toModel(userDBConnector, userData, userFactory);
    }
  }

  toObject(): UserData {
    const { username, password, email, id, articles, posts } = this;
    return {
      username,
      password,
      email,
      id,
      articles,
      posts,
    };
  }

  static toModel(
    userDBConnector: UserDBConnector,
    userData: UserData,
    userFactory: UserFactory,
  ): User {
    return userFactory.createUser(userDBConnector, userData);
  }

  async addArticle(articleId: string): Promise<void> {
    this.articles.push(articleId);
    await this.save();
  }

  async addPost(postId: string): Promise<void> {
    this.posts.push(postId);
    await this.save();
  }

  async removeArticle(articleId: string): Promise<void> {
    this.articles = this.articles.filter(artId => artId !== articleId);
    await this.save();
  }

  async removePost(postId: string): Promise<void> {
    this.posts = this.posts.filter(pstId => pstId !== postId);
    await this.save();
  }

  async remove(): Promise<void> {
    await this.userDbConnector.removeById(this.id);
  }

  async save(): Promise<void> {
    const userData = this.toObject();
    const candidate = await this.userDbConnector.getById(this.id);
    if (candidate) {
      this.userDbConnector.updateById(this.id, userData);
    } else {
      this.userDbConnector.addRecord(userData);
    }
  }
}

export default User;
