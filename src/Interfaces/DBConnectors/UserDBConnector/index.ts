import DBConnector from '..';
import UserData from '../../Data/User';

export default interface UserDBConnector extends DBConnector {
  getUserByEmail(email: string): Promise<UserData | void>;
  getAllAdmins(): Promise<Array<UserData>>;
}
