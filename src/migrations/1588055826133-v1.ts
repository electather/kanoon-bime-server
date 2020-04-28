import { MigrationInterface, QueryRunner } from 'typeorm';

export class V11588055826133 implements MigrationInterface {
  name = 'v11588055826133';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users"
        DROP COLUMN "address"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user-info"
        ADD "address" character varying`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user-info"
       DROP COLUMN "address"`,
    );
    await queryRunner.query(
      `ALTER TABLE "users"
        ADD "address" character varying`,
    );
  }
}
