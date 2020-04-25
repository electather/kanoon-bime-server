/* eslint-disable max-len */
import { MigrationInterface, QueryRunner } from 'typeorm';

export class V21587793693014 implements MigrationInterface {
  name = 'v21587793693014';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "users" DROP COLUMN "avatar"',
      undefined,
    );
    await queryRunner.query(
      'ALTER TABLE "users" ADD "avatar_id" uuid',
      undefined,
    );
    await queryRunner.query(
      'ALTER TABLE "users" ALTER COLUMN "first_name" SET NOT NULL',
      undefined,
    );
    await queryRunner.query(
      'ALTER TABLE "users" ALTER COLUMN "last_name" SET NOT NULL',
      undefined,
    );
    await queryRunner.query(
      'ALTER TABLE "users" ADD CONSTRAINT "FK_c3401836efedec3bec459c8f818" FOREIGN KEY ("avatar_id") REFERENCES "files"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
      undefined,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "users" DROP CONSTRAINT "FK_c3401836efedec3bec459c8f818"',
      undefined,
    );
    await queryRunner.query(
      'ALTER TABLE "users" ALTER COLUMN "last_name" DROP NOT NULL',
      undefined,
    );
    await queryRunner.query(
      'ALTER TABLE "users" ALTER COLUMN "first_name" DROP NOT NULL',
      undefined,
    );
    await queryRunner.query(
      'ALTER TABLE "users" DROP COLUMN "avatar_id"',
      undefined,
    );
    await queryRunner.query(
      'ALTER TABLE "users" ADD "avatar" character varying',
      undefined,
    );
  }
}
