# fitco / devTalk

Application like slack created to talk with devs
# fitco / devTalk

**fitco** is a Slack-like application designed for developers to collaborate, chat, and manage workspaces and channels. This project includes a fully-featured backend and frontend, both built with modern and scalable technologies.

## 📦 Technologies Used

### Backend (NestJS)
- **Node.js** with **TypeScript**
- **NestJS** for scalable API architecture
- **MySQL** for relational database management
- **JWT Authentication** for secure access
- **Swagger** for API documentation
- **Docker** for containerization
- **Jest** for unit and E2E testing

### Frontend (React)
- **React** with **TypeScript**
- **Vite** as the build tool
- **Redux Toolkit** for state management
- **Mantine** UI library for components and styling
- **React Query (@tanstack/react-query)** for API calls and caching
- **React Router** for routing
- **Jest** + **Cypress** for testing

## 📁 Project Structure

The project is divided into two main folders:

```
fitco/
├── frontend/    # React application
└── backend/     # NestJS application
```

Each segment (`frontend/` and `backend/`) contains its own `README.md` file with more detailed information about structure, features, and development guidelines.

## 🚀 Getting Started

### Prerequisites

- **Docker**
- **Docker Compose**

Ensure Docker is running on your machine before proceeding.

### Running the Project

You can start the full-stack application using Docker:

```bash
docker-compose up --build
```

This command will:

- Build and run the backend NestJS API
- Build and run the frontend React app
- Set up MySQL and MinIO services as needed

Once the containers are up, you can access:

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:3000
- **Swagger Docs**: http://localhost:3000/api

## 🧪 Testing

For detailed instructions on running unit and end-to-end tests, refer to the `README.md` files in `frontend/` and `backend/`.

## 📚 Documentation

- API documentation is available via Swagger at `/api/docs`.
- Component and usage documentation is described in the frontend's `README.md`.

---

Built with ❤️ by Edward Acu