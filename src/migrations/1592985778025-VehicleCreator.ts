import { MigrationInterface, QueryRunner } from 'typeorm';

export class VehicleCreator1592985778025 implements MigrationInterface {
  name = 'VehicleCreator1592985778025';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "vehicles"
       ADD "creator_id" uuid`,
    );
    await queryRunner.query(
      `ALTER TABLE "vehicles"
       ADD CONSTRAINT "FK_2e0e972dedf1bc378768bd9e122"
        FOREIGN KEY ("creator_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "vehicles"
       DROP CONSTRAINT "FK_2e0e972dedf1bc378768bd9e122"`,
    );
    await queryRunner.query(
      `ALTER TABLE "vehicles"
       DROP COLUMN "creator_id"`,
    );
  }
}
