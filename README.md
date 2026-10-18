# WarSOC

> Hackathon prototype notice: the operations workspace requires a connected backend and authenticated account. No fabricated dashboard, endpoint, evidence, or compliance records are bundled. The public AI triage page uses synthetic training examples. This is not a production SOC service.

WarSOC is a security-operations platform for teams that need one place to review incidents, investigate logs, manage endpoint and relay access, and prepare compliance evidence. This `main` branch contains the React frontend; the compatible FastAPI backend is available in the public [`backend` branch](https://github.com/SHADABMUSHTAQ/Qoder-Project/tree/backend).

## NYLP AI Hackathon 2026 addition

The browser-based **AI Event Triage** module at `/ai-triage` was added for the NYLP AI Hackathon 2026 demonstration. WarSOC's broader security operations interface and backend existed before this module; this addition must not be represented as a completely new product. The submission should follow the organizer's originality requirements and disclose any reused work.

The team used **OpenAI Codex, Claude, and Qoder** as AI-assisted development tools. These tools helped with coding, debugging, review, and documentation; they are separate from the product's browser-based ML model. The team remains responsible for understanding and testing the submitted work.

### AI methodology and model usage

The AI Event Triage page trains a small **Multinomial Naive Bayes** text classifier in the browser using 32 synthetic, labelled event descriptions. Given a non-sensitive security-event description, it predicts one of four categories: credential abuse, script execution, network anomaly, or routine activity. The page displays indicative words, known-word coverage, and analyst review guidance. It requires no backend, external model provider, API key, or network request for inference.

This is a limited educational model, not a production detection system. The examples are synthetic, its vocabulary is small, its scores are not calibrated risk probabilities, and its output must be reviewed by a person. Do not enter real customer data or rely on its output for security decisions.

No third-party AI inference API is used by this module. Development assistants are disclosed above; their assistance is not counted as product inference.

## Source code map

- [`main`](https://github.com/SHADABMUSHTAQ/Qoder-Project/tree/main): React/Vite frontend, user interface and frontend-to-API contract.
- [`backend`](https://github.com/SHADABMUSHTAQ/Qoder-Project/tree/backend): FastAPI API, authentication, dashboard data, MongoDB/Redis setup and local backend bootstrap.

Both branches are public submission copies and exclude production credentials, customer data, private reports, logs and deployment secrets.

## What the frontend covers

- Secure sign-in, session handling, protected routes, role-aware navigation, and profile settings.
- Operations workspace for incident review, live and historical log investigation, endpoint trust, agent activation, and network-relay administration.
- Compliance workflows for evidence packs, cases, custody actions, legal holds, retention status, archive retrieval, and exports.
- Responsive React UI with accessible loading, empty, error, and permission states.
- Public AI Event Triage page with browser-based ML classification of sample security-event text.

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
