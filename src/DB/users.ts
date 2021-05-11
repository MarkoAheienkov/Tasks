import UserData from '../Interfaces/Data/User';

const users: Array<UserData> = [
  {
    username: 'admin',
    email: 'admin@admin.com',
    password: 'admin',
    id: '1',
    isAdmin: true,
  },
  {
    username: 'user',
    email: 'user@user.com',
    password: 'user',
    id: '2',
  },
];

const usersDB = {
  records: users,
  setRecords(records: Array<UserData>): void {
    this.records = [...records];
  },
};

export default usersDB;
