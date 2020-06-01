import { MigrationInterface, QueryRunner } from 'typeorm';

export class Creator1590929084118 implements MigrationInterface {
  name = 'Creator1590929084118';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users"
       ADD "creator_id" uuid`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "users"
       ADD CONSTRAINT "FK_eebaffddb3c6e049fa709e7de02" FOREIGN KEY ("creator_id") 
       REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
      undefined,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users"
       DROP CONSTRAINT "FK_eebaffddb3c6e049fa709e7de02"`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "users"
       DROP COLUMN "creator_id"`,
      undefined,
    );
  }
}
