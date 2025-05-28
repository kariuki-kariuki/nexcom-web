import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangeNumberType1748432270175 implements MigrationInterface {
    name = 'ChangeNumberType1748432270175'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "analytic" DROP CONSTRAINT "FK_5e059be51423e0e46d03c97740e"`);
        await queryRunner.query(`ALTER TABLE "payment" DROP COLUMN "phoneNumber"`);
        await queryRunner.query(`ALTER TABLE "payment" ADD "phoneNumber" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "lastSeen" SET DEFAULT '"2025-05-28T11:37:51.369Z"'`);
        await queryRunner.query(`ALTER TABLE "analytic" ADD CONSTRAINT "FK_5e059be51423e0e46d03c97740e" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "analytic" DROP CONSTRAINT "FK_5e059be51423e0e46d03c97740e"`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "lastSeen" SET DEFAULT '2025-05-15'`);
        await queryRunner.query(`ALTER TABLE "payment" DROP COLUMN "phoneNumber"`);
        await queryRunner.query(`ALTER TABLE "payment" ADD "phoneNumber" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "analytic" ADD CONSTRAINT "FK_5e059be51423e0e46d03c97740e" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
