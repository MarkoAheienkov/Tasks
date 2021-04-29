import UserData from '../Interfaces/Data/User';

const usersDB = {
  users: [
    {
      username: 'admin',
      email: 'admin@admin.com',
      password: 'admin',
      id: '1',
      isAdmin: true,
      articles: ['1'],
    },
    {
      username: 'user',
      email: 'user@user.com',
      password: 'user',
      id: '2',
      articles: ['2'],
    },
  ],
  setUsers(users: Array<UserData>): void {
    this.users = [...users];
  },
};

export default usersDB;
