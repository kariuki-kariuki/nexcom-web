import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateCartItem1741793232575 implements MigrationInterface {
    name = 'CreateCartItem1741793232575'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "cart" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "quantity" integer NOT NULL, "size" character varying, "color" character varying, "customer_description" character varying, "productId" uuid, "userId" uuid, CONSTRAINT "PK_c524ec48751b9b5bcfbf6e59be7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "cart" ADD CONSTRAINT "FK_371eb56ecc4104c2644711fa85f" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "cart" ADD CONSTRAINT "FK_756f53ab9466eb52a52619ee019" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cart" DROP CONSTRAINT "FK_756f53ab9466eb52a52619ee019"`);
        await queryRunner.query(`ALTER TABLE "cart" DROP CONSTRAINT "FK_371eb56ecc4104c2644711fa85f"`);
        await queryRunner.query(`DROP TABLE "cart"`);
    }

}
