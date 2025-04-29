import { MigrationInterface, QueryRunner } from "typeorm";

export class Timestamps1741871990193 implements MigrationInterface {
    name = 'Timestamps1741871990193'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "payment" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "payment" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "order" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "order" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "cart" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "cart" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cart" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "cart" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "payment" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "payment" DROP COLUMN "created_at"`);
    }

}
