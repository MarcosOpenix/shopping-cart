import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1724936184535 implements MigrationInterface {
    name = 'Migration1724936184535'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."users_level_authority_enum" AS ENUM('1', '2')`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "modified_at" TIMESTAMP NOT NULL DEFAULT now(), "email" character varying NOT NULL, "picture" character varying NOT NULL, "password" character varying NOT NULL, "last_name" character varying NOT NULL, "first_name" character varying NOT NULL, "address" character varying NOT NULL, "activated" boolean NOT NULL, "level_authority" "public"."users_level_authority_enum" NOT NULL, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TYPE "public"."users_level_authority_enum"`);
    }

}
