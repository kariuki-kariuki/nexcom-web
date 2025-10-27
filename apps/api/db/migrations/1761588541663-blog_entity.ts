import { MigrationInterface, QueryRunner } from "typeorm";

export class BlogEntity1761588541663 implements MigrationInterface {
    name = 'BlogEntity1761588541663'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "blog" DROP COLUMN "url"`);
        await queryRunner.query(`ALTER TABLE "blog" ADD "description" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "blog" ADD "content" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "blog" ADD "tags" text NOT NULL`);
        await queryRunner.query(`ALTER TABLE "blog" ADD "status" character varying NOT NULL DEFAULT 'Draft'`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "lastSeen" SET DEFAULT '"2025-10-27T18:09:02.224Z"'`);
        await queryRunner.query(`ALTER TABLE "blog" DROP CONSTRAINT "PK_85c6532ad065a448e9de7638571"`);
        await queryRunner.query(`ALTER TABLE "blog" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "blog" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "blog" ADD CONSTRAINT "PK_85c6532ad065a448e9de7638571" PRIMARY KEY ("id")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "blog" DROP CONSTRAINT "PK_85c6532ad065a448e9de7638571"`);
        await queryRunner.query(`ALTER TABLE "blog" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "blog" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "blog" ADD CONSTRAINT "PK_85c6532ad065a448e9de7638571" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "lastSeen" SET DEFAULT '2025-10-22'`);
        await queryRunner.query(`ALTER TABLE "blog" DROP COLUMN "status"`);
        await queryRunner.query(`ALTER TABLE "blog" DROP COLUMN "tags"`);
        await queryRunner.query(`ALTER TABLE "blog" DROP COLUMN "content"`);
        await queryRunner.query(`ALTER TABLE "blog" DROP COLUMN "description"`);
        await queryRunner.query(`ALTER TABLE "blog" ADD "url" character varying NOT NULL`);
    }

}
