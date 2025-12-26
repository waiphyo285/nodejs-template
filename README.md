# Node.js API Template

<img src="./public/images/readme/readme-cover.jpg" />

A **production-ready Node.js backend template** built with **Clean Architecture** principles to keep your codebase:

-   Maintainable
-   Scalable
-   Testable
-   Framework-independent

Inspired by industry best practices and Uncle Bob’s Clean Architecture.

## 🧠 Architecture Overview

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

This project follows a layered design ensuring clear separation of concerns:

### **Presentation Layer**

Routes, Controllers, Middleware, Serializers

### **Application Layer**

Use Cases, Orchestration, Business Flow

### **Domain Layer**

Entities, Business Rules, Core Services, Interfaces

### **Infrastructure Layer**

Repositories, Databases, External Integrations

## ⭐ Why Use This Template?

### ✅ Testable

Business logic does not depend on Express, databases, or external services.

### ✅ Reusable

Use the same use cases in API, CLI, background workers, jobs, etc.

### ✅ Framework Independent

Easily swap:

-   Express → Fastify / Nest
-   MongoDB → PostgreSQL / MySQL
-   Redis / S3 / Firebase
    without touching core logic.

### ✅ Scalable

Clean structure supports large applications and microservice evolution.

### ✅ Maintainable

Clear conventions = easy onboarding and long-term health.

## 🧰 Technology Stack

**Core**

-   Node.js
-   Express.js

**Databases**

-   Sequelize (SQL)
-   Mongoose (MongoDB)

**Security**

-   Passport.js
-   JWT
-   CSRF
-   Rate limiting

**Extras**

-   Multer file upload
-   Socket support
-   Redis cache
-   Bootstrap frontend support
-   Mocha tests

## 📦 Requirements

-   Node.js 14+
-   MongoDB
-   MySQL
-   Redis

## 🚀 Getting Started

```
git clone https://github.com/waiphyo285/nodejs-template.git
cd nodejs-template
npm install
cp .env.example .env
npm run dev
```

Visit:

```
http://localhost:8765
```

## 🤝 Contributing

Contributions, issues, and feature requests are welcome.

## 📜 License

MIT License
