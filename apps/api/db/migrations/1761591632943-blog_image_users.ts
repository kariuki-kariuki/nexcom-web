import { MigrationInterface, QueryRunner } from "typeorm";

export class BlogImageUsers1761591632943 implements MigrationInterface {
    name = 'BlogImageUsers1761591632943'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "blog" ADD "featuredImageId" uuid`);
        await queryRunner.query(`ALTER TABLE "blog" ADD CONSTRAINT "UQ_c92410dc431bce5c1f54e896912" UNIQUE ("featuredImageId")`);
        await queryRunner.query(`ALTER TABLE "blog" ADD "authorId" uuid`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "lastSeen" SET DEFAULT '"2025-10-27T19:00:33.532Z"'`);
        await queryRunner.query(`ALTER TABLE "blog" ADD CONSTRAINT "FK_c92410dc431bce5c1f54e896912" FOREIGN KEY ("featuredImageId") REFERENCES "image"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "blog" ADD CONSTRAINT "FK_a001483d5ba65dad16557cd6ddb" FOREIGN KEY ("authorId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "blog" DROP CONSTRAINT "FK_a001483d5ba65dad16557cd6ddb"`);
        await queryRunner.query(`ALTER TABLE "blog" DROP CONSTRAINT "FK_c92410dc431bce5c1f54e896912"`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "lastSeen" SET DEFAULT '2025-10-27'`);
        await queryRunner.query(`ALTER TABLE "blog" DROP COLUMN "authorId"`);
        await queryRunner.query(`ALTER TABLE "blog" DROP CONSTRAINT "UQ_c92410dc431bce5c1f54e896912"`);
        await queryRunner.query(`ALTER TABLE "blog" DROP COLUMN "featuredImageId"`);
    }

}
