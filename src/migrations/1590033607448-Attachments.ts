import { MigrationInterface, QueryRunner } from 'typeorm';

export class Attachments1590033607448 implements MigrationInterface {
  name = 'Attachments1590033607448';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "third-party-insurance_insurance_enum"
       AS ENUM('IRAN_INSURANCE', 'KOSAR_INSURANCE')`,
    );
    await queryRunner.query(
      `ALTER TABLE "third-party-insurance"
       ADD "insurance" "third-party-insurance_insurance_enum" NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "third-party-insurance"
       ADD "attachment_id" uuid NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "vehicles"
       ADD "attachment_id" uuid NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "third-party-insurance"
       ADD CONSTRAINT "FK_4c626d9624e7e80c61d6de5862a" FOREIGN KEY ("attachment_id")
        REFERENCES "files"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "vehicles" 
      ADD CONSTRAINT "FK_c17a7719c51e829b2940e1504aa" FOREIGN KEY ("attachment_id") REFERENCES "files"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "vehicles"
       DROP CONSTRAINT "FK_c17a7719c51e829b2940e1504aa"`,
    );
    await queryRunner.query(
      `ALTER TABLE "third-party-insurance"
       DROP CONSTRAINT "FK_4c626d9624e7e80c61d6de5862a"`,
    );
    await queryRunner.query(
      `ALTER TABLE "vehicles"
       DROP COLUMN "attachment_id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "third-party-insurance"
       DROP COLUMN "attachment_id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "third-party-insurance"
       DROP COLUMN "insurance"`,
    );
    await queryRunner.query(`DROP TYPE 
    "third-party-insurance_insurance_enum"`);
  }
}
