import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateQuotePostTableAndRelateItToPostAndUser1647272815749
  implements MigrationInterface
{
  name = 'CreateQuotePostTableAndRelateItToPostAndUser1647272815749';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "quote_post" ("id" character varying NOT NULL, "message" character varying NOT NULL, "creatorId" character varying NOT NULL, "originalPostId" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_651f935d773caa71391c5eccf0a" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `ALTER TABLE "quote_post" ADD CONSTRAINT "FK_4e29542ab637f213bb4a7fe050e" FOREIGN KEY ("creatorId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "quote_post" ADD CONSTRAINT "FK_93f8c495dc6afef07e21d75765a" FOREIGN KEY ("originalPostId") REFERENCES "post"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "quote_post" DROP CONSTRAINT "FK_93f8c495dc6afef07e21d75765a"`
    );
    await queryRunner.query(
      `ALTER TABLE "quote_post" DROP CONSTRAINT "FK_4e29542ab637f213bb4a7fe050e"`
    );
    await queryRunner.query(`DROP TABLE "quote_post"`);
  }
}
