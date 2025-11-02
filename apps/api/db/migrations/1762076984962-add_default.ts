import { MigrationInterface, QueryRunner } from "typeorm";

export class AddDefault1762076984962 implements MigrationInterface {
    name = 'AddDefault1762076984962'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "blog" DROP COLUMN "tags"`);
        await queryRunner.query(`ALTER TABLE "blog" ADD "tags" text array NOT NULL DEFAULT '{}'`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "lastSeen" SET DEFAULT '"2025-11-02T09:49:45.587Z"'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "lastSeen" SET DEFAULT '2025-10-27'`);
        await queryRunner.query(`ALTER TABLE "blog" DROP COLUMN "tags"`);
        await queryRunner.query(`ALTER TABLE "blog" ADD "tags" text NOT NULL`);
    }

}
