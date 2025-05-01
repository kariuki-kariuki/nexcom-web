import { MigrationInterface, QueryRunner } from 'typeorm';

export class Analytics1746092732423 implements MigrationInterface {
  name = 'Analytics1746092732423';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "analytic" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "browser" character varying, "os" character varying, "platform" character varying, "isMobile" boolean NOT NULL DEFAULT false, "isDesktop" boolean NOT NULL DEFAULT false, "isTablet" boolean NOT NULL DEFAULT false, "version" character varying NOT NULL DEFAULT '1.0.0', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "productId" uuid, CONSTRAINT "PK_5721d609c506c98a762dfdb5702" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "analytic" ADD CONSTRAINT "FK_5e059be51423e0e46d03c97740e" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "analytic" DROP CONSTRAINT "FK_5e059be51423e0e46d03c97740e"`,
    );
    await queryRunner.query(`DROP TABLE "analytic"`);
  }
}
