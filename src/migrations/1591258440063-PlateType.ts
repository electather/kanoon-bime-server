import { MigrationInterface, QueryRunner } from 'typeorm';

export class PlateType1591258440063 implements MigrationInterface {
  name = 'PlateType1591258440063';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "vehicles" DROP COLUMN "plate_first_two_numbers"',
      undefined,
    );
    await queryRunner.query(
      'ALTER TABLE "vehicles" ADD "plate_first_two_numbers" integer',
      undefined,
    );
    await queryRunner.query(
      'ALTER TABLE "vehicles" DROP COLUMN "plate_letter"',
      undefined,
    );
    await queryRunner.query(
      'ALTER TABLE "vehicles" ADD "plate_letter" integer',
      undefined,
    );
    await queryRunner.query(
      'ALTER TABLE "vehicles" DROP COLUMN "plate_last_three_numbers"',
      undefined,
    );
    await queryRunner.query(
      'ALTER TABLE "vehicles" ADD "plate_last_three_numbers" integer',
      undefined,
    );
    await queryRunner.query(
      'ALTER TABLE "vehicles" DROP COLUMN "plate_ir_number"',
      undefined,
    );
    await queryRunner.query(
      'ALTER TABLE "vehicles" ADD "plate_ir_number" integer',
      undefined,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "vehicles" DROP COLUMN "plate_ir_number"',
      undefined,
    );
    await queryRunner.query(
      'ALTER TABLE "vehicles" ADD "plate_ir_number" character varying(2)',
      undefined,
    );
    await queryRunner.query(
      'ALTER TABLE "vehicles" DROP COLUMN "plate_last_three_numbers"',
      undefined,
    );
    await queryRunner.query(
      'ALTER TABLE "vehicles" ADD "plate_last_three_numbers" character varying(3)',
      undefined,
    );
    await queryRunner.query(
      'ALTER TABLE "vehicles" DROP COLUMN "plate_letter"',
      undefined,
    );
    await queryRunner.query(
      'ALTER TABLE "vehicles" ADD "plate_letter" character varying(2)',
      undefined,
    );
    await queryRunner.query(
      'ALTER TABLE "vehicles" DROP COLUMN "plate_first_two_numbers"',
      undefined,
    );
    await queryRunner.query(
      'ALTER TABLE "vehicles" ADD "plate_first_two_numbers" character varying(2)',
      undefined,
    );
  }
}
