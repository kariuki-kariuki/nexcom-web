import { MigrationInterface, QueryRunner } from "typeorm";

export class AddMerchantId1742026208486 implements MigrationInterface {
    name = 'AddMerchantId1742026208486'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order" ADD "merchantRequestID" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "order" ALTER COLUMN "status" SET DEFAULT 'pending'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order" ALTER COLUMN "status" SET DEFAULT 'failed'`);
        await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "merchantRequestID"`);
    }

}
