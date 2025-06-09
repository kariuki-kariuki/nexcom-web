import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangeJoinColumn1749477983312 implements MigrationInterface {
    name = 'ChangeJoinColumn1749477983312'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "conversation_admins_users" ("conversationId" uuid NOT NULL, "usersId" uuid NOT NULL, CONSTRAINT "PK_936bbeb2eaae542650c0f71180b" PRIMARY KEY ("conversationId", "usersId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_c91e781c4cb8b8fc5c27dafd95" ON "conversation_admins_users" ("conversationId") `);
        await queryRunner.query(`CREATE INDEX "IDX_17f6fb141215a421aa151aac33" ON "conversation_admins_users" ("usersId") `);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "lastSeen" SET DEFAULT '"2025-06-09T14:06:25.074Z"'`);
        await queryRunner.query(`ALTER TABLE "conversation_admins_users" ADD CONSTRAINT "FK_c91e781c4cb8b8fc5c27dafd954" FOREIGN KEY ("conversationId") REFERENCES "conversation"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "conversation_admins_users" ADD CONSTRAINT "FK_17f6fb141215a421aa151aac335" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "conversation_admins_users" DROP CONSTRAINT "FK_17f6fb141215a421aa151aac335"`);
        await queryRunner.query(`ALTER TABLE "conversation_admins_users" DROP CONSTRAINT "FK_c91e781c4cb8b8fc5c27dafd954"`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "lastSeen" SET DEFAULT '2025-06-09'`);
        await queryRunner.query(`DROP INDEX "public"."IDX_17f6fb141215a421aa151aac33"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_c91e781c4cb8b8fc5c27dafd95"`);
        await queryRunner.query(`DROP TABLE "conversation_admins_users"`);
    }

}
