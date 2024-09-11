import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1725982017158 implements MigrationInterface {
    name = 'Migration1725982017158'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "picture" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "picture" SET NOT NULL`);
    }

}
