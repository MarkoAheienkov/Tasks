import {
  getConnection,
  MigrationInterface,
  QueryRunner,
  TableColumn,
} from 'typeorm';

export class TestMigration1622114170460 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const birthColumn = new TableColumn({
      name: 'date_of_birth',
      type: 'date',
      default: null,
      isNullable: true,
    });
    const createdAtColumn = new TableColumn({
      name: 'created_at',
      type: 'timestamp without time zone',
      default: 'now()',
    });
    const createdAtColumnPost = new TableColumn({
      name: 'created_at',
      type: 'timestamp without time zone',
      default: 'now()',
    });
    const connection = await getConnection();
    await connection.transaction(async manager => {
      const queryRunner = manager.queryRunner;
      const usersTable = await queryRunner.getTable('users');
      const postsTable = await queryRunner.getTable('posts');
      if (usersTable) {
        await queryRunner.addColumns(usersTable, [
          birthColumn,
          createdAtColumn,
        ]);
      }
      if (postsTable) {
        await queryRunner.addColumns(postsTable, [createdAtColumnPost]);
      }
    });
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const connection = await getConnection();
    connection.transaction(async manager => {
      const queryRunner = manager.queryRunner;
      await queryRunner.dropColumn('users', 'data_of_birth');
      await queryRunner.dropColumn('users', 'created_at');
      await queryRunner.dropColumn('posts', 'created_at');
    });
  }
}
