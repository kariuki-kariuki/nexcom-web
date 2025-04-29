import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateColumnName1742736729801 implements MigrationInterface {
    name = 'UpdateColumnName1742736729801'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "shop" DROP COLUMN "contact"`);
        await queryRunner.query(`ALTER TABLE "shop" DROP COLUMN "physicalAdrress"`);
        await queryRunner.query(`ALTER TABLE "order" ADD "paymentId" uuid`);
        await queryRunner.query(`ALTER TABLE "order" ADD CONSTRAINT "UQ_9ad13532f48db4ac5a3b3dd70e5" UNIQUE ("paymentId")`);
        await queryRunner.query(`ALTER TABLE "shop" ADD "adrress" character varying`);
        await queryRunner.query(`ALTER TABLE "shop" ADD "phone" integer`);
        await queryRunner.query(`ALTER TABLE "order" ADD CONSTRAINT "FK_9ad13532f48db4ac5a3b3dd70e5" FOREIGN KEY ("paymentId") REFERENCES "payment"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order" DROP CONSTRAINT "FK_9ad13532f48db4ac5a3b3dd70e5"`);
        await queryRunner.query(`ALTER TABLE "shop" DROP COLUMN "phone"`);
        await queryRunner.query(`ALTER TABLE "shop" DROP COLUMN "adrress"`);
        await queryRunner.query(`ALTER TABLE "order" DROP CONSTRAINT "UQ_9ad13532f48db4ac5a3b3dd70e5"`);
        await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "paymentId"`);
        await queryRunner.query(`ALTER TABLE "shop" ADD "physicalAdrress" character varying`);
        await queryRunner.query(`ALTER TABLE "shop" ADD "contact" integer`);
    }

}
