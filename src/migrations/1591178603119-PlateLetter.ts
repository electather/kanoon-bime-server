import { MigrationInterface, QueryRunner } from 'typeorm';

export class PlateLetter1591178603119 implements MigrationInterface {
  name = 'PlateLetter1591178603119';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "vehicles" DROP COLUMN "plate_letter"',
      undefined,
    );
    await queryRunner.query(
      'ALTER TABLE "vehicles" ADD "plate_letter" character varying(2)',
      undefined,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "vehicles" DROP COLUMN "plate_letter"',
      undefined,
    );
    await queryRunner.query(
      'ALTER TABLE "vehicles" ADD "plate_letter" character varying(1)',
      undefined,
    );
  }
}
