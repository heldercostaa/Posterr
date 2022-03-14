import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateRepostTableAndRelateItToPostAndUser1647245150404
  implements MigrationInterface
{
  name = 'CreateRepostTableAndRelateItToPostAndUser1647245150404';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "repost" ("id" character varying NOT NULL, "creatorId" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "originalPostId" character varying, CONSTRAINT "PK_abfcbb696914c514fca81f8cc0b" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `ALTER TABLE "post" DROP CONSTRAINT "FK_5c1cf55c308037b5aca1038a131"`
    );
    await queryRunner.query(
      `ALTER TABLE "post" ALTER COLUMN "userId" SET NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "repost" ADD CONSTRAINT "FK_924707d41fd12fc83bd444038b2" FOREIGN KEY ("creatorId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "repost" ADD CONSTRAINT "FK_1398d4509dfe620c68724aeff30" FOREIGN KEY ("originalPostId") REFERENCES "post"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "post" ADD CONSTRAINT "FK_5c1cf55c308037b5aca1038a131" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "post" DROP CONSTRAINT "FK_5c1cf55c308037b5aca1038a131"`
    );
    await queryRunner.query(
      `ALTER TABLE "repost" DROP CONSTRAINT "FK_1398d4509dfe620c68724aeff30"`
    );
    await queryRunner.query(
      `ALTER TABLE "repost" DROP CONSTRAINT "FK_924707d41fd12fc83bd444038b2"`
    );
    await queryRunner.query(
      `ALTER TABLE "post" ALTER COLUMN "userId" DROP NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "post" ADD CONSTRAINT "FK_5c1cf55c308037b5aca1038a131" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(`DROP TABLE "repost"`);
  }
}
