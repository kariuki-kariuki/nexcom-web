import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangeColumnType1762079780293 implements MigrationInterface {
    name = 'ChangeColumnType1762079780293'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "lastSeen" SET DEFAULT '"2025-11-02T10:36:20.848Z"'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "lastSeen" SET DEFAULT '2025-11-02'`);
    }

}
