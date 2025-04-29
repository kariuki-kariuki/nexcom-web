import { MigrationInterface, QueryRunner } from "typeorm";

export class FixRealations1742048105048 implements MigrationInterface {
    name = 'FixRealations1742048105048'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cart" ADD "ordersId" uuid`);
        await queryRunner.query(`ALTER TABLE "cart" ADD "ordersOrderNumber" integer`);
        await queryRunner.query(`ALTER TABLE "cart" ADD CONSTRAINT "FK_a25fdf5d201736ac575596ff6f4" FOREIGN KEY ("ordersId", "ordersOrderNumber") REFERENCES "order"("id","orderNumber") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cart" DROP CONSTRAINT "FK_a25fdf5d201736ac575596ff6f4"`);
        await queryRunner.query(`ALTER TABLE "cart" DROP COLUMN "ordersOrderNumber"`);
        await queryRunner.query(`ALTER TABLE "cart" DROP COLUMN "ordersId"`);
    }

}
