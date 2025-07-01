<p align="center">
  <a href="http://nestjs.com/" target="blank">
    <img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" />
  </a>
</p>

<p align="center">A scalable <a href="http://nodejs.org" target="_blank">Node.js</a> + <a href="https://nestjs.com/" target="_blank">NestJS</a> based Book Review API with PostgreSQL, Redis caching, Swagger documentation, and robust testing.</p>

<p align="center">
  <a href="https://www.npmjs.com/package/@nestjs/core" target="_blank">
    <img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" />
  </a>
  <a href="https://www.npmjs.com/package/@nestjs/core" target="_blank">
    <img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" />
  </a>
  <a href="https://www.npmjs.com/package/@nestjs/core" target="_blank">
    <img src="https://img.shields.io/npm/dm/@nestjs/core.svg" alt="NPM Downloads" />
  </a>
</p>

---

## 📚 Book Review API

This project is a backend service that allows users to:

- Create books
- Add reviews to books
- Fetch books and their reviews
- Use Redis caching to improve performance
- Gracefully handle cache failures

---

## 🛠 Tech Stack

- **Backend**: NestJS (TypeScript)
- **Database**: PostgreSQL
- **ORM**: TypeORM
- **Cache**: Redis
- **Testing**: Jest, Supertest (unit & integration)
- **Documentation**: Swagger (OpenAPI)
- **Tooling**: Docker, Redis CLI, TypeORM CLI

---

## 📦 Features

- 📘 `GET /books` — List all books (with Redis cache)
- ➕ `POST /books` — Add a new book
- 🧾 `GET /books/:id/reviews` — Get reviews for a book
- 🖊️ `POST /books/:id/reviews` — Add a review for a book
- ⚙️ Redis integration with error fallback
- 📈 Index on `bookId` in `reviews` table
- 🧪 Unit & Integration tests (including cache miss)

---

## 🧑‍💻 Getting Started

### 🔧 Installation

```bash
git clone https://github.com/ShreyanshJain084/book-review.git
cd book-review
npm install


⚙️ Environment Variables
Create a .env file in the root directory:

env
DATABASE_URL=postgres://postgres:yourpassword@localhost:5432/book_review
REDIS_HOST=localhost
REDIS_PORT=6379

🗃️ Database Setup
Ensure PostgreSQL is running and create a database named book_review.

🔄 Run Migrations
bash
# Generate a migration (if needed)
npm run migration:generate -- -n InitSchema

# Run migrations
npm run migration:run

# Revert a migration
npm run migration:revert

🚀 Running the App
bash
# Development
npm run start:dev

# Production
npm run start:prod

🧪 Running Tests
bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e

# Test coverage
npm run test:cov

🔍 Swagger API Documentation
After running the app, navigate to:

bash
http://localhost:3000/api

This will show the auto-generated Swagger documentation.



📦 Redis Cache Strategy
GET /books checks Redis first.

On cache miss, it fetches from the database and updates the cache.

If Redis is down, it logs a warning and continues with DB.

On POST /books, the cache is invalidated.

🧪 Cache-Miss Integration Test
Integration tests include a test that:

Ensures Redis cache is empty.

Fetches /books, expecting a DB read.

Confirms subsequent fetch hits the cache.


💡 Design Decisions
Redis is optional and gracefully degraded on failure.

TypeORM for migrations and schema management.

Modules: books, reviews, redis, etc.

Testing covers both happy and edge paths.

🖥️ Live Walkthrough (For Evaluators)
The project includes:

API walkthrough (Swagger)

Redis cache behavior

Fallback error logging

Test coverage explanation

Code modularity discussion

🧠 Bonus (GraphQL Subscription Design Prompt)
To support real-time subscriptions for new reviews:

Use @nestjs/graphql with Apollo Gateway

Define ReviewAdded subscription

Use Redis pub/sub for scaling across nodes

Authenticate subscriptions via JWT in WebSocket handshake

Horizontal scaling with NATS/Kafka (optional)

📜 License
This project is licensed under the MIT License.

👤 Author
Shreyansh Jain
📫 GitHub

```
