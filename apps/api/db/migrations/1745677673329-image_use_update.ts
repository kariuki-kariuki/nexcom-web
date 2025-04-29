import { MigrationInterface, QueryRunner } from "typeorm";

export class ImageUseUpdate1745677673329 implements MigrationInterface {
    name = 'ImageUseUpdate1745677673329'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "shop" DROP CONSTRAINT "FK_198b568fe4b77893908cc25eefa"`);
        await queryRunner.query(`ALTER TABLE "users" RENAME COLUMN "photo" TO "avatarId"`);
        await queryRunner.query(`ALTER TABLE "image" ADD "galleryId" integer`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "avatarId"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "avatarId" uuid`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "UQ_3e1f52ec904aed992472f2be147" UNIQUE ("avatarId")`);
        await queryRunner.query(`ALTER TABLE "image" ADD CONSTRAINT "FK_db76f1359fbcb0d29d9e4e2bbdf" FOREIGN KEY ("galleryId") REFERENCES "gallery"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "shop" ADD CONSTRAINT "FK_198b568fe4b77893908cc25eefa" FOREIGN KEY ("bannerImageId") REFERENCES "image"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_3e1f52ec904aed992472f2be147" FOREIGN KEY ("avatarId") REFERENCES "image"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_3e1f52ec904aed992472f2be147"`);
        await queryRunner.query(`ALTER TABLE "shop" DROP CONSTRAINT "FK_198b568fe4b77893908cc25eefa"`);
        await queryRunner.query(`ALTER TABLE "image" DROP CONSTRAINT "FK_db76f1359fbcb0d29d9e4e2bbdf"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "UQ_3e1f52ec904aed992472f2be147"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "avatarId"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "avatarId" text`);
        await queryRunner.query(`ALTER TABLE "image" DROP COLUMN "galleryId"`);
        await queryRunner.query(`ALTER TABLE "users" RENAME COLUMN "avatarId" TO "photo"`);
        await queryRunner.query(`ALTER TABLE "shop" ADD CONSTRAINT "FK_198b568fe4b77893908cc25eefa" FOREIGN KEY ("bannerImageId") REFERENCES "banner_image"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
