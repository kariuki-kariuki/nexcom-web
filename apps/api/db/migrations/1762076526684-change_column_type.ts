import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangeColumnType1762076526684 implements MigrationInterface {
    name = 'ChangeColumnType1762076526684'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "blog" DROP COLUMN "tags"`);
        await queryRunner.query(`ALTER TABLE "blog" ADD "tags" text array NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "lastSeen" SET DEFAULT '"2025-11-02T09:42:07.233Z"'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "lastSeen" SET DEFAULT '2025-10-27'`);
        await queryRunner.query(`ALTER TABLE "blog" DROP COLUMN "tags"`);
        await queryRunner.query(`ALTER TABLE "blog" ADD "tags" text NOT NULL`);
    }

}
