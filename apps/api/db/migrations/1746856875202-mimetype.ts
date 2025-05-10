import { MigrationInterface, QueryRunner } from "typeorm";

export class Mimetype1746856875202 implements MigrationInterface {
    name = 'Mimetype1746856875202'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_b4ea38079a01a8b5fe14386c132"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "ordersId"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "ordersOrderNumber"`);
        await queryRunner.query(`ALTER TABLE "image" ADD "mimeType" character varying NOT NULL DEFAULT 'image/png'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "image" DROP COLUMN "mimeType"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "ordersOrderNumber" integer`);
        await queryRunner.query(`ALTER TABLE "users" ADD "ordersId" uuid`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_b4ea38079a01a8b5fe14386c132" FOREIGN KEY ("ordersId", "ordersOrderNumber") REFERENCES "order"("id","orderNumber") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
