import { MigrationInterface, QueryRunner } from "typeorm";

export class CartIncludeSelectedSize1741859934274 implements MigrationInterface {
    name = 'CartIncludeSelectedSize1741859934274'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cart" RENAME COLUMN "size" TO "sizeId"`);
        await queryRunner.query(`ALTER TABLE "order" ADD "totalAmount" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "cart" DROP COLUMN "sizeId"`);
        await queryRunner.query(`ALTER TABLE "cart" ADD "sizeId" uuid`);
        await queryRunner.query(`ALTER TABLE "cart" ADD CONSTRAINT "FK_07e2b2f8373cd14734c1a185d72" FOREIGN KEY ("sizeId") REFERENCES "product_size"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cart" DROP CONSTRAINT "FK_07e2b2f8373cd14734c1a185d72"`);
        await queryRunner.query(`ALTER TABLE "cart" DROP COLUMN "sizeId"`);
        await queryRunner.query(`ALTER TABLE "cart" ADD "sizeId" character varying`);
        await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "totalAmount"`);
        await queryRunner.query(`ALTER TABLE "cart" RENAME COLUMN "sizeId" TO "size"`);
    }

}
