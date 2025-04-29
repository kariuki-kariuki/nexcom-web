import { MigrationInterface, QueryRunner } from "typeorm";

export class IdToUuid1735553547650 implements MigrationInterface {
    name = 'IdToUuid1735553547650'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "message" DROP CONSTRAINT "FK_7cf4a4df1f2627f72bf6231635f"`);
        await queryRunner.query(`ALTER TABLE "message" DROP CONSTRAINT "PK_ba01f0a3e0123651915008bc578"`);
        await queryRunner.query(`ALTER TABLE "message" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "message" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "message" ADD CONSTRAINT "PK_ba01f0a3e0123651915008bc578" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "message" DROP COLUMN "conversationId"`);
        await queryRunner.query(`ALTER TABLE "message" ADD "conversationId" uuid`);
        await queryRunner.query(`ALTER TABLE "users_conversations_conversation" DROP CONSTRAINT "FK_afc41b206a3099e02d9c9ab20fd"`);
        await queryRunner.query(`ALTER TABLE "conversation" DROP CONSTRAINT "PK_864528ec4274360a40f66c29845"`);
        await queryRunner.query(`ALTER TABLE "conversation" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "conversation" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "conversation" ADD CONSTRAINT "PK_864528ec4274360a40f66c29845" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "image" DROP CONSTRAINT "PK_d6db1ab4ee9ad9dbe86c64e4cc3"`);
        await queryRunner.query(`ALTER TABLE "image" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "image" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "image" ADD CONSTRAINT "PK_d6db1ab4ee9ad9dbe86c64e4cc3" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_3b69e6cef8beb5c18429ceebe27"`);
        await queryRunner.query(`ALTER TABLE "order" DROP CONSTRAINT "PK_1031171c13130102495201e3e20"`);
        await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "order" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "order" ADD CONSTRAINT "PK_1031171c13130102495201e3e20" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "ordersId"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "ordersId" uuid`);
        await queryRunner.query(`ALTER TABLE "users_conversations_conversation" DROP CONSTRAINT "PK_97daabee0c6f33058d4ae530827"`);
        await queryRunner.query(`ALTER TABLE "users_conversations_conversation" ADD CONSTRAINT "PK_fa453ddb7a316f301cf235fbc11" PRIMARY KEY ("usersId")`);
        await queryRunner.query(`DROP INDEX "public"."IDX_afc41b206a3099e02d9c9ab20f"`);
        await queryRunner.query(`ALTER TABLE "users_conversations_conversation" DROP COLUMN "conversationId"`);
        await queryRunner.query(`ALTER TABLE "users_conversations_conversation" ADD "conversationId" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users_conversations_conversation" DROP CONSTRAINT "PK_fa453ddb7a316f301cf235fbc11"`);
        await queryRunner.query(`ALTER TABLE "users_conversations_conversation" ADD CONSTRAINT "PK_97daabee0c6f33058d4ae530827" PRIMARY KEY ("usersId", "conversationId")`);
        await queryRunner.query(`CREATE INDEX "IDX_afc41b206a3099e02d9c9ab20f" ON "users_conversations_conversation" ("conversationId") `);
        await queryRunner.query(`ALTER TABLE "message" ADD CONSTRAINT "FK_7cf4a4df1f2627f72bf6231635f" FOREIGN KEY ("conversationId") REFERENCES "conversation"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_3b69e6cef8beb5c18429ceebe27" FOREIGN KEY ("ordersId") REFERENCES "order"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users_conversations_conversation" ADD CONSTRAINT "FK_afc41b206a3099e02d9c9ab20fd" FOREIGN KEY ("conversationId") REFERENCES "conversation"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users_conversations_conversation" DROP CONSTRAINT "FK_afc41b206a3099e02d9c9ab20fd"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_3b69e6cef8beb5c18429ceebe27"`);
        await queryRunner.query(`ALTER TABLE "message" DROP CONSTRAINT "FK_7cf4a4df1f2627f72bf6231635f"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_afc41b206a3099e02d9c9ab20f"`);
        await queryRunner.query(`ALTER TABLE "users_conversations_conversation" DROP CONSTRAINT "PK_97daabee0c6f33058d4ae530827"`);
        await queryRunner.query(`ALTER TABLE "users_conversations_conversation" ADD CONSTRAINT "PK_fa453ddb7a316f301cf235fbc11" PRIMARY KEY ("usersId")`);
        await queryRunner.query(`ALTER TABLE "users_conversations_conversation" DROP COLUMN "conversationId"`);
        await queryRunner.query(`ALTER TABLE "users_conversations_conversation" ADD "conversationId" integer NOT NULL`);
        await queryRunner.query(`CREATE INDEX "IDX_afc41b206a3099e02d9c9ab20f" ON "users_conversations_conversation" ("conversationId") `);
        await queryRunner.query(`ALTER TABLE "users_conversations_conversation" DROP CONSTRAINT "PK_fa453ddb7a316f301cf235fbc11"`);
        await queryRunner.query(`ALTER TABLE "users_conversations_conversation" ADD CONSTRAINT "PK_97daabee0c6f33058d4ae530827" PRIMARY KEY ("conversationId", "usersId")`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "ordersId"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "ordersId" integer`);
        await queryRunner.query(`ALTER TABLE "order" DROP CONSTRAINT "PK_1031171c13130102495201e3e20"`);
        await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "order" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "order" ADD CONSTRAINT "PK_1031171c13130102495201e3e20" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_3b69e6cef8beb5c18429ceebe27" FOREIGN KEY ("ordersId") REFERENCES "order"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "image" DROP CONSTRAINT "PK_d6db1ab4ee9ad9dbe86c64e4cc3"`);
        await queryRunner.query(`ALTER TABLE "image" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "image" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "image" ADD CONSTRAINT "PK_d6db1ab4ee9ad9dbe86c64e4cc3" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "conversation" DROP CONSTRAINT "PK_864528ec4274360a40f66c29845"`);
        await queryRunner.query(`ALTER TABLE "conversation" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "conversation" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "conversation" ADD CONSTRAINT "PK_864528ec4274360a40f66c29845" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "users_conversations_conversation" ADD CONSTRAINT "FK_afc41b206a3099e02d9c9ab20fd" FOREIGN KEY ("conversationId") REFERENCES "conversation"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "message" DROP COLUMN "conversationId"`);
        await queryRunner.query(`ALTER TABLE "message" ADD "conversationId" integer`);
        await queryRunner.query(`ALTER TABLE "message" DROP CONSTRAINT "PK_ba01f0a3e0123651915008bc578"`);
        await queryRunner.query(`ALTER TABLE "message" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "message" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "message" ADD CONSTRAINT "PK_ba01f0a3e0123651915008bc578" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "message" ADD CONSTRAINT "FK_7cf4a4df1f2627f72bf6231635f" FOREIGN KEY ("conversationId") REFERENCES "conversation"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
