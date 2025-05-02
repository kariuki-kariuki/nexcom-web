import { MigrationInterface, QueryRunner } from "typeorm";

export class Messagefiles1746160953689 implements MigrationInterface {
    name = 'Messagefiles1746160953689'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "message" DROP COLUMN "files"`);
        await queryRunner.query(`ALTER TABLE "image" ADD "messageId" uuid`);
        await queryRunner.query(`ALTER TABLE "image" ADD CONSTRAINT "FK_f69c7f02013805481ec0edcf3ea" FOREIGN KEY ("messageId") REFERENCES "message"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "image" DROP CONSTRAINT "FK_f69c7f02013805481ec0edcf3ea"`);
        await queryRunner.query(`ALTER TABLE "image" DROP COLUMN "messageId"`);
        await queryRunner.query(`ALTER TABLE "message" ADD "files" text`);
    }

}
