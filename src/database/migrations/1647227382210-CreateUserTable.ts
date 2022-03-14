import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUserTable1647227382210 implements MigrationInterface {
  name = 'CreateUserTable1647227382210';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "user" ("id" character varying NOT NULL, "username" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "user_follow_user" ("user_following_id" character varying NOT NULL, "user_followed_id" character varying NOT NULL, CONSTRAINT "PK_45a3fab363e952abb0b85f5bb42" PRIMARY KEY ("user_following_id", "user_followed_id"))`
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_66859913aa2e24a4957445a43a" ON "user_follow_user" ("user_following_id") `
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_b0e0d78f8d51746bd67e8f69a1" ON "user_follow_user" ("user_followed_id") `
    );
    await queryRunner.query(
      `ALTER TABLE "user_follow_user" ADD CONSTRAINT "FK_66859913aa2e24a4957445a43ae" FOREIGN KEY ("user_following_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    );
    await queryRunner.query(
      `ALTER TABLE "user_follow_user" ADD CONSTRAINT "FK_b0e0d78f8d51746bd67e8f69a1f" FOREIGN KEY ("user_followed_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user_follow_user" DROP CONSTRAINT "FK_b0e0d78f8d51746bd67e8f69a1f"`
    );
    await queryRunner.query(
      `ALTER TABLE "user_follow_user" DROP CONSTRAINT "FK_66859913aa2e24a4957445a43ae"`
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_b0e0d78f8d51746bd67e8f69a1"`
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_66859913aa2e24a4957445a43a"`
    );
    await queryRunner.query(`DROP TABLE "user_follow_user"`);
    await queryRunner.query(`DROP TABLE "user"`);
  }
}
