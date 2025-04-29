import { MigrationInterface, QueryRunner } from "typeorm";

export class ProductVideo1742233468733 implements MigrationInterface {
    name = 'ProductVideo1742233468733'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "product_video" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying, "url" character varying NOT NULL, "description" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "productId" uuid, CONSTRAINT "PK_9769e5e31c1906083b7d2502da3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "product_video" ADD CONSTRAINT "FK_cdc94e1384be913b439c8fbd3c1" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product_video" DROP CONSTRAINT "FK_cdc94e1384be913b439c8fbd3c1"`);
        await queryRunner.query(`DROP TABLE "product_video"`);
    }

}
