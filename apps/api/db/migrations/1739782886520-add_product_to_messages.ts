import { MigrationInterface, QueryRunner } from "typeorm";

export class AddProductToMessages1739782886520 implements MigrationInterface {
    name = 'AddProductToMessages1739782886520'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "message" DROP COLUMN "productId"`);
        await queryRunner.query(`ALTER TABLE "message" ADD "productId" uuid`);
        await queryRunner.query(`ALTER TABLE "message" ADD CONSTRAINT "FK_9d91cdd8a0ee3dd7798d4aaee1c" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "message" DROP CONSTRAINT "FK_9d91cdd8a0ee3dd7798d4aaee1c"`);
        await queryRunner.query(`ALTER TABLE "message" DROP COLUMN "productId"`);
        await queryRunner.query(`ALTER TABLE "message" ADD "productId" character varying`);
    }

}
