import { MigrationInterface, QueryRunner } from 'typeorm';

export class TpiImprovements1589961221293 implements MigrationInterface {
  name = 'TpiImprovements1589961221293';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "body-insurance_insurance_enum"
       AS ENUM('IRAN_INSURANCE', 'KOSAR_INSURANCE')`,
    );
    await queryRunner.query(
      `ALTER TABLE "body-insurance"
       ADD "insurance" "body-insurance_insurance_enum" NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "body-insurance"
       DROP CONSTRAINT "FK_3871ab4e0534ec13af96f9a4967"`,
    );
    await queryRunner.query(
      `ALTER TABLE "body-insurance"
       ALTER COLUMN "attachment_id" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "body-insurance"
       ADD CONSTRAINT "FK_3871ab4e0534ec13af96f9a4967" FOREIGN KEY ("attachment_id")
        REFERENCES "files"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "body-insurance"
       DROP CONSTRAINT "FK_3871ab4e0534ec13af96f9a4967"`,
    );
    await queryRunner.query(
      `ALTER TABLE "body-insurance"
       ALTER COLUMN "attachment_id" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "body-insurance"
       ADD CONSTRAINT "FK_3871ab4e0534ec13af96f9a4967"
        FOREIGN KEY ("attachment_id") REFERENCES "files"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "body-insurance"
       DROP COLUMN "insurance"`,
    );
    await queryRunner.query(`DROP TYPE
     "body-insurance_insurance_enum"`);
  }
}
