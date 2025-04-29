import { MigrationInterface, QueryRunner } from "typeorm";

export class FixColumnTypo1742388753495 implements MigrationInterface {
    name = 'FixColumnTypo1742388753495'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "product_comment" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "content" character varying NOT NULL, "userId" uuid, "productId" uuid, "parentId" uuid, CONSTRAINT "PK_ef394c5881c264cccfc098d65e4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "product_comment_closure" ("id_ancestor" uuid NOT NULL, "id_descendant" uuid NOT NULL, CONSTRAINT "PK_08c78101f5db28f577f4a660fbe" PRIMARY KEY ("id_ancestor", "id_descendant"))`);
        await queryRunner.query(`CREATE INDEX "IDX_3cf0632f667d45a2cd3585c9e6" ON "product_comment_closure" ("id_ancestor") `);
        await queryRunner.query(`CREATE INDEX "IDX_eaade3421dd92161a7414b47d7" ON "product_comment_closure" ("id_descendant") `);
        await queryRunner.query(`ALTER TABLE "product_comment" ADD CONSTRAINT "FK_43af4735ce5c5cb26e06f96d8c0" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product_comment" ADD CONSTRAINT "FK_8de0240acebf78da7bbb92571c5" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product_comment" ADD CONSTRAINT "FK_a13c3428f9dbfa4f283ac227b06" FOREIGN KEY ("parentId") REFERENCES "product_comment"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product_comment_closure" ADD CONSTRAINT "FK_3cf0632f667d45a2cd3585c9e60" FOREIGN KEY ("id_ancestor") REFERENCES "product_comment"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product_comment_closure" ADD CONSTRAINT "FK_eaade3421dd92161a7414b47d7c" FOREIGN KEY ("id_descendant") REFERENCES "product_comment"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product_comment_closure" DROP CONSTRAINT "FK_eaade3421dd92161a7414b47d7c"`);
        await queryRunner.query(`ALTER TABLE "product_comment_closure" DROP CONSTRAINT "FK_3cf0632f667d45a2cd3585c9e60"`);
        await queryRunner.query(`ALTER TABLE "product_comment" DROP CONSTRAINT "FK_a13c3428f9dbfa4f283ac227b06"`);
        await queryRunner.query(`ALTER TABLE "product_comment" DROP CONSTRAINT "FK_8de0240acebf78da7bbb92571c5"`);
        await queryRunner.query(`ALTER TABLE "product_comment" DROP CONSTRAINT "FK_43af4735ce5c5cb26e06f96d8c0"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_eaade3421dd92161a7414b47d7"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_3cf0632f667d45a2cd3585c9e6"`);
        await queryRunner.query(`DROP TABLE "product_comment_closure"`);
        await queryRunner.query(`DROP TABLE "product_comment"`);
    }

}
