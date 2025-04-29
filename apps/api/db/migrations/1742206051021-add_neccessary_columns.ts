import { MigrationInterface, QueryRunner } from "typeorm";

export class AddNeccessaryColumns1742206051021 implements MigrationInterface {
    name = 'AddNeccessaryColumns1742206051021'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order" ADD "resultCode" integer`);
        await queryRunner.query(`ALTER TABLE "order" ADD "resultDesc" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "resultDesc"`);
        await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "resultCode"`);
    }

}
