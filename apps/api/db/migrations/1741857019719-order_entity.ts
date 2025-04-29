import { MigrationInterface, QueryRunner } from "typeorm";

export class OrderEntity1741857019719 implements MigrationInterface {
    name = 'OrderEntity1741857019719'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order" DROP CONSTRAINT "FK_88991860e839c6153a7ec878d39"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_3b69e6cef8beb5c18429ceebe27"`);
        await queryRunner.query(`CREATE TABLE "payment" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "merchantRequestId" character varying NOT NULL, "checkoutRequestId" character varying NOT NULL, "resultCode" integer NOT NULL, "resultDesc" character varying NOT NULL, "amount" numeric(10,2) NOT NULL, "mpesaReceiptNumber" character varying NOT NULL, "transactionDate" TIMESTAMP NOT NULL, "phoneNumber" character varying NOT NULL, "status" character varying NOT NULL DEFAULT 'pending', "failureReason" character varying, "verified" boolean NOT NULL DEFAULT false, CONSTRAINT "PK_fcaec7df5adf9cac408c686b2ab" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "quantity"`);
        await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "productId"`);
        await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "size"`);
        await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "color"`);
        await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "customer_description"`);
        await queryRunner.query(`ALTER TABLE "order" ADD "orderNumber" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "order" DROP CONSTRAINT "PK_1031171c13130102495201e3e20"`);
        await queryRunner.query(`ALTER TABLE "order" ADD CONSTRAINT "PK_fa33b96319b41e5769564eda01c" PRIMARY KEY ("id", "orderNumber")`);
        await queryRunner.query(`ALTER TABLE "order" ADD "checkoutRequestId" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "order" ADD "status" character varying NOT NULL DEFAULT 'failed'`);
        await queryRunner.query(`ALTER TABLE "users" ADD "ordersOrderNumber" integer`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_b4ea38079a01a8b5fe14386c132" FOREIGN KEY ("ordersId", "ordersOrderNumber") REFERENCES "order"("id","orderNumber") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_b4ea38079a01a8b5fe14386c132"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "ordersOrderNumber"`);
        await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "status"`);
        await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "checkoutRequestId"`);
        await queryRunner.query(`ALTER TABLE "order" DROP CONSTRAINT "PK_fa33b96319b41e5769564eda01c"`);
        await queryRunner.query(`ALTER TABLE "order" ADD CONSTRAINT "PK_1031171c13130102495201e3e20" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "orderNumber"`);
        await queryRunner.query(`ALTER TABLE "order" ADD "customer_description" character varying`);
        await queryRunner.query(`ALTER TABLE "order" ADD "color" character varying`);
        await queryRunner.query(`ALTER TABLE "order" ADD "size" character varying`);
        await queryRunner.query(`ALTER TABLE "order" ADD "productId" uuid`);
        await queryRunner.query(`ALTER TABLE "order" ADD "quantity" integer NOT NULL`);
        await queryRunner.query(`DROP TABLE "payment"`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_3b69e6cef8beb5c18429ceebe27" FOREIGN KEY ("ordersId") REFERENCES "order"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order" ADD CONSTRAINT "FK_88991860e839c6153a7ec878d39" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
