import { MigrationInterface, QueryRunner } from "typeorm";

export class UseUuidUserid1735550464356 implements MigrationInterface {
    name = 'UseUuidUserid1735550464356'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "message" DROP CONSTRAINT "FK_446251f8ceb2132af01b68eb593"`);
        await queryRunner.query(`ALTER TABLE "message" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "message" ADD "userId" uuid`);
        await queryRunner.query(`ALTER TABLE "order" DROP CONSTRAINT "FK_caabe91507b3379c7ba73637b84"`);
        await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "order" ADD "userId" uuid`);
        await queryRunner.query(`ALTER TABLE "users_conversations_conversation" DROP CONSTRAINT "FK_fa453ddb7a316f301cf235fbc11"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "users_conversations_conversation" DROP CONSTRAINT "PK_97daabee0c6f33058d4ae530827"`);
        await queryRunner.query(`ALTER TABLE "users_conversations_conversation" ADD CONSTRAINT "PK_afc41b206a3099e02d9c9ab20fd" PRIMARY KEY ("conversationId")`);
        await queryRunner.query(`DROP INDEX "public"."IDX_fa453ddb7a316f301cf235fbc1"`);
        await queryRunner.query(`ALTER TABLE "users_conversations_conversation" DROP COLUMN "usersId"`);
        await queryRunner.query(`ALTER TABLE "users_conversations_conversation" ADD "usersId" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users_conversations_conversation" DROP CONSTRAINT "PK_afc41b206a3099e02d9c9ab20fd"`);
        await queryRunner.query(`ALTER TABLE "users_conversations_conversation" ADD CONSTRAINT "PK_97daabee0c6f33058d4ae530827" PRIMARY KEY ("conversationId", "usersId")`);
        await queryRunner.query(`CREATE INDEX "IDX_fa453ddb7a316f301cf235fbc1" ON "users_conversations_conversation" ("usersId") `);
        await queryRunner.query(`ALTER TABLE "message" ADD CONSTRAINT "FK_446251f8ceb2132af01b68eb593" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order" ADD CONSTRAINT "FK_caabe91507b3379c7ba73637b84" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users_conversations_conversation" ADD CONSTRAINT "FK_fa453ddb7a316f301cf235fbc11" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users_conversations_conversation" DROP CONSTRAINT "FK_fa453ddb7a316f301cf235fbc11"`);
        await queryRunner.query(`ALTER TABLE "order" DROP CONSTRAINT "FK_caabe91507b3379c7ba73637b84"`);
        await queryRunner.query(`ALTER TABLE "message" DROP CONSTRAINT "FK_446251f8ceb2132af01b68eb593"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_fa453ddb7a316f301cf235fbc1"`);
        await queryRunner.query(`ALTER TABLE "users_conversations_conversation" DROP CONSTRAINT "PK_97daabee0c6f33058d4ae530827"`);
        await queryRunner.query(`ALTER TABLE "users_conversations_conversation" ADD CONSTRAINT "PK_afc41b206a3099e02d9c9ab20fd" PRIMARY KEY ("conversationId")`);
        await queryRunner.query(`ALTER TABLE "users_conversations_conversation" DROP COLUMN "usersId"`);
        await queryRunner.query(`ALTER TABLE "users_conversations_conversation" ADD "usersId" integer NOT NULL`);
        await queryRunner.query(`CREATE INDEX "IDX_fa453ddb7a316f301cf235fbc1" ON "users_conversations_conversation" ("usersId") `);
        await queryRunner.query(`ALTER TABLE "users_conversations_conversation" DROP CONSTRAINT "PK_afc41b206a3099e02d9c9ab20fd"`);
        await queryRunner.query(`ALTER TABLE "users_conversations_conversation" ADD CONSTRAINT "PK_97daabee0c6f33058d4ae530827" PRIMARY KEY ("usersId", "conversationId")`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "users_conversations_conversation" ADD CONSTRAINT "FK_fa453ddb7a316f301cf235fbc11" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "order" ADD "userId" integer`);
        await queryRunner.query(`ALTER TABLE "order" ADD CONSTRAINT "FK_caabe91507b3379c7ba73637b84" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "message" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "message" ADD "userId" integer`);
        await queryRunner.query(`ALTER TABLE "message" ADD CONSTRAINT "FK_446251f8ceb2132af01b68eb593" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
