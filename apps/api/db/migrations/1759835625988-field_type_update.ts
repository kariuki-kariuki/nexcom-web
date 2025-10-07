import { MigrationInterface, QueryRunner } from "typeorm";

export class FieldTypeUpdate1759835625988 implements MigrationInterface {
    name = 'FieldTypeUpdate1759835625988'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "job" DROP COLUMN "jd"`);
        await queryRunner.query(`ALTER TABLE "job" ADD "shopId" uuid`);
        await queryRunner.query(`ALTER TABLE "job" ADD "jdId" uuid`);
        await queryRunner.query(`ALTER TABLE "job" ADD CONSTRAINT "UQ_59d5f3497aeff7f6c14fb2032bb" UNIQUE ("jdId")`);
        await queryRunner.query(`ALTER TABLE "faq" ADD "shopId" uuid`);
        await queryRunner.query(`ALTER TABLE "job" DROP CONSTRAINT "PK_98ab1c14ff8d1cf80d18703b92f"`);
        await queryRunner.query(`ALTER TABLE "job" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "job" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "job" ADD CONSTRAINT "PK_98ab1c14ff8d1cf80d18703b92f" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "faq" DROP CONSTRAINT "PK_d6f5a52b1a96dd8d0591f9fbc47"`);
        await queryRunner.query(`ALTER TABLE "faq" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "faq" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "faq" ADD CONSTRAINT "PK_d6f5a52b1a96dd8d0591f9fbc47" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "lastSeen" SET DEFAULT '"2025-10-07T11:13:46.663Z"'`);
        await queryRunner.query(`ALTER TABLE "job" ADD CONSTRAINT "FK_efdbdfa4a8693b7156b18929a22" FOREIGN KEY ("shopId") REFERENCES "shop"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "job" ADD CONSTRAINT "FK_59d5f3497aeff7f6c14fb2032bb" FOREIGN KEY ("jdId") REFERENCES "image"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "faq" ADD CONSTRAINT "FK_b88ca72cfe7aa3b79e5887a7381" FOREIGN KEY ("shopId") REFERENCES "shop"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "faq" DROP CONSTRAINT "FK_b88ca72cfe7aa3b79e5887a7381"`);
        await queryRunner.query(`ALTER TABLE "job" DROP CONSTRAINT "FK_59d5f3497aeff7f6c14fb2032bb"`);
        await queryRunner.query(`ALTER TABLE "job" DROP CONSTRAINT "FK_efdbdfa4a8693b7156b18929a22"`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "lastSeen" SET DEFAULT '2025-06-10'`);
        await queryRunner.query(`ALTER TABLE "faq" DROP CONSTRAINT "PK_d6f5a52b1a96dd8d0591f9fbc47"`);
        await queryRunner.query(`ALTER TABLE "faq" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "faq" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "faq" ADD CONSTRAINT "PK_d6f5a52b1a96dd8d0591f9fbc47" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "job" DROP CONSTRAINT "PK_98ab1c14ff8d1cf80d18703b92f"`);
        await queryRunner.query(`ALTER TABLE "job" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "job" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "job" ADD CONSTRAINT "PK_98ab1c14ff8d1cf80d18703b92f" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "faq" DROP COLUMN "shopId"`);
        await queryRunner.query(`ALTER TABLE "job" DROP CONSTRAINT "UQ_59d5f3497aeff7f6c14fb2032bb"`);
        await queryRunner.query(`ALTER TABLE "job" DROP COLUMN "jdId"`);
        await queryRunner.query(`ALTER TABLE "job" DROP COLUMN "shopId"`);
        await queryRunner.query(`ALTER TABLE "job" ADD "jd" character varying`);
    }

}
