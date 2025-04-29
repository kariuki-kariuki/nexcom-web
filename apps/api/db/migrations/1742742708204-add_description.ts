import { MigrationInterface, QueryRunner } from "typeorm";

export class AddDescription1742742708204 implements MigrationInterface {
    name = 'AddDescription1742742708204'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "shop" ADD "description" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "shop" DROP COLUMN "description"`);
    }

}
