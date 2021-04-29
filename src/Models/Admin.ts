import UserFactory from '../Classes/Factories/UserFactory';
import UserData from '../Interfaces/Data/User';
import UserDBConnector from '../Interfaces/DBConnectors/UserDBConnector';
import User from './User';

class Admin extends User {
  isAdmin: boolean;
  articlesToApprove: Array<string>;
  constructor(
    username: string,
    email: string,
    password: string,
    userDBConnector: UserDBConnector,
    articles?: Array<string>,
    articlesToApprove?: Array<string>,
    id?: string,
  ) {
    super(username, email, password, userDBConnector, articles, id);
    this.isAdmin = true;
    this.articlesToApprove = articlesToApprove || [];
  }

  toObject(): UserData {
    const user = super.toObject();
    return {
      ...user,
      isAdmin: true,
      articlesToApprove: this.articlesToApprove,
    };
  }

  static async getAllAdmins(
    userDBConnector: UserDBConnector,
    userFactory: UserFactory,
  ): Promise<Array<User>> {
    const adminData = await userDBConnector.getAllAdmins();
    return adminData.map(adminData => {
      return Admin.toModel(userDBConnector, adminData, userFactory);
    });
  }

  async addArticleToApprove(articleId: string): Promise<void> {
    this.articlesToApprove.push(articleId);
    await this.save();
  }

  async removeArticleFromApprove(articleId: string): Promise<void> {
    this.articlesToApprove = this.articlesToApprove.filter(artId => {
      return artId !== articleId;
    });
    await this.save();
  }

  static async sentArticleToApprove(
    userDBConnector: UserDBConnector,
    articleId: string,
    userFactory: UserFactory,
  ): Promise<void> {
    const admins = await Admin.getAllAdmins(userDBConnector, userFactory);
    const requests: Array<Promise<void>> = [];

    admins.forEach(admin => {
      const req = (admin as Admin).addArticleToApprove(articleId);
      requests.push(req);
    });
    await Promise.all(requests);
  }

  static async removeArticleFromApprove(
    userDBConnector: UserDBConnector,
    articleId: string,
    userFactory: UserFactory,
  ): Promise<void> {
    const admins = await Admin.getAllAdmins(userDBConnector, userFactory);
    const requests: Array<Promise<void>> = [];

    admins.forEach(admin => {
      const req = (admin as Admin).removeArticleFromApprove(articleId);
      requests.push(req);
    });

    await Promise.all(requests);
  }
}

export default Admin;
