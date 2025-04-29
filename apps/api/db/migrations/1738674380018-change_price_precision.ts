import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangePricePrecision1738674380018 implements MigrationInterface {
    name = 'ChangePricePrecision1738674380018'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product_size" DROP COLUMN "price"`);
        await queryRunner.query(`ALTER TABLE "product_size" ADD "price" integer NOT NULL DEFAULT '10'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product_size" DROP COLUMN "price"`);
        await queryRunner.query(`ALTER TABLE "product_size" ADD "price" numeric(10,2) NOT NULL`);
    }

}
