import UserData from '../Interfaces/Data/User';

const usersDB = {
  records: [
    {
      username: 'admin',
      email: 'admin@admin.com',
      password: 'admin',
      id: '1',
      isAdmin: true,
      articles: ['1'],
      posts: ['1'],
    },
    {
      username: 'user',
      email: 'user@user.com',
      password: 'user',
      id: '2',
      posts: ['2'],
      articles: ['2'],
    },
  ],
  setRecords(records: Array<UserData>): void {
    this.records = [...records];
  },
};

export default usersDB;
