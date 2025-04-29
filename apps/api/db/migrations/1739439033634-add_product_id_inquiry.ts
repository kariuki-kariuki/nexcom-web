import { MigrationInterface, QueryRunner } from "typeorm";

export class AddProductIdInquiry1739439033634 implements MigrationInterface {
    name = 'AddProductIdInquiry1739439033634'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "message" ADD "productId" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "message" DROP COLUMN "productId"`);
    }

}
