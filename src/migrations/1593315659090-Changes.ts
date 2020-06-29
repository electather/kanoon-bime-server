import { MigrationInterface, QueryRunner } from 'typeorm';

export class Changes1593315659090 implements MigrationInterface {
  name = 'Changes1593315659090';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "stats_insurance_enum"
       AS ENUM('VEHICLE', 'USER', 'TPI', 'BII')`,
    );
    await queryRunner.query(
      `CREATE TABLE "stats" 
      (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
         "created_at" TIMESTAMP NOT NULL DEFAULT now(),
          "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
           "insurance" "stats_insurance_enum" NOT NULL,
            "date" date NOT NULL, "count" integer NOT NULL,
             "amount" integer NOT NULL, "creator_id" uuid,
              CONSTRAINT "PK_c76e93dfef28ba9b6942f578ab1" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "stats" 
      ADD CONSTRAINT "FK_a81b1791a9b0d8fa452134cb93b" FOREIGN KEY 
      ("creator_id") REFERENCES "users"("id")
       ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "stats"
      DROP CONSTRAINT "FK_a81b1791a9b0d8fa452134cb93b"`,
    );
    await queryRunner.query('DROP TABLE "stats"');
    await queryRunner.query('DROP TYPE "stats_insurance_enum"');
  }
}
