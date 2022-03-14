import { MigrationInterface, QueryRunner } from 'typeorm';

export class RenameUserColumnToCreatorOnPostTable1647270352157
  implements MigrationInterface
{
  name = 'RenameUserColumnToCreatorOnPostTable1647270352157';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "post" DROP CONSTRAINT "FK_5c1cf55c308037b5aca1038a131"`
    );
    await queryRunner.query(
      `ALTER TABLE "post" RENAME COLUMN "userId" TO "creatorId"`
    );
    await queryRunner.query(
      `ALTER TABLE "repost" DROP CONSTRAINT "FK_1398d4509dfe620c68724aeff30"`
    );
    await queryRunner.query(
      `ALTER TABLE "repost" ALTER COLUMN "originalPostId" SET NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "repost" ADD CONSTRAINT "FK_1398d4509dfe620c68724aeff30" FOREIGN KEY ("originalPostId") REFERENCES "post"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "post" ADD CONSTRAINT "FK_9e91e6a24261b66f53971d3f96b" FOREIGN KEY ("creatorId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "post" DROP CONSTRAINT "FK_9e91e6a24261b66f53971d3f96b"`
    );
    await queryRunner.query(
      `ALTER TABLE "repost" DROP CONSTRAINT "FK_1398d4509dfe620c68724aeff30"`
    );
    await queryRunner.query(
      `ALTER TABLE "repost" ALTER COLUMN "originalPostId" DROP NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "repost" ADD CONSTRAINT "FK_1398d4509dfe620c68724aeff30" FOREIGN KEY ("originalPostId") REFERENCES "post"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "post" RENAME COLUMN "creatorId" TO "userId"`
    );
    await queryRunner.query(
      `ALTER TABLE "post" ADD CONSTRAINT "FK_5c1cf55c308037b5aca1038a131" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }
}
