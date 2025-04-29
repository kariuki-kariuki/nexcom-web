import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangIdToUuid1738583152502 implements MigrationInterface {
    name = 'ChangIdToUuid1738583152502'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "session" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "json" text NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "expiredAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_f55da76ac1c3ac420f444d2ff11" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "product_size" DROP CONSTRAINT "FK_013d7ffd083e76fcd6fe815017c"`);
        await queryRunner.query(`ALTER TABLE "product_size" DROP CONSTRAINT "PK_3210db31599e5c505183be05896"`);
        await queryRunner.query(`ALTER TABLE "product_size" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "product_size" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "product_size" ADD CONSTRAINT "PK_3210db31599e5c505183be05896" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "product_size" DROP COLUMN "productId"`);
        await queryRunner.query(`ALTER TABLE "product_size" ADD "productId" uuid`);
        await queryRunner.query(`ALTER TABLE "image" DROP CONSTRAINT "FK_c6eb61588205e25a848ba6105cd"`);
        await queryRunner.query(`ALTER TABLE "image" DROP COLUMN "productId"`);
        await queryRunner.query(`ALTER TABLE "image" ADD "productId" uuid`);
        await queryRunner.query(`ALTER TABLE "order" DROP CONSTRAINT "FK_88991860e839c6153a7ec878d39"`);
        await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "productId"`);
        await queryRunner.query(`ALTER TABLE "order" ADD "productId" uuid`);
        await queryRunner.query(`ALTER TABLE "product" DROP CONSTRAINT "PK_bebc9158e480b949565b4dc7a82"`);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "product" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "product" ADD CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "status" SET DEFAULT 'Hey there, I am using Nexcom, The future of connected commerce.'`);
        await queryRunner.query(`ALTER TABLE "product_size" ADD CONSTRAINT "FK_013d7ffd083e76fcd6fe815017c" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "image" ADD CONSTRAINT "FK_c6eb61588205e25a848ba6105cd" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order" ADD CONSTRAINT "FK_88991860e839c6153a7ec878d39" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order" DROP CONSTRAINT "FK_88991860e839c6153a7ec878d39"`);
        await queryRunner.query(`ALTER TABLE "image" DROP CONSTRAINT "FK_c6eb61588205e25a848ba6105cd"`);
        await queryRunner.query(`ALTER TABLE "product_size" DROP CONSTRAINT "FK_013d7ffd083e76fcd6fe815017c"`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "status" SET DEFAULT 'Hey there, I am using COCO'`);
        await queryRunner.query(`ALTER TABLE "product" DROP CONSTRAINT "PK_bebc9158e480b949565b4dc7a82"`);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "product" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "product" ADD CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "productId"`);
        await queryRunner.query(`ALTER TABLE "order" ADD "productId" integer`);
        await queryRunner.query(`ALTER TABLE "order" ADD CONSTRAINT "FK_88991860e839c6153a7ec878d39" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "image" DROP COLUMN "productId"`);
        await queryRunner.query(`ALTER TABLE "image" ADD "productId" integer`);
        await queryRunner.query(`ALTER TABLE "image" ADD CONSTRAINT "FK_c6eb61588205e25a848ba6105cd" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product_size" DROP COLUMN "productId"`);
        await queryRunner.query(`ALTER TABLE "product_size" ADD "productId" integer`);
        await queryRunner.query(`ALTER TABLE "product_size" DROP CONSTRAINT "PK_3210db31599e5c505183be05896"`);
        await queryRunner.query(`ALTER TABLE "product_size" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "product_size" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "product_size" ADD CONSTRAINT "PK_3210db31599e5c505183be05896" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "product_size" ADD CONSTRAINT "FK_013d7ffd083e76fcd6fe815017c" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`DROP TABLE "session"`);
    }

}
