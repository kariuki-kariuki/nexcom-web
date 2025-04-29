import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialCategories1735303241024 implements MigrationInterface {
    name = 'InitialCategories1735303241024'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."message_state_enum" AS ENUM('sent', 'delivered', 'read')`);
        await queryRunner.query(`CREATE TABLE "message" ("id" SERIAL NOT NULL, "message" text NOT NULL, "files" text, "state" "public"."message_state_enum" NOT NULL DEFAULT 'sent', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "conversationId" integer, "userId" integer, CONSTRAINT "PK_ba01f0a3e0123651915008bc578" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "conversation" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_864528ec4274360a40f66c29845" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "product_size" ("id" SERIAL NOT NULL, "size" character varying NOT NULL, "price" numeric(10,2) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "productId" integer, CONSTRAINT "PK_3210db31599e5c505183be05896" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "image" ("id" SERIAL NOT NULL, "name" character varying, "url" character varying NOT NULL, "altText" character varying, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "productId" integer, CONSTRAINT "PK_d6db1ab4ee9ad9dbe86c64e4cc3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "category" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_9c4e4a89e3674fc9f382d733f03" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "order" ("id" SERIAL NOT NULL, "quantity" integer NOT NULL, "size" character varying, "color" character varying, "customer_description" character varying, "productId" integer, "userId" integer, CONSTRAINT "PK_1031171c13130102495201e3e20" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "product" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" text, "status" character varying NOT NULL DEFAULT 'Published', "stock" integer, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "categoryId" integer, "shopId" integer, CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "shop" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "UQ_f0640e30fef1d175426d80dbc13" UNIQUE ("name"), CONSTRAINT "PK_ad47b7c6121fe31cb4b05438e44" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "status" character varying NOT NULL DEFAULT 'Hey there, I am using COCO', "email" character varying NOT NULL, "password" character varying, "twoFAsecret" text, "enable2FA" boolean NOT NULL DEFAULT false, "apiKey" character varying NOT NULL, "phone" character varying NOT NULL, "photo" text, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "shopId" integer, "ordersId" integer, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "UQ_c654b438e89f6e1fbd2828b5d37" UNIQUE ("apiKey"), CONSTRAINT "REL_7680babafb8b9ca907bfbd142c" UNIQUE ("shopId"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "tender" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "url" character varying NOT NULL, CONSTRAINT "PK_cf05759ac4297391f87db210f64" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."job_status_enum" AS ENUM('Published', 'Draft', 'Archive')`);
        await queryRunner.query(`CREATE TABLE "job" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "description" character varying NOT NULL, "requirements" text array NOT NULL DEFAULT '{}', "deadline" TIMESTAMP NOT NULL, "location" character varying NOT NULL, "type" character varying NOT NULL, "jd" character varying, "status" "public"."job_status_enum" NOT NULL DEFAULT 'Published', CONSTRAINT "PK_98ab1c14ff8d1cf80d18703b92f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "gallery" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_65d7a1ef91ddafb3e7071b188a0" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "gallery_image" ("id" SERIAL NOT NULL, "name" character varying, "url" character varying NOT NULL, "altText" character varying, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "galleryId" integer, CONSTRAINT "PK_8be2bf37ccaf41c13720c89eb83" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "resource_file" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "url" character varying NOT NULL, CONSTRAINT "PK_1c6bc79e1aa32cc0fa76686dcd4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "faq" ("id" SERIAL NOT NULL, "question" character varying NOT NULL, "answer" character varying NOT NULL, CONSTRAINT "PK_d6f5a52b1a96dd8d0591f9fbc47" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "blog_image" ("id" SERIAL NOT NULL, "name" character varying, "url" character varying NOT NULL, "altText" character varying, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "blogId" integer, CONSTRAINT "PK_05924474be158e58458d7bd4665" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "blog" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "url" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_85c6532ad065a448e9de7638571" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users_conversations_conversation" ("usersId" integer NOT NULL, "conversationId" integer NOT NULL, CONSTRAINT "PK_97daabee0c6f33058d4ae530827" PRIMARY KEY ("usersId", "conversationId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_fa453ddb7a316f301cf235fbc1" ON "users_conversations_conversation" ("usersId") `);
        await queryRunner.query(`CREATE INDEX "IDX_afc41b206a3099e02d9c9ab20f" ON "users_conversations_conversation" ("conversationId") `);
        await queryRunner.query(`ALTER TABLE "message" ADD CONSTRAINT "FK_7cf4a4df1f2627f72bf6231635f" FOREIGN KEY ("conversationId") REFERENCES "conversation"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "message" ADD CONSTRAINT "FK_446251f8ceb2132af01b68eb593" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product_size" ADD CONSTRAINT "FK_013d7ffd083e76fcd6fe815017c" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "image" ADD CONSTRAINT "FK_c6eb61588205e25a848ba6105cd" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order" ADD CONSTRAINT "FK_88991860e839c6153a7ec878d39" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order" ADD CONSTRAINT "FK_caabe91507b3379c7ba73637b84" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product" ADD CONSTRAINT "FK_ff0c0301a95e517153df97f6812" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product" ADD CONSTRAINT "FK_1c4b1934c3e8c5b69b3d3d311d6" FOREIGN KEY ("shopId") REFERENCES "shop"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_7680babafb8b9ca907bfbd142c5" FOREIGN KEY ("shopId") REFERENCES "shop"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_3b69e6cef8beb5c18429ceebe27" FOREIGN KEY ("ordersId") REFERENCES "order"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "gallery_image" ADD CONSTRAINT "FK_80f1d9d24cb6797090616bc16b8" FOREIGN KEY ("galleryId") REFERENCES "gallery"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "blog_image" ADD CONSTRAINT "FK_ce8d6380d907e85a4216d89d409" FOREIGN KEY ("blogId") REFERENCES "blog"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users_conversations_conversation" ADD CONSTRAINT "FK_fa453ddb7a316f301cf235fbc11" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "users_conversations_conversation" ADD CONSTRAINT "FK_afc41b206a3099e02d9c9ab20fd" FOREIGN KEY ("conversationId") REFERENCES "conversation"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users_conversations_conversation" DROP CONSTRAINT "FK_afc41b206a3099e02d9c9ab20fd"`);
        await queryRunner.query(`ALTER TABLE "users_conversations_conversation" DROP CONSTRAINT "FK_fa453ddb7a316f301cf235fbc11"`);
        await queryRunner.query(`ALTER TABLE "blog_image" DROP CONSTRAINT "FK_ce8d6380d907e85a4216d89d409"`);
        await queryRunner.query(`ALTER TABLE "gallery_image" DROP CONSTRAINT "FK_80f1d9d24cb6797090616bc16b8"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_3b69e6cef8beb5c18429ceebe27"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_7680babafb8b9ca907bfbd142c5"`);
        await queryRunner.query(`ALTER TABLE "product" DROP CONSTRAINT "FK_1c4b1934c3e8c5b69b3d3d311d6"`);
        await queryRunner.query(`ALTER TABLE "product" DROP CONSTRAINT "FK_ff0c0301a95e517153df97f6812"`);
        await queryRunner.query(`ALTER TABLE "order" DROP CONSTRAINT "FK_caabe91507b3379c7ba73637b84"`);
        await queryRunner.query(`ALTER TABLE "order" DROP CONSTRAINT "FK_88991860e839c6153a7ec878d39"`);
        await queryRunner.query(`ALTER TABLE "image" DROP CONSTRAINT "FK_c6eb61588205e25a848ba6105cd"`);
        await queryRunner.query(`ALTER TABLE "product_size" DROP CONSTRAINT "FK_013d7ffd083e76fcd6fe815017c"`);
        await queryRunner.query(`ALTER TABLE "message" DROP CONSTRAINT "FK_446251f8ceb2132af01b68eb593"`);
        await queryRunner.query(`ALTER TABLE "message" DROP CONSTRAINT "FK_7cf4a4df1f2627f72bf6231635f"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_afc41b206a3099e02d9c9ab20f"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_fa453ddb7a316f301cf235fbc1"`);
        await queryRunner.query(`DROP TABLE "users_conversations_conversation"`);
        await queryRunner.query(`DROP TABLE "blog"`);
        await queryRunner.query(`DROP TABLE "blog_image"`);
        await queryRunner.query(`DROP TABLE "faq"`);
        await queryRunner.query(`DROP TABLE "resource_file"`);
        await queryRunner.query(`DROP TABLE "gallery_image"`);
        await queryRunner.query(`DROP TABLE "gallery"`);
        await queryRunner.query(`DROP TABLE "job"`);
        await queryRunner.query(`DROP TYPE "public"."job_status_enum"`);
        await queryRunner.query(`DROP TABLE "tender"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "shop"`);
        await queryRunner.query(`DROP TABLE "product"`);
        await queryRunner.query(`DROP TABLE "order"`);
        await queryRunner.query(`DROP TABLE "category"`);
        await queryRunner.query(`DROP TABLE "image"`);
        await queryRunner.query(`DROP TABLE "product_size"`);
        await queryRunner.query(`DROP TABLE "conversation"`);
        await queryRunner.query(`DROP TABLE "message"`);
        await queryRunner.query(`DROP TYPE "public"."message_state_enum"`);
    }

}
