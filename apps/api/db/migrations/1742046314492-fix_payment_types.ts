import { MigrationInterface, QueryRunner } from "typeorm";

export class FixPaymentTypes1742046314492 implements MigrationInterface {
    name = 'FixPaymentTypes1742046314492'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cart" ADD "ordered" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "payment" DROP COLUMN "amount"`);
        await queryRunner.query(`ALTER TABLE "payment" ADD "amount" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "payment" DROP COLUMN "phoneNumber"`);
        await queryRunner.query(`ALTER TABLE "payment" ADD "phoneNumber" integer NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "payment" DROP COLUMN "phoneNumber"`);
        await queryRunner.query(`ALTER TABLE "payment" ADD "phoneNumber" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "payment" DROP COLUMN "amount"`);
        await queryRunner.query(`ALTER TABLE "payment" ADD "amount" numeric(10,2) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "cart" DROP COLUMN "ordered"`);
    }

}
