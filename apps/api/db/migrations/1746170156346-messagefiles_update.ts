import { MigrationInterface, QueryRunner } from "typeorm";

export class MessagefilesUpdate1746170156346 implements MigrationInterface {
    name = 'MessagefilesUpdate1746170156346'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "message" ALTER COLUMN "message" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "message" ALTER COLUMN "message" SET NOT NULL`);
    }

}
