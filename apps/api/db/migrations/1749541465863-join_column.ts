import { MigrationInterface, QueryRunner } from "typeorm";

export class JoinColumn1749541465863 implements MigrationInterface {
    name = 'JoinColumn1749541465863'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "conversation" ADD "profileId" uuid`);
        await queryRunner.query(`ALTER TABLE "conversation" ADD CONSTRAINT "UQ_38f7d2ffd919da7992784dd924b" UNIQUE ("profileId")`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "lastSeen" SET DEFAULT '"2025-06-10T07:44:26.533Z"'`);
        await queryRunner.query(`ALTER TABLE "conversation" ADD CONSTRAINT "FK_38f7d2ffd919da7992784dd924b" FOREIGN KEY ("profileId") REFERENCES "image"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "conversation" DROP CONSTRAINT "FK_38f7d2ffd919da7992784dd924b"`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "lastSeen" SET DEFAULT '2025-06-09'`);
        await queryRunner.query(`ALTER TABLE "conversation" DROP CONSTRAINT "UQ_38f7d2ffd919da7992784dd924b"`);
        await queryRunner.query(`ALTER TABLE "conversation" DROP COLUMN "profileId"`);
    }

}
