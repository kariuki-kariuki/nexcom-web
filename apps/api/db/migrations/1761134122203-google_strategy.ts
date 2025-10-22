import { MigrationInterface, QueryRunner } from "typeorm";

export class GoogleStrategy1761134122203 implements MigrationInterface {
    name = 'GoogleStrategy1761134122203'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "provider" character varying NOT NULL DEFAULT 'local'`);
        await queryRunner.query(`ALTER TABLE "users" ADD "providerId" character varying`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "lastSeen" SET DEFAULT '"2025-10-22T11:55:25.842Z"'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "lastSeen" SET DEFAULT '2025-10-07'`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "providerId"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "provider"`);
    }

}
