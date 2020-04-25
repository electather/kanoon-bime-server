/* eslint-disable max-len */
import { MigrationInterface, QueryRunner } from 'typeorm';

export class V11587787595548 implements MigrationInterface {
  name = 'v11587787595548';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'CREATE TABLE "vehicles" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "owner_name" character varying NOT NULL, "owner_last_name" character varying NOT NULL, "address" character varying, "engine_number" character varying NOT NULL, "chassis_number" character varying NOT NULL, "plate_first_two_numbers" character varying(2), "plate_letter" character varying(1), "plate_last_three_numbers" character varying(3), "plate_ir_number" character varying(2), "payroll" character varying, "melli_card_front" character varying, "melli_card_back" character varying, "previous_insurance" character varying, "issuer_id" uuid, CONSTRAINT "UQ_7efd9c1bb173ad856ae317bd43d" UNIQUE ("engine_number"), CONSTRAINT "UQ_90d5b70f93e2d5e4517020c2dff" UNIQUE ("chassis_number"), CONSTRAINT "PK_18d8646b59304dce4af3a9e35b6" PRIMARY KEY ("id"))',
      undefined,
    );
    await queryRunner.query(
      'CREATE TABLE "files" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "description" character varying, "file" character varying NOT NULL, "creator_id" uuid NOT NULL, CONSTRAINT "PK_6c16b9093a142e0e7613b04a3d9" PRIMARY KEY ("id"))',
      undefined,
    );
    await queryRunner.query(
      'ALTER TABLE "users" DROP CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3"',
      undefined,
    );
    await queryRunner.query(
      'ALTER TABLE "users" DROP COLUMN "email"',
      undefined,
    );
    await queryRunner.query(
      'ALTER TABLE "users" ADD "melli_code" character varying(10) NOT NULL',
      undefined,
    );
    await queryRunner.query(
      'ALTER TABLE "users" ADD CONSTRAINT "UQ_71f01ad758913288689937c3090" UNIQUE ("melli_code")',
      undefined,
    );
    await queryRunner.query(
      'ALTER TABLE "users" ADD "address" character varying',
      undefined,
    );
    await queryRunner.query(
      'ALTER TYPE "public"."users_role_enum" RENAME TO "users_role_enum_old"',
      undefined,
    );
    await queryRunner.query(
      "CREATE TYPE \"users_role_enum\" AS ENUM('USER', 'ADMIN')",
      undefined,
    );
    await queryRunner.query(
      'ALTER TABLE "users" ALTER COLUMN "role" DROP DEFAULT',
      undefined,
    );
    await queryRunner.query(
      'ALTER TABLE "users" ALTER COLUMN "role" TYPE "users_role_enum" USING "role"::"text"::"users_role_enum"',
      undefined,
    );
    await queryRunner.query(
      'ALTER TABLE "users" ALTER COLUMN "role" SET DEFAULT \'USER\'',
      undefined,
    );
    await queryRunner.query('DROP TYPE "users_role_enum_old"', undefined);
    await queryRunner.query(
      'ALTER TABLE "users" DROP COLUMN "phone"',
      undefined,
    );
    await queryRunner.query(
      'ALTER TABLE "users" ADD "phone" character varying(10) NOT NULL',
      undefined,
    );
    await queryRunner.query(
      'ALTER TABLE "users" ADD CONSTRAINT "UQ_a000cca60bcf04454e727699490" UNIQUE ("phone")',
      undefined,
    );
    await queryRunner.query(
      'ALTER TABLE "vehicles" ADD CONSTRAINT "FK_95c92fe216b4c41fd2dfc6b325e" FOREIGN KEY ("issuer_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
      undefined,
    );
    await queryRunner.query(
      'ALTER TABLE "files" ADD CONSTRAINT "FK_a8b5cf9abdae34c2dfd58823dce" FOREIGN KEY ("creator_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
      undefined,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "files" DROP CONSTRAINT "FK_a8b5cf9abdae34c2dfd58823dce"',
      undefined,
    );
    await queryRunner.query(
      'ALTER TABLE "vehicles" DROP CONSTRAINT "FK_95c92fe216b4c41fd2dfc6b325e"',
      undefined,
    );
    await queryRunner.query(
      'ALTER TABLE "users" DROP CONSTRAINT "UQ_a000cca60bcf04454e727699490"',
      undefined,
    );
    await queryRunner.query(
      'ALTER TABLE "users" DROP COLUMN "phone"',
      undefined,
    );
    await queryRunner.query(
      'ALTER TABLE "users" ADD "phone" character varying',
      undefined,
    );
    await queryRunner.query(
      'CREATE TYPE "users_role_enum_old" AS ENUM(\'USER\')',
      undefined,
    );
    await queryRunner.query(
      'ALTER TABLE "users" ALTER COLUMN "role" DROP DEFAULT',
      undefined,
    );
    await queryRunner.query(
      'ALTER TABLE "users" ALTER COLUMN "role" TYPE "users_role_enum_old" USING "role"::"text"::"users_role_enum_old"',
      undefined,
    );
    await queryRunner.query(
      'ALTER TABLE "users" ALTER COLUMN "role" SET DEFAULT \'USER\'',
      undefined,
    );
    await queryRunner.query('DROP TYPE "users_role_enum"', undefined);
    await queryRunner.query(
      'ALTER TYPE "users_role_enum_old" RENAME TO  "users_role_enum"',
      undefined,
    );
    await queryRunner.query(
      'ALTER TABLE "users" DROP COLUMN "address"',
      undefined,
    );
    await queryRunner.query(
      'ALTER TABLE "users" DROP CONSTRAINT "UQ_71f01ad758913288689937c3090"',
      undefined,
    );
    await queryRunner.query(
      'ALTER TABLE "users" DROP COLUMN "melli_code"',
      undefined,
    );
    await queryRunner.query(
      'ALTER TABLE "users" ADD "email" character varying',
      undefined,
    );
    await queryRunner.query(
      'ALTER TABLE "users" ADD CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email")',
      undefined,
    );
    await queryRunner.query('DROP TABLE "files"', undefined);
    await queryRunner.query('DROP TABLE "vehicles"', undefined);
  }
}
