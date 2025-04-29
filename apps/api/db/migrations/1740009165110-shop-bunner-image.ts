import { MigrationInterface, QueryRunner } from "typeorm";

export class ShopBunnerImage1740009165110 implements MigrationInterface {
    name = 'ShopBunnerImage1740009165110'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "banner_image" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying, "url" character varying NOT NULL, "altText" character varying, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_b70568cfd42cccb0caaeb2bcce1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "shop" ADD "physicalAdrress" character varying`);
        await queryRunner.query(`ALTER TABLE "shop" ADD "contact" integer`);
        await queryRunner.query(`ALTER TABLE "shop" ADD "verified" boolean NOT NULL DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "shop" DROP COLUMN "verified"`);
        await queryRunner.query(`ALTER TABLE "shop" DROP COLUMN "contact"`);
        await queryRunner.query(`ALTER TABLE "shop" DROP COLUMN "physicalAdrress"`);
        await queryRunner.query(`DROP TABLE "banner_image"`);
    }

}
