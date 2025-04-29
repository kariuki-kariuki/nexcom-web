import { MigrationInterface, QueryRunner } from "typeorm";

export class AddJoinColumn1742718206194 implements MigrationInterface {
    name = 'AddJoinColumn1742718206194'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "shop" ADD "bannerImageId" uuid`);
        await queryRunner.query(`ALTER TABLE "shop" ADD CONSTRAINT "UQ_198b568fe4b77893908cc25eefa" UNIQUE ("bannerImageId")`);
        await queryRunner.query(`ALTER TABLE "shop" ADD CONSTRAINT "FK_198b568fe4b77893908cc25eefa" FOREIGN KEY ("bannerImageId") REFERENCES "banner_image"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "shop" DROP CONSTRAINT "FK_198b568fe4b77893908cc25eefa"`);
        await queryRunner.query(`ALTER TABLE "shop" DROP CONSTRAINT "UQ_198b568fe4b77893908cc25eefa"`);
        await queryRunner.query(`ALTER TABLE "shop" DROP COLUMN "bannerImageId"`);
    }

}
