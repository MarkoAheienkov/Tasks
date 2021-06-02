import { MigrationInterface, QueryRunner, getConnection } from 'typeorm';
import { articleData, adminData, userData } from '../seedData';
import Users from '../src/Entities/user';

import ArticleRepository from '../src/TypeORMRepositories/Articles';

export class SeedingData1622117339344 implements MigrationInterface {
  public async up(): Promise<void> {
    const connection = await getConnection('seed');
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
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    console.log('No revert');
  }
}
