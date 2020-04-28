import { MigrationInterface, QueryRunner } from 'typeorm';

export class Base1588052481680 implements MigrationInterface {
  name = 'base1588052481680';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "users_role_enum"
      AS ENUM
      (
        'BIME_GOZAR', 'KARSHENAS', 'ADMIN'
      )`,
    );

    await queryRunner.query(
      `CREATE TABLE "user-info"
        (
          "id"                        uuid NOT NULL DEFAULT uuid_generate_v4(), 
          "created_at"                TIMESTAMP NOT NULL DEFAULT now(),
          "updated_at"                TIMESTAMP NOT NULL DEFAULT now(), 
          "melli_code"                character varying(10) NOT NULL, 
          "melli_card_scan_front_id"  uuid, 
          "melli_card_scan_back_id"   uuid, 
          "payroll_scan_id"           uuid, 
          CONSTRAINT "UQ_d289ce58b5cc8025f8c5cf07b62" UNIQUE ("melli_code"), 
          CONSTRAINT "PK_17470eb7d3fd325d9c872551fc6" PRIMARY KEY ("id")
        )`,
    );
    await queryRunner.query(
      `CREATE TABLE "third-party-insurance"
      (
        "id"            uuid NOT NULL DEFAULT uuid_generate_v4(),
        "created_at"    TIMESTAMP NOT NULL DEFAULT now(),
        "updated_at"    TIMESTAMP NOT NULL DEFAULT now(),
        "bime_number"   character varying NOT NULL,
        "start_date"    TIMESTAMP NOT NULL,
        "end_date"      TIMESTAMP NOT NULL,
        "is_cash"       boolean NOT NULL DEFAULT true,
        "full_amount"   bigint NOT NULL,
        "vehicle_id"    uuid,
        "insurer_id"    uuid,
        CONSTRAINT "UQ_ae7eebf9a71df8ff4347be2c508" UNIQUE ("bime_number"),
        CONSTRAINT "PK_cb5ff3ec894a9e21a4b4d6101e6" PRIMARY KEY ("id")
      )`,
    );
    await queryRunner.query(
      `CREATE TABLE "vehicles"
      (
        "id"                       uuid NOT NULL DEFAULT uuid_generate_v4(),
        "created_at"               TIMESTAMP NOT NULL DEFAULT now(),
        "updated_at"               TIMESTAMP NOT NULL DEFAULT now(),
        "owner_name"               character varying NOT NULL,
        "owner_last_name"          character varying NOT NULL,
        "address"                  character varying,
        "engine_number"            character varying NOT NULL,
        "chassis_number"           character varying NOT NULL,
        "plate_first_two_numbers"  character varying(2),
        "plate_letter"             character varying(1),
        "plate_last_three_numbers" character varying(3),
        "plate_ir_number"          character varying(2),
        "payroll"                  character varying,
        "melli_card_front"         character varying,
        "melli_card_back"          character varying,
        "insurer_id"               uuid,
        CONSTRAINT "UQ_7efd9c1bb173ad856ae317bd43d" UNIQUE ("engine_number"),
        CONSTRAINT "UQ_90d5b70f93e2d5e4517020c2dff" UNIQUE ("chassis_number"),
        CONSTRAINT "PK_18d8646b59304dce4af3a9e35b6" PRIMARY KEY ("id")
      )`,
      undefined,
    );
    await queryRunner.query(
      `CREATE TABLE "users"
      (
        "id"          uuid NOT NULL DEFAULT uuid_generate_v4(),
        "created_at"  TIMESTAMP NOT NULL DEFAULT now(),
        "updated_at"  TIMESTAMP NOT NULL DEFAULT now(),
        "first_name"  character varying NOT NULL,
        "last_name"   character varying NOT NULL,
        "role"        "users_role_enum" NOT NULL DEFAULT 'BIME_GOZAR',
        "phone"       character varying(10) NOT NULL,
        "address"     character varying,
        "password"    character varying,
        "avatar_id"   uuid,
        "info_id"     uuid,
        CONSTRAINT "UQ_a000cca60bcf04454e727699490" UNIQUE ("phone"),
        CONSTRAINT "REL_9bcc2add2d98c69cbb75a0cba2" UNIQUE ("info_id"),
        CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id")
      )`,
      undefined,
    );
    await queryRunner.query(
      `CREATE TABLE "files"
      (
        "id"          uuid NOT NULL DEFAULT uuid_generate_v4(),
        "created_at"  TIMESTAMP NOT NULL DEFAULT now(),
        "updated_at"  TIMESTAMP NOT NULL DEFAULT now(),
        "description" character varying,
        "file"        character varying NOT NULL,
        "creator_id"  uuid NOT NULL,
        CONSTRAINT "PK_6c16b9093a142e0e7613b04a3d9" PRIMARY KEY ("id")
      )`,
    );
    await queryRunner.query(
      `CREATE TABLE "body-insurance"
      (
        "id"            uuid NOT NULL DEFAULT uuid_generate_v4(),
        "created_at"    TIMESTAMP NOT NULL DEFAULT now(),
        "updated_at"    TIMESTAMP NOT NULL DEFAULT now(),
        "bime_number"   character varying NOT NULL,
        "start_date"    TIMESTAMP NOT NULL,
        "end_date"      TIMESTAMP NOT NULL,
        "is_cash"       boolean NOT NULL DEFAULT true,
        "full_amount"   bigint NOT NULL,
        "vehicle_id"    uuid,
        "insurer_id"    uuid,
        "attachment_id" uuid,
        CONSTRAINT "UQ_c99d719f9481f500c7a71707f51" UNIQUE ("bime_number"),
        CONSTRAINT "PK_486b004133e9740ff0865e256de" PRIMARY KEY ("id")
      )`,
    );
    await queryRunner.query(
      `ALTER TABLE "user-info"
        ADD CONSTRAINT "FK_42d4d8da0e3f988db23037ed3c3"
        FOREIGN KEY ("melli_card_scan_front_id")
        REFERENCES "files"("id")
        ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user-info"
        ADD CONSTRAINT "FK_93fd035e48ab4e5d116fd9fa29e"
        FOREIGN KEY ("melli_card_scan_back_id")
        REFERENCES "files"("id")
        ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user-info"
        ADD CONSTRAINT "FK_a2448f943b574dbcaf96734d582"
        FOREIGN KEY ("payroll_scan_id")
        REFERENCES "files"("id")
        ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "third-party-insurance"
        ADD CONSTRAINT "FK_0d08aa8d873398ce329fb417aaf"
        FOREIGN KEY ("vehicle_id")
        REFERENCES "vehicles"("id")
        ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "third-party-insurance"
        ADD CONSTRAINT "FK_cd5454252f9e6257f2e849634b9"
        FOREIGN KEY ("insurer_id")
        REFERENCES "vehicles"("id")
        ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "vehicles"
        ADD CONSTRAINT "FK_9e4cb08797949ba7de2f2524de4"
        FOREIGN KEY ("insurer_id")
        REFERENCES "users"("id")
        ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "users"
        ADD CONSTRAINT "FK_c3401836efedec3bec459c8f818"
        FOREIGN KEY ("avatar_id")
        REFERENCES "files"("id")
        ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "users"
        ADD CONSTRAINT "FK_9bcc2add2d98c69cbb75a0cba27"
        FOREIGN KEY ("info_id")
        REFERENCES "user-info"("id")
        ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "files"
        ADD CONSTRAINT "FK_a8b5cf9abdae34c2dfd58823dce"
        FOREIGN KEY ("creator_id")
        REFERENCES "users"("id")
        ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "body-insurance"
        ADD CONSTRAINT "FK_e7ebfd471efd3ae3126476d245a"
        FOREIGN KEY ("vehicle_id")
        REFERENCES "vehicles"("id")
        ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "body-insurance"
        ADD CONSTRAINT "FK_377a28e8a6bb46bed23a6f23696"
        FOREIGN KEY ("insurer_id")
        REFERENCES "vehicles"("id")
        ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "body-insurance"
        ADD CONSTRAINT "FK_3871ab4e0534ec13af96f9a4967"
        FOREIGN KEY ("attachment_id")
        REFERENCES "files"("id")
        ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "body-insurance"
        DROP CONSTRAINT "FK_3871ab4e0534ec13af96f9a4967"`,
    );
    await queryRunner.query(
      `ALTER TABLE "body-insurance"
        DROP CONSTRAINT "FK_377a28e8a6bb46bed23a6f23696"`,
    );
    await queryRunner.query(
      `ALTER TABLE "body-insurance"
         DROP CONSTRAINT "FK_e7ebfd471efd3ae3126476d245a"`,
    );
    await queryRunner.query(
      `ALTER TABLE "files"
        DROP CONSTRAINT "FK_a8b5cf9abdae34c2dfd58823dce"`,
    );
    await queryRunner.query(
      `ALTER TABLE "users"
        DROP CONSTRAINT "FK_9bcc2add2d98c69cbb75a0cba27"`,
    );
    await queryRunner.query(
      `ALTER TABLE "users"
        DROP CONSTRAINT "FK_c3401836efedec3bec459c8f818"`,
    );
    await queryRunner.query(
      `ALTER TABLE "vehicles"
        DROP CONSTRAINT "FK_9e4cb08797949ba7de2f2524de4"`,
    );
    await queryRunner.query(
      `ALTER TABLE "third-party-insurance"
        DROP CONSTRAINT "FK_cd5454252f9e6257f2e849634b9"`,
    );
    await queryRunner.query(
      `ALTER TABLE "third-party-insurance"
        DROP CONSTRAINT "FK_0d08aa8d873398ce329fb417aaf"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user-info"
        DROP CONSTRAINT "FK_a2448f943b574dbcaf96734d582"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user-info"
        DROP CONSTRAINT "FK_93fd035e48ab4e5d116fd9fa29e"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user-info"
        DROP CONSTRAINT "FK_42d4d8da0e3f988db23037ed3c3"`,
    );
    await queryRunner.query('DROP TABLE "body-insurance"');
    await queryRunner.query('DROP TABLE "files"');
    await queryRunner.query('DROP TABLE "users"');
    await queryRunner.query('DROP TABLE "vehicles"');
    await queryRunner.query('DROP TABLE "third-party-insurance"');
    await queryRunner.query('DROP TABLE "user-info"');
    await queryRunner.query('DROP TYPE "users_role_enum"');
  }
}
