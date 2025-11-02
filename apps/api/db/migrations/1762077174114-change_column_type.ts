import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangeColumnType1762077174114 implements MigrationInterface {
    name = 'ChangeColumnType1762077174114'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "blog" DROP COLUMN "tags"`);
        await queryRunner.query(`ALTER TABLE "blog" ADD "tags" text array NOT NULL DEFAULT '{Latest}'`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "lastSeen" SET DEFAULT '"2025-11-02T09:52:54.734Z"'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "lastSeen" SET DEFAULT '2025-10-27'`);
        await queryRunner.query(`ALTER TABLE "blog" DROP COLUMN "tags"`);
        await queryRunner.query(`ALTER TABLE "blog" ADD "tags" text NOT NULL`);
    }

}
