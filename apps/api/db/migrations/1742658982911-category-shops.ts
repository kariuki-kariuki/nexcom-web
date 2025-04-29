import { MigrationInterface, QueryRunner } from "typeorm";

export class CategoryShops1742658982911 implements MigrationInterface {
    name = 'CategoryShops1742658982911'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "shop" ADD "categoryId" uuid`);
        await queryRunner.query(`ALTER TABLE "shop" ADD CONSTRAINT "FK_f0d159b548e76fba75dc5c4f437" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "shop" DROP CONSTRAINT "FK_f0d159b548e76fba75dc5c4f437"`);
        await queryRunner.query(`ALTER TABLE "shop" DROP COLUMN "categoryId"`);
    }

}
