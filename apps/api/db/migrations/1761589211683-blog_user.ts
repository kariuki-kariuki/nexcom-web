import { MigrationInterface, QueryRunner } from "typeorm";

export class BlogUser1761589211683 implements MigrationInterface {
    name = 'BlogUser1761589211683'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "lastSeen" SET DEFAULT '"2025-10-27T18:20:12.284Z"'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "lastSeen" SET DEFAULT '2025-10-27'`);
    }

}
