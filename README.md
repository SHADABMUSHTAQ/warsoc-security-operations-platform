# WarSOC

WarSOC is a security-operations platform for teams that need one place to review incidents, investigate logs, manage endpoint and relay access, and prepare compliance evidence. This `main` branch contains the React frontend; the compatible FastAPI backend is available in the public [`backend` branch](https://github.com/SHADABMUSHTAQ/Qoder-Project/tree/backend).

## Hackathon submission

This repository is a clean, public submission copy prepared for Alibaba Cloud AI Hackathon Pakistan 2026. It has a fresh Git history and excludes all private environment files, internal implementation reports, generated outputs, and deployment-specific configuration.

The team used **Qoder** as an AI-assisted development tool while building and refining this frontend. Qoder supported the development workflow; the project team reviewed the code and remains responsible for its design, testing, and submission.

## Source code map

- [`main`](https://github.com/SHADABMUSHTAQ/Qoder-Project/tree/main): React/Vite frontend, user interface and frontend-to-API contract.
- [`backend`](https://github.com/SHADABMUSHTAQ/Qoder-Project/tree/backend): FastAPI API, authentication, dashboard data, MongoDB/Redis setup and safe local demo bootstrap.

Both branches are public submission copies and exclude production credentials, customer data, private reports, logs and deployment secrets.

## What the frontend covers

- Secure sign-in, session handling, protected routes, role-aware navigation, and profile settings.
- Operations workspace for incident review, live and historical log investigation, endpoint trust, agent activation, and network-relay administration.
- Compliance workflows for evidence packs, cases, custody actions, legal holds, retention status, archive retrieval, and exports.
- Responsive React UI with accessible loading, empty, error, and permission states.

## Tech stack

- React 19 and Vite
- React Router and Zustand
- Axios, WebSocket support, Recharts, Cytoscape, and Three.js
- ESLint and Node test runner

## Run locally

Prerequisites: Node.js 20 or later and a compatible backend API.

```bash
npm install
copy .env.example .env.local
npm run dev
```

Update `.env.local` with the URL of your own backend. Never commit `.env.local`, API keys, customer data, or service-account files.

## Quality checks

```bash
npm test
npm run lint
npm run build
```

## Repository safety

Before publishing, this submission copy was reviewed to exclude:

- Actual `.env` files and deployment-specific settings
- Internal reports and generated output files
- Git history from the source repository
- Customer data, credentials, API keys, and service-account material

If you deploy a fork, configure its environment variables in the hosting provider and rotate any credential that may have been exposed elsewhere.
