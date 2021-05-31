import UserFactory from '../../Classes/Factories/UserFactory';
import constructLocationError from '../../Helpers/constructLocationError';
import UserData from '../../Interfaces/Data/User';
import UserDBConnector from '../../Interfaces/DBConnectors/UserDBConnector';
import UserRepository from '../User';
import { LOCATIONS } from './constants';

class AdminRepository extends UserRepository {
  isAdmin: boolean;
  constructor(
    username: string,
    email: string,
    password: string,
    userDBConnector: UserDBConnector,
    id?: string,
  ) {
    super(username, email, password, userDBConnector, id);
    this.isAdmin = true;
  }

  toObject(): UserData {
    const user = super.toObject();
    return {
      ...user,
      isAdmin: true,
    };
  }

  static async getAllAdmins(
    userDBConnector: UserDBConnector,
    userFactory: UserFactory,
  ): Promise<Array<UserRepository>> {
    try {
      const adminData = await userDBConnector.getAllAdmins();
      return adminData.map(adminData => {
        return AdminRepository.toModel(userDBConnector, adminData, userFactory);
      });
    } catch (err) {
      const locationError = constructLocationError(
        err,
        LOCATIONS.GET_ALL_ADMINS,
      );
      throw locationError;
    }
  }
}

export default AdminRepository;
