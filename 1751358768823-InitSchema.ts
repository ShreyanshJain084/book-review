import { MigrationInterface, QueryRunner } from "typeorm";

export class InitSchema1751358768823 implements MigrationInterface {
    name = 'InitSchema1751358768823'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "review" DROP CONSTRAINT "FK_ae1ec2fd91f77b5df325d1c7b4a"`);
        await queryRunner.query(`ALTER TABLE "review" ALTER COLUMN "bookId" SET NOT NULL`);
        await queryRunner.query(`CREATE INDEX "IDX_ae1ec2fd91f77b5df325d1c7b4" ON "review" ("bookId") `);
        await queryRunner.query(`CREATE INDEX "idx_review_bookId" ON "review" ("bookId") `);
        await queryRunner.query(`ALTER TABLE "review" ADD CONSTRAINT "FK_ae1ec2fd91f77b5df325d1c7b4a" FOREIGN KEY ("bookId") REFERENCES "book"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "review" DROP CONSTRAINT "FK_ae1ec2fd91f77b5df325d1c7b4a"`);
        await queryRunner.query(`DROP INDEX "public"."idx_review_bookId"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_ae1ec2fd91f77b5df325d1c7b4"`);
        await queryRunner.query(`ALTER TABLE "review" ALTER COLUMN "bookId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "review" ADD CONSTRAINT "FK_ae1ec2fd91f77b5df325d1c7b4a" FOREIGN KEY ("bookId") REFERENCES "book"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
