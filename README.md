# Node.js API Template

<img src="./public/images/readme/readme-cover.jpg" />

A **production-ready Node.js backend template** built with **Clean Architecture** principles to help you build applications that are:

* Maintainable
* Scalable
* Testable
* Framework-independent

Inspired by industry best practices and **Uncle Bob’s Clean Architecture**.

---

## Architecture Overview

```
API Routes / Page Routes
            │
            ▼
        Controllers
            │
            ▼
        Use Cases
            │
            ▼
      Domain Services
            │
            ▼
        Repositories
            │
            ▼
        Database(s)
```

This project follows a **layered architecture** with a clear separation of concerns.

### Presentation Layer

Routes, Controllers, Middleware, Serializers

### Application Layer

Use Cases, Orchestration, Business Flow

### Domain Layer

Entities, Business Rules, Core Services, Interfaces

### Infrastructure Layer

Repositories, Databases, External Integrations

---

## Why Use This Template?

### Testable

Business logic is completely independent of Express, databases, or external services.

### Reusable

Use the same use cases across:

* REST APIs
* CLI tools
* Background workers
* Cron jobs

### Framework Independent

Easily replace technologies without touching core logic:

* Express → Fastify / NestJS
* MongoDB → PostgreSQL / MySQL
* Redis / S3 / Firebase

### Scalable

The structure supports large applications and smooth evolution into microservices.

### Maintainable

Clear conventions make onboarding easier and keep long-term projects healthy.

---

## Who Is This For?

This template is ideal for:

* Startups building scalable APIs
* Teams adopting Clean Architecture
* Projects expected to grow in complexity

---

## Technology Stack

### Core

* Node.js
* Express.js (default, swappable)

### Databases

* Sequelize (SQL)
* Mongoose (MongoDB)

### Security

* Passport.js
* JWT Authentication
* CSRF Protection
* Rate Limiting

### Extras

* Multer (file uploads)
* Socket support
* Redis caching
* Bootstrap frontend support
* Mocha testing framework

---

## Requirements

* Node.js 14+
* MongoDB
* MySQL
* Redis

---

## Getting Started

Clone the repository:

```bash
git clone https://github.com/waiphyo285/nodejs-template.git
cd nodejs-template
npm install
cp .env.example .env
```

---

## Important: Configure Database Credentials

Before running the application, configure your database credentials in the `.env` file.

This template supports MongoDB and MySQL, configured independently.

### MongoDB Configuration

```env
MONGO_HOST=localhost
MONGO_PORT=27017
MONGO_USER=your_mongo_user
MONGO_PASS=your_mongo_password
MONGO_DB_NAME=your_mongo_database
```

### MySQL Configuration

```env
MYSQL_HOST=localhost
MYSQL_PORT=3306
MYSQL_USER=your_mysql_user
MYSQL_PASS=your_mysql_password
MYSQL_DB_NAME=your_mysql_database
```

---

## Running the Application

Start the development server:

```bash
npm run start:dev
```

Visit:

```
http://localhost:8765
```

---

## Testing

Run tests with:

```bash
npm run unit:test
npm run load:test
```

The architecture allows you to test business logic without mocking frameworks or databases.

---

## Extensibility

You can easily add:

* New databases
* Message queues
* External APIs
* Background workers

without changing existing core logic.

---

## Contributing

Contributions, issues, and feature requests are welcome.

---

## License

MIT License

