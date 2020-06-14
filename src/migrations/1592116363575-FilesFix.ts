import { MigrationInterface, QueryRunner } from 'typeorm';

export class FilesFix1592116363575 implements MigrationInterface {
  name = 'FilesFix1592116363575';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "body-insurance" 
      DROP CONSTRAINT "FK_377a28e8a6bb46bed23a6f23696"`,
    );
    await queryRunner.query(
      `ALTER TABLE "vehicles" 
      DROP COLUMN "melli_card_front"`,
    );
    await queryRunner.query(
      `ALTER TABLE "vehicles" 
      DROP COLUMN "melli_card_back"`,
    );
    await queryRunner.query(
      `ALTER TABLE "third-party-insurance" 
      DROP CONSTRAINT "FK_4c626d9624e7e80c61d6de5862a"`,
    );
    await queryRunner.query(
      `ALTER TABLE "third-party-insurance" 
      ALTER COLUMN "attachment_id" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "vehicles" DROP CONSTRAINT 
      "FK_c17a7719c51e829b2940e1504aa"`,
    );
    await queryRunner.query(
      `ALTER TABLE "vehicles" ALTER COLUMN "chassis_number" 
      DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "vehicles" ALTER COLUMN 
      "attachment_id" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "third-party-insurance" 
      ADD CONSTRAINT "FK_4c626d9624e7e80c61d6de5862a" 
      FOREIGN KEY ("attachment_id") REFERENCES "files"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "vehicles" 
      ADD CONSTRAINT "FK_c17a7719c51e829b2940e1504aa" 
      FOREIGN KEY ("attachment_id") 
      REFERENCES "files"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "body-insurance" 
      ADD CONSTRAINT "FK_377a28e8a6bb46bed23a6f23696" 
      FOREIGN KEY ("insurer_id") REFERENCES "vehicles"("id") 
      ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "body-insurance" 
      DROP CONSTRAINT "FK_377a28e8a6bb46bed23a6f23696"`,
    );
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
      ALTER COLUMN "attachment_id" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "vehicles" 
      ALTER COLUMN "chassis_number" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "vehicles" 
      ADD CONSTRAINT "FK_c17a7719c51e829b2940e1504aa" FOREIGN KEY ("attachment_id") REFERENCES "files"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "third-party-insurance" 
      ALTER COLUMN "attachment_id" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "third-party-insurance" 
      ADD CONSTRAINT "FK_4c626d9624e7e80c61d6de5862a" FOREIGN KEY ("attachment_id") REFERENCES "files"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "vehicles" 
      ADD "melli_card_back" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "vehicles" 
      ADD "melli_card_front" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "body-insurance" 
      ADD CONSTRAINT "FK_377a28e8a6bb46bed23a6f23696" FOREIGN KEY ("insurer_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
