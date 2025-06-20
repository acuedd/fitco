# 🧠 devTalk Backend

Welcome to the backend service of **devTalk**, a team communication platform inspired by Slack. This backend is built using **NestJS**, connected to a **MySQL** database, and follows a clean, modular architecture.

---

## 🚀 Tech Stack

- **Node.js** + **NestJS** - Backend framework
- **TypeScript** - Static typing
- **MySQL** - Relational database
- **TypeORM** - ORM for database management
- **JWT** - Authentication strategy
- **Swagger** - API documentation
- **Docker** - Local development & deployment

---

## 📁 Project Structure
```
src/
├── auth/             # Authentication module (register, login, JWT)
├── users/            # User management
├── workspaces/       # Workspaces and team management
├── messages/         # Message handling (send, list)
├── channels/         # Channels inside workspaces
├── shared/           # Shared utilities, guards, interceptors
├── config/           # Environment and database config
└── main.ts           # App bootstrap
```

---

## 🛠️ Getting Started

### Prerequisites

- Node.js v18+
- MySQL
- Docker

### Environment Variables

Create a `.env` file in the root directory:

```env
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=yourpassword
DB_NAME=devtalk

JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=1d

PORT=3000
```


# Install dependencies
npm install

# Run database migrations (if applicable)
npm run typeorm migration:run

# Start development server
docker compose up --build

## 🧪 Running Test

### Unit tests
npm run test

### E2E tests
npm run test:e2e

### Test coverage
npm run test:cov


## 📄 API Documentation
http://localhost:3000/api