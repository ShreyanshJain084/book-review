"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
const book_entity_1 = require("./src/books/entities/book.entity");
const review_entity_1 = require("./src/reviews/entities/review.entity");
exports.AppDataSource = new typeorm_1.DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'Hawk@2001',
    database: 'book_review',
    synchronize: false,
    logging: true,
    entities: [book_entity_1.Book, review_entity_1.Review],
    migrations: ['src/migrations/*.ts'],
    subscribers: [],
});
//# sourceMappingURL=data-source.js.map