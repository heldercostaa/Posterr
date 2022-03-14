import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUserTableAndFollowRelation1647236050467
  implements MigrationInterface
{
  name = 'CreateUserTableAndFollowRelation1647236050467';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "user" ("id" character varying NOT NULL, "username" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "user_follow_user" ("user_being_followed_id" character varying NOT NULL, "user_who_follows_id" character varying NOT NULL, CONSTRAINT "PK_a502bfcb3454c64bd2a3974946c" PRIMARY KEY ("user_being_followed_id", "user_who_follows_id"))`
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_8c670b2c8027111aaab80b20c5" ON "user_follow_user" ("user_being_followed_id") `
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_af9e26a844ce67a48ee0f8c2d8" ON "user_follow_user" ("user_who_follows_id") `
    );
    await queryRunner.query(
      `ALTER TABLE "user_follow_user" ADD CONSTRAINT "FK_8c670b2c8027111aaab80b20c55" FOREIGN KEY ("user_being_followed_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    );
    await queryRunner.query(
      `ALTER TABLE "user_follow_user" ADD CONSTRAINT "FK_af9e26a844ce67a48ee0f8c2d85" FOREIGN KEY ("user_who_follows_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user_follow_user" DROP CONSTRAINT "FK_af9e26a844ce67a48ee0f8c2d85"`
    );
    await queryRunner.query(
      `ALTER TABLE "user_follow_user" DROP CONSTRAINT "FK_8c670b2c8027111aaab80b20c55"`
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_af9e26a844ce67a48ee0f8c2d8"`
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_8c670b2c8027111aaab80b20c5"`
    );
    await queryRunner.query(`DROP TABLE "user_follow_user"`);
    await queryRunner.query(`DROP TABLE "user"`);
  }
}
