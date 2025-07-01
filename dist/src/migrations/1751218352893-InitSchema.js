"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InitSchema1751218352893 = void 0;
class InitSchema1751218352893 {
    constructor() {
        this.name = 'InitSchema1751218352893';
    }
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "review" ("id" SERIAL NOT NULL, "reviewer" character varying NOT NULL, "reviewText" character varying NOT NULL, "rating" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "bookId" integer, CONSTRAINT "PK_2e4299a343a81574217255c00ca" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "book" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "author" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_a3afef72ec8f80e6e5c310b28a4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "review" ADD CONSTRAINT "FK_ae1ec2fd91f77b5df325d1c7b4a" FOREIGN KEY ("bookId") REFERENCES "book"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "review" DROP CONSTRAINT "FK_ae1ec2fd91f77b5df325d1c7b4a"`);
        await queryRunner.query(`DROP TABLE "book"`);
        await queryRunner.query(`DROP TABLE "review"`);
    }
}
exports.InitSchema1751218352893 = InitSchema1751218352893;
//# sourceMappingURL=1751218352893-InitSchema.js.map