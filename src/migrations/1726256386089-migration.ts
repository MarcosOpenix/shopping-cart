import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1726256386089 implements MigrationInterface {
    name = 'Migration1726256386089'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" ALTER COLUMN "price" TYPE numeric`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" ALTER COLUMN "price" TYPE numeric(10,2)`);
    }

}
