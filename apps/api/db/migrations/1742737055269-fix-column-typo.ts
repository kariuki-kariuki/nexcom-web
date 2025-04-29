import { MigrationInterface, QueryRunner } from "typeorm";

export class FixColumnTypo1742737055269 implements MigrationInterface {
    name = 'FixColumnTypo1742737055269'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "shop" RENAME COLUMN "adrress" TO "address"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "shop" RENAME COLUMN "address" TO "adrress"`);
    }

}
