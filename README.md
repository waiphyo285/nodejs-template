<img src="./public/images/readme/readme-cover.jpg">

## Node.js API Template

### Overview

A production-ready Node.js API template built using **Uncle Bob’s Clean Architecture** to ensure your codebase remains **testable, maintainable, scalable**, and independent of frameworks and external services.

- **Inspired by:** [https://mannhowie.com/clean-architecture-node](https://mannhowie.com/clean-architecture-node)
- **Reference:** [https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)


## Clean Architecture Overview

Clean Architecture focuses on clear separation of concerns, ensuring:

* **Independence from frameworks**
* **Easy testability**
* **Database agnostic**
* **Reusable across UI/API/CLI**
* **Minimal coupling to external systems**

### Architecture Layers

This project implements a **4-layer clean architecture**:

```
┌─────────────────────────────────────────────────────────┐
│                    PRESENTATION LAYER                   │
│  (Routes, Controllers, HTTP Middleware, Serializers)    │
└─────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────┐
│                  APPLICATION LAYER                      │
│  (Use Cases, Orchestration, Business Flow)              │
└─────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────┐
│                    DOMAIN LAYER                         │
│  (Entities, Services, Business Rules, Interfaces)       │
└─────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────┐
│                 INFRASTRUCTURE LAYER                    │
│  (Repositories, Database, External Services)            │
└─────────────────────────────────────────────────────────┘
```



## Key Benefits

### ✅ Testability

Business logic can be tested without Express, DB, or external tools.

```javascript
describe('Create User Use Case', () => {
  it('creates a user', async () => {
    const repo = { save: jest.fn() }
    const useCase = new CreateUserUseCase(repo)
    await useCase.execute({ name: 'John', email: 'john@example.com' })
    expect(repo.save).toHaveBeenCalled()
  })
})
```

### ✅ Reusability

Same use case can run in API, CLI, Jobs:

```javascript
const useCase = container.get('createUserUseCase')
```

### ✅ Framework Independence

Swap:

* Express → Fastify
* MongoDB → PostgreSQL
* Without touching business logic

### ✅ Scalability

Easy feature isolation and microservice extraction.

### ✅ Maintainability

Clear structure, easy onboarding, reduced duplication.



## Technology Stack

### Core

* **Express.js** – Web framework

### Databases

* **Sequelize** – SQL ORM (MySQL, PostgreSQL, MariaDB, SQLite)
* **Mongoose** – MongoDB ODM

### Security

* Passport.js
* JWT
* CSRF
* Rate limiting

### File Upload

* Multer

### Frontend

* Bootstrap

### Testing

* Mocha



## Prerequisites

Install:

* Node.js v14+
* MongoDB
* MySQL
* Redis
* npm / yarn



## Installation

```bash
git clone https://github.com/waiphyo285/nodejs-template.git
cd nodejs-template && npm install && cp .env.example .env
npm run dev
```

Visit:

```
http://localhost:8765
```



## Scripts

### Development

```bash
npm run dev
```

### Production

```bash
npm run start
```

### Tests

```bash
npm run test
```

### CLI

```bash
node index
node index --index
node index --show=623210497fc2cb28840d1448
```



## API Documentation

Postman Collection:

```
https://documenter.getpostman.com/view/10018411/2s83mbr5iK
```



## Best Practices Implemented

* Dependency Injection
* Repository Pattern
* Use Case Pattern
* Service Layer
* Middleware Structure
* Centralized Error Handling
* Validation Layer
* Logging
* Security Layer
* Consistent Naming



## Contributing

PRs welcome!



## License

MIT License


