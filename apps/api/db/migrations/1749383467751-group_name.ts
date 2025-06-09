import { MigrationInterface, QueryRunner } from "typeorm";

export class GroupName1749383467751 implements MigrationInterface {
    name = 'GroupName1749383467751'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "conversation" ADD "name" character varying`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "lastSeen" SET DEFAULT '"2025-06-08T11:51:08.788Z"'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "lastSeen" SET DEFAULT '2025-06-08'`);
        await queryRunner.query(`ALTER TABLE "conversation" DROP COLUMN "name"`);
    }

}
