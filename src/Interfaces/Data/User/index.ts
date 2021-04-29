import Data from '..';

export default interface UserData extends Data {
  username: string;
  password: string;
  email: string;
  isAdmin?: boolean;
  articles: Array<string>;
  articlesToApprove?: Array<string>;
}
