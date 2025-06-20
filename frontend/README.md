# Frontend - DevTalk App

This project is the frontend of the Fitco application, built with **React**, **TypeScript**, and **Vite**. It uses **Mantine UI** for visual components, **Redux Toolkit** for state management, and integrates **Cypress** for end-to-end (E2E) testing.

## 📦 Main Technologies

- React + TypeScript + Vite
- Mantine UI
- Redux Toolkit
- React Router DOM
- Axios
- Cypress (E2E Testing)
- ESLint + Prettier

## 🚀 Installation

```bash
npm install
```

## 🛠️ Available Scripts

| Command                | Description                               |
|------------------------|-------------------------------------------|
| `npm run dev`          | Starts the development environment (Vite) |
| `npm run build`        | Builds the application for production     |
| `npm run preview`      | Serves the production build locally        |
| `npm run lint`         | Runs ESLint on the project                |
| `npm run format`       | Formats the code using Prettier          |
| `npm run test:e2e`     | Runs E2E tests using Cypress (CLI)       |
| `npm run cypress:open` | Opens the Cypress UI                     |

## ✅ Linting and Rules

The project is preconfigured with ESLint, supporting rules for:

- JavaScript / TypeScript
- React
- Accessibility best practices
- Stylistic rules (optional)

You can customize the `eslint.config.js` file to add or remove advanced configurations (see more in the original template README).

## 🧪 E2E Testing with Cypress

Automated login and registration tests are included using Cypress.

### Structure

```
cypress/
  └── e2e/
      ├── login.spec.ts
      └── register.spec.ts
  └── support/
      ├── e2e.ts
      └── commands.ts
```

### Running the Tests

```bash
npm run test:e2e       # Runs the tests in headless mode
npm run cypress:open   # Opens the interactive Cypress UI
```

## 📁 Folder Structure

```
src/
├── components/        # Reusable components
├── pages/             # Main pages
├── hooks/             # Custom Hooks
├── store/             # Redux store and slices
├── services/          # API consumption logic
├── routes/            # App routing
├── types/             # Global types
└── App.tsx            # Main entry point
```

## 🔐 Authentication

The system uses JWT (Access/Refresh) to manage user sessions. The token is securely stored and validated on each initial load.

## 🧭 Navigation

`react-router-dom` is used for routing between pages such as:

- `/login`
- `/register`
- `/dashboard`
- `/workspaces/:id`