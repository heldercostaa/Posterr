import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUserTable1647220379255 implements MigrationInterface {
  name = 'CreateUserTable1647220379255';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "user" ("id" character varying NOT NULL, "username" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "user_follow_user" ("user_following_id" character varying NOT NULL, "user_followed_id" character varying NOT NULL, CONSTRAINT "PK_980ff03f415077df184596dcf73" PRIMARY KEY ("user_following_id", "user_followed_id"))`
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_26312a1e34901011fc6f63545e" ON "user_follow_user" ("user_following_id") `
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_110f993e5e9213a7a44f172b26" ON "user_follow_user" ("user_followed_id") `
    );
    await queryRunner.query(
      `ALTER TABLE "user_follow_user" ADD CONSTRAINT "FK_26312a1e34901011fc6f63545e2" FOREIGN KEY ("user_following_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    );
    await queryRunner.query(
      `ALTER TABLE "user_follow_user" ADD CONSTRAINT "FK_110f993e5e9213a7a44f172b264" FOREIGN KEY ("user_followed_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user_follow_user" DROP CONSTRAINT "FK_110f993e5e9213a7a44f172b264"`
    );
    await queryRunner.query(
      `ALTER TABLE "user_follow_user" DROP CONSTRAINT "FK_26312a1e34901011fc6f63545e2"`
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_110f993e5e9213a7a44f172b26"`
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_26312a1e34901011fc6f63545e"`
    );
    await queryRunner.query(`DROP TABLE "user_follow_user"`);
    await queryRunner.query(`DROP TABLE "user"`);
  }
}
