import { MigrationInterface, QueryRunner } from 'typeorm';

export class Creator1593059493521 implements MigrationInterface {
  name = 'Creator1593059493521';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "third-party-insurance"
       ADD "creator_id" uuid`,
    );
    await queryRunner.query(
      `ALTER TABLE "body-insurance"
       ADD "creator_id" uuid`,
    );
    await queryRunner.query(
      `ALTER TABLE "third-party-insurance"
      ADD CONSTRAINT "FK_d152fe3f5599e323d42bce80133"
      FOREIGN KEY ("creator_id") REFERENCES "users"("id")
      ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "body-insurance" 
      ADD CONSTRAINT "FK_b51793b5402ad91cd4f93ca0a3a" 
      FOREIGN KEY ("creator_id") REFERENCES "users"("id") 
      ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "body-insurance" 
      DROP CONSTRAINT "FK_b51793b5402ad91cd4f93ca0a3a"`,
    );
    await queryRunner.query(
      `ALTER TABLE "third-party-insurance" 
      DROP CONSTRAINT "FK_d152fe3f5599e323d42bce80133"`,
    );
    await queryRunner.query(
      `ALTER TABLE "body-insurance" 
      DROP COLUMN "creator_id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "third-party-insurance" 
      DROP COLUMN "creator_id"`,
    );
  }
}
