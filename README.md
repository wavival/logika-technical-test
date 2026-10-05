# Logika Technical Test

A React single-page application for managing good-action categories. It supports authentication, private routes, category listing, filtering, sorting, pagination, and category creation through external REST APIs.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Available Scripts](#available-scripts)
- [Routes](#routes)
- [Project Structure](#project-structure)
- [Deploying to Netlify](#deploying-to-netlify)
- [License](#license)

## Features

- Token-based authentication persisted in `localStorage`.
- Public and protected routes.
- Paginated category list with filters and sorting.
- Category creation with client-side validation and file uploads.
- REST API integration through the Fetch API.
- Error messages, loading states, toast notifications, and feedback modals.

## Tech Stack

- React 19
- Vite 7
- React Router DOM 7
- Tailwind CSS 4
- Context API
- ESLint and Prettier

## Prerequisites

- Node.js 20.19.0 or later, or Node.js 22.12.0 or later.
- npm.
- Access to the authentication and actions APIs.

## Getting Started

```bash
git clone https://github.com/wavival/logika-technical-test.git
cd logika-technical-test
npm ci
cp .env.example .env
npm run dev
```

Vite prints the local development URL in the terminal, normally `http://localhost:5173`.

## Environment Variables

Create a `.env` file from `.env.example` and provide these build-time variables:

```dotenv
VITE_AUTH_BASE_URL=https://dev.apinetbo.bekindnetwork.com
VITE_API_BASE_URL=https://dev.api.bekindnetwork.com
```

`VITE_` variables are embedded in the client bundle. Do not store secrets in them.

## Available Scripts

```bash
npm run dev      # Starts the Vite development server.
npm run build    # Creates the production bundle in dist/.
npm run preview  # Serves the production bundle locally.
npm run lint     # Runs ESLint.
npm run format   # Formats files with Prettier.
```

## Routes

- `/login`: public login page.
- `/dashboard`: protected category dashboard.
- `/create`: protected category creation page.

Unauthenticated visitors are redirected to `/login`.

## Project Structure

```text
src/
├── api/        API service modules
├── assets/     Icons and logos
├── components/ Reusable UI components
├── context/    Authentication state
├── hooks/      Custom React hooks
├── layout/     Route guards and application routing
├── pages/      Route-level pages
└── utils/      Fetch and error-handling utilities
```

## Deploying to Netlify

`netlify.toml` configures the production build (`npm run build`), publishes `dist`, uses Node.js 22, and redirects all paths to `index.html` so React Router works on direct navigation.

1. Import `wavival/logika-technical-test` into Netlify.
2. In **Project configuration → Environment variables**, add `VITE_AUTH_BASE_URL` and `VITE_API_BASE_URL` with the values required by the target API.
3. Deploy the `main` branch.

Netlify runs the configured build automatically. Any environment-variable change requires a new deployment because Vite reads them at build time.

## License

This repository is provided for technical evaluation purposes only.
