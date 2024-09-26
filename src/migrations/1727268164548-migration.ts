import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1727268164548 implements MigrationInterface {
    name = 'Migration1727268164548'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cart_items" ADD CONSTRAINT "UQ_5ae2050695c0c7d9bd92406713d" UNIQUE ("product_id", "session_id")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cart_items" DROP CONSTRAINT "UQ_5ae2050695c0c7d9bd92406713d"`);
    }

}
