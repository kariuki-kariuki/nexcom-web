import { MigrationInterface, QueryRunner } from "typeorm";

export class Groups1749380209933 implements MigrationInterface {
    name = 'Groups1749380209933'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "conversation" ADD "type" character varying NOT NULL DEFAULT 'group'`);
        await queryRunner.query(`ALTER TABLE "conversation" ADD "creatorId" uuid`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "lastSeen" SET DEFAULT '"2025-06-08T10:56:50.972Z"'`);
        await queryRunner.query(`ALTER TABLE "conversation" ADD CONSTRAINT "FK_e574e8ccf4f31b92ad2d9826045" FOREIGN KEY ("creatorId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "conversation" DROP CONSTRAINT "FK_e574e8ccf4f31b92ad2d9826045"`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "lastSeen" SET DEFAULT '2025-05-28'`);
        await queryRunner.query(`ALTER TABLE "conversation" DROP COLUMN "creatorId"`);
        await queryRunner.query(`ALTER TABLE "conversation" DROP COLUMN "type"`);
    }

}
