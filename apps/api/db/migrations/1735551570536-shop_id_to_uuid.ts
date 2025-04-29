import { MigrationInterface, QueryRunner } from "typeorm";

export class ShopIdToUuid1735551570536 implements MigrationInterface {
    name = 'ShopIdToUuid1735551570536'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product" DROP CONSTRAINT "FK_1c4b1934c3e8c5b69b3d3d311d6"`);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "shopId"`);
        await queryRunner.query(`ALTER TABLE "product" ADD "shopId" uuid`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_7680babafb8b9ca907bfbd142c5"`);
        await queryRunner.query(`ALTER TABLE "shop" DROP CONSTRAINT "PK_ad47b7c6121fe31cb4b05438e44"`);
        await queryRunner.query(`ALTER TABLE "shop" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "shop" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "shop" ADD CONSTRAINT "PK_ad47b7c6121fe31cb4b05438e44" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "REL_7680babafb8b9ca907bfbd142c"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "shopId"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "shopId" uuid`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "UQ_7680babafb8b9ca907bfbd142c5" UNIQUE ("shopId")`);
        await queryRunner.query(`ALTER TABLE "product" ADD CONSTRAINT "FK_1c4b1934c3e8c5b69b3d3d311d6" FOREIGN KEY ("shopId") REFERENCES "shop"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_7680babafb8b9ca907bfbd142c5" FOREIGN KEY ("shopId") REFERENCES "shop"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_7680babafb8b9ca907bfbd142c5"`);
        await queryRunner.query(`ALTER TABLE "product" DROP CONSTRAINT "FK_1c4b1934c3e8c5b69b3d3d311d6"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "UQ_7680babafb8b9ca907bfbd142c5"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "shopId"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "shopId" integer`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "REL_7680babafb8b9ca907bfbd142c" UNIQUE ("shopId")`);
        await queryRunner.query(`ALTER TABLE "shop" DROP CONSTRAINT "PK_ad47b7c6121fe31cb4b05438e44"`);
        await queryRunner.query(`ALTER TABLE "shop" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "shop" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "shop" ADD CONSTRAINT "PK_ad47b7c6121fe31cb4b05438e44" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_7680babafb8b9ca907bfbd142c5" FOREIGN KEY ("shopId") REFERENCES "shop"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "shopId"`);
        await queryRunner.query(`ALTER TABLE "product" ADD "shopId" integer`);
        await queryRunner.query(`ALTER TABLE "product" ADD CONSTRAINT "FK_1c4b1934c3e8c5b69b3d3d311d6" FOREIGN KEY ("shopId") REFERENCES "shop"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
