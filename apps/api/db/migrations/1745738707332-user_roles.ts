import { MigrationInterface, QueryRunner } from "typeorm";

export class UserRoles1745738707332 implements MigrationInterface {
    name = 'UserRoles1745738707332'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "role" character varying NOT NULL DEFAULT 'USER'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "role"`);
    }

}
