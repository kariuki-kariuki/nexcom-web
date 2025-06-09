import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangeDefault1749476713304 implements MigrationInterface {
    name = 'ChangeDefault1749476713304'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "conversation" ALTER COLUMN "type" SET DEFAULT 'conversation'`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "lastSeen" SET DEFAULT '"2025-06-09T13:45:14.616Z"'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "lastSeen" SET DEFAULT '2025-06-08'`);
        await queryRunner.query(`ALTER TABLE "conversation" ALTER COLUMN "type" SET DEFAULT 'group'`);
    }

}
