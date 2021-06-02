import { adminData, articleData, userData } from '../seedData';
import Users from '../src/Entities/user';
import Articles from '../src/Entities/article';
import ArticleRepository from '../src/TypeORMRepositories/Articles';
import typeORMConnector from '../src/Connect/typeORMConnect';

const getUserByEmail = async (email: string): Promise<Users | void> => {
  const connection = await typeORMConnector.getConnect();
  const userRepository = connection.getRepository(Users);
  const user = await userRepository.findOne({
    where: [{ email: email }],
  });
  return user;
};

const getArticleByUser = async (user: Users): Promise<Articles | void> => {
  const connection = await typeORMConnector.getConnect();
  const articleRepository = connection.getRepository(Articles);
  const article = await articleRepository.findOne({
    where: [{ creator: user }],
  });
  return article;
};

const checkIfUserSeeded = async (): Promise<boolean> => {
  const user = await getUserByEmail(userData.email);
  return user ? true : false;
};

const checkIfAdminSeeded = async (): Promise<boolean> => {
  const admin = await getUserByEmail(adminData.email);
  return admin ? true : false;
};

const checkIfArticleSeeded = async (userEmail: string): Promise<boolean> => {
  const user = await getUserByEmail(userEmail);
  let article;
  if (user) {
    article = await getArticleByUser(user);
  }
  return article ? true : false;
};

const seedData = async (): Promise<void> => {
  const connection = await typeORMConnector.getConnect();
  const isUserSeeded = await checkIfUserSeeded();
  const isAdminSeeded = await checkIfAdminSeeded();
  const isArticleSeeded = await checkIfArticleSeeded(userData.email);
  const isDataSeeded = isUserSeeded || isAdminSeeded || isArticleSeeded;
  if (!isDataSeeded) {
    await connection.transaction(async manager => {
      const userRepository = manager.getRepository(Users);
      const articleRepository = manager.getCustomRepository(ArticleRepository);
      const admin = new Users();
      const user = new Users();
      user.email = userData.email;
      admin.email = adminData.email;
      user.password = userData.password;
      admin.password = adminData.password;
      user.is_admin = userData.is_admin;
      admin.is_admin = adminData.is_admin;
      user.username = userData.username;
      admin.username = adminData.username;
      await userRepository.save(user);
      await userRepository.save(admin);
      await articleRepository.createAndSave(articleData, user);
    });
  } else {
    console.log('Data is already seeded');
  }
};

seedData();
