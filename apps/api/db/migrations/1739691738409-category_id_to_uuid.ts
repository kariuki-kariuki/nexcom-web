import { MigrationInterface, QueryRunner } from "typeorm";

export class CategoryIdToUuid1739691738409 implements MigrationInterface {
    name = 'CategoryIdToUuid1739691738409'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product" DROP CONSTRAINT "FK_ff0c0301a95e517153df97f6812"`);
        await queryRunner.query(`ALTER TABLE "category" DROP CONSTRAINT "PK_9c4e4a89e3674fc9f382d733f03"`);
        await queryRunner.query(`ALTER TABLE "category" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "category" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "category" ADD CONSTRAINT "PK_9c4e4a89e3674fc9f382d733f03" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "categoryId"`);
        await queryRunner.query(`ALTER TABLE "product" ADD "categoryId" uuid`);
        await queryRunner.query(`ALTER TABLE "product" ADD CONSTRAINT "FK_ff0c0301a95e517153df97f6812" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product" DROP CONSTRAINT "FK_ff0c0301a95e517153df97f6812"`);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "categoryId"`);
        await queryRunner.query(`ALTER TABLE "product" ADD "categoryId" integer`);
        await queryRunner.query(`ALTER TABLE "category" DROP CONSTRAINT "PK_9c4e4a89e3674fc9f382d733f03"`);
        await queryRunner.query(`ALTER TABLE "category" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "category" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "category" ADD CONSTRAINT "PK_9c4e4a89e3674fc9f382d733f03" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "product" ADD CONSTRAINT "FK_ff0c0301a95e517153df97f6812" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
