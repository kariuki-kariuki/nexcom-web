import { MigrationInterface, QueryRunner } from "typeorm";

export class Addlastseen1747290417255 implements MigrationInterface {
    name = 'Addlastseen1747290417255'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "lastSeen" date NOT NULL DEFAULT '"2025-05-15T06:26:58.003Z"'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "lastSeen"`);
    }

}
