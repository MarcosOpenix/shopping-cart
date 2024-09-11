import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1726082591426 implements MigrationInterface {
    name = 'Migration1726082591426'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "transactions" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "modified_at" TIMESTAMP NOT NULL DEFAULT now(), "order_status" character varying NOT NULL, "total_price" integer NOT NULL, "user_id" uuid, "order_id" uuid, CONSTRAINT "PK_a219afd8dd77ed80f5a862f1db9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "shopping_sessions" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "modified_at" TIMESTAMP NOT NULL DEFAULT now(), "user_id" uuid, CONSTRAINT "PK_bec3852deedb7e80135555ba9a0" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "cart_items" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "modified_at" TIMESTAMP NOT NULL DEFAULT now(), "quantity" integer NOT NULL, "product_id" uuid, "session_id" uuid, CONSTRAINT "PK_6fccf5ec03c172d27a28a82928b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."products_category_enum" AS ENUM('Electronics', 'Clothing', 'Books', 'Furniture', 'Beauty', 'Toys', 'Sports', 'Grocery', 'Home Appliances', 'Automotive', 'Jewelry', 'Pet Supplies', 'Office Supplies', 'Garden')`);
        await queryRunner.query(`CREATE TABLE "products" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "modified_at" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "price" integer NOT NULL, "stock" integer NOT NULL, "category" "public"."products_category_enum" NOT NULL, "description" character varying NOT NULL, "activated" boolean NOT NULL, CONSTRAINT "PK_0806c755e0aca124e67c0cf6d7d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "order_items" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "modified_at" TIMESTAMP NOT NULL DEFAULT now(), "quantity" integer NOT NULL, "price" integer NOT NULL, "product_id" uuid, "order_id" uuid, CONSTRAINT "PK_005269d8574e6fac0493715c308" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "orders_entity" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "modified_at" TIMESTAMP NOT NULL DEFAULT now(), "payment_type" character varying NOT NULL, "order_status" character varying NOT NULL, "total_price" integer NOT NULL, "user_id" uuid, CONSTRAINT "PK_6a5532d4752516bb661d3c7e928" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "wallets" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "modified_at" TIMESTAMP NOT NULL DEFAULT now(), "balance" integer NOT NULL, "money_type" character varying NOT NULL, "user_id" uuid, CONSTRAINT "REL_92558c08091598f7a4439586cd" UNIQUE ("user_id"), CONSTRAINT "PK_8402e5df5a30a229380e83e4f7e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "transactions" ADD CONSTRAINT "FK_e9acc6efa76de013e8c1553ed2b" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "transactions" ADD CONSTRAINT "FK_3cb0558ed36997f1d9ecc1118e7" FOREIGN KEY ("order_id") REFERENCES "orders_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "shopping_sessions" ADD CONSTRAINT "FK_967a43ef25b6a3487dc1c2ea918" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "cart_items" ADD CONSTRAINT "FK_30e89257a105eab7648a35c7fce" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "cart_items" ADD CONSTRAINT "FK_12c41333aa51cc59187becdae93" FOREIGN KEY ("session_id") REFERENCES "shopping_sessions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order_items" ADD CONSTRAINT "FK_9263386c35b6b242540f9493b00" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order_items" ADD CONSTRAINT "FK_145532db85752b29c57d2b7b1f1" FOREIGN KEY ("order_id") REFERENCES "orders_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "orders_entity" ADD CONSTRAINT "FK_4e6129fa4e42f09cc344a4b477e" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "wallets" ADD CONSTRAINT "FK_92558c08091598f7a4439586cda" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "wallets" DROP CONSTRAINT "FK_92558c08091598f7a4439586cda"`);
        await queryRunner.query(`ALTER TABLE "orders_entity" DROP CONSTRAINT "FK_4e6129fa4e42f09cc344a4b477e"`);
        await queryRunner.query(`ALTER TABLE "order_items" DROP CONSTRAINT "FK_145532db85752b29c57d2b7b1f1"`);
        await queryRunner.query(`ALTER TABLE "order_items" DROP CONSTRAINT "FK_9263386c35b6b242540f9493b00"`);
        await queryRunner.query(`ALTER TABLE "cart_items" DROP CONSTRAINT "FK_12c41333aa51cc59187becdae93"`);
        await queryRunner.query(`ALTER TABLE "cart_items" DROP CONSTRAINT "FK_30e89257a105eab7648a35c7fce"`);
        await queryRunner.query(`ALTER TABLE "shopping_sessions" DROP CONSTRAINT "FK_967a43ef25b6a3487dc1c2ea918"`);
        await queryRunner.query(`ALTER TABLE "transactions" DROP CONSTRAINT "FK_3cb0558ed36997f1d9ecc1118e7"`);
        await queryRunner.query(`ALTER TABLE "transactions" DROP CONSTRAINT "FK_e9acc6efa76de013e8c1553ed2b"`);
        await queryRunner.query(`DROP TABLE "wallets"`);
        await queryRunner.query(`DROP TABLE "orders_entity"`);
        await queryRunner.query(`DROP TABLE "order_items"`);
        await queryRunner.query(`DROP TABLE "products"`);
        await queryRunner.query(`DROP TYPE "public"."products_category_enum"`);
        await queryRunner.query(`DROP TABLE "cart_items"`);
        await queryRunner.query(`DROP TABLE "shopping_sessions"`);
        await queryRunner.query(`DROP TABLE "transactions"`);
    }

}
