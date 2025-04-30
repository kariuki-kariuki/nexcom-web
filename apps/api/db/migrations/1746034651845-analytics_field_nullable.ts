import { MigrationInterface, QueryRunner } from "typeorm";

export class AnalyticsFieldNullable1746034651845 implements MigrationInterface {
    name = 'AnalyticsFieldNullable1746034651845'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "analytic" ADD "browser" character varying`);
        await queryRunner.query(`ALTER TABLE "analytic" ADD "os" character varying`);
        await queryRunner.query(`ALTER TABLE "analytic" ADD "platform" character varying`);
        await queryRunner.query(`ALTER TABLE "analytic" ADD "isMobile" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "analytic" ADD "isDesktop" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "analytic" ADD "isTablet" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "analytic" ADD "version" character varying NOT NULL DEFAULT '1.0.0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "analytic" DROP COLUMN "version"`);
        await queryRunner.query(`ALTER TABLE "analytic" DROP COLUMN "isTablet"`);
        await queryRunner.query(`ALTER TABLE "analytic" DROP COLUMN "isDesktop"`);
        await queryRunner.query(`ALTER TABLE "analytic" DROP COLUMN "isMobile"`);
        await queryRunner.query(`ALTER TABLE "analytic" DROP COLUMN "platform"`);
        await queryRunner.query(`ALTER TABLE "analytic" DROP COLUMN "os"`);
        await queryRunner.query(`ALTER TABLE "analytic" DROP COLUMN "browser"`);
    }

}
