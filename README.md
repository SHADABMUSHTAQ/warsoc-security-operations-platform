# WarSOC Backend — Hackathon Submission

This branch contains the public, source-only backend for **WarSOC**, an
AI-assisted security operations platform built to help security teams ingest,
triage and investigate security telemetry through a single dashboard.

## What is included

- FastAPI backend and domain modules
- MongoDB and Redis integration code
- API routes, schemas, detection/triage workflows and monitoring utilities
- A safe environment template, local Docker setup and demo-user bootstrap

## What is deliberately excluded

This is a public hackathon submission. It does **not** include secrets,
credentials, `.env` files, private certificates/keys, database backups, logs,
test reports, screenshots, deployment/cloud files or compiled agent installers.
Configure your own services and secrets before running it.

## Run locally

1. Copy `.env.example` to `.env`, then set a unique `JWT_SECRET_KEY` of at
   least 32 characters. Never commit this file.

   ```bash
   copy .env.example .env
   ```

2. Start the API plus local MongoDB and Redis:

   ```bash
   docker compose -f docker-compose.example.yml up --build -d
   ```

3. To demonstrate the frontend login safely, set `DEMO_USERNAME`,
   `DEMO_EMAIL` and a new `DEMO_PASSWORD` in your local `.env`, then run:

   ```bash
   docker compose -f docker-compose.example.yml --profile tools run --rm seed-demo
   ```

   This creates only a local demo admin record. The script refuses to run in
   production mode and never embeds a password in the repository.

4. Run the frontend with `VITE_API_BASE_URL=http://127.0.0.1:8000/api/v1`,
   open its `/login` page and sign in using your local demo values. Dashboard
   requests use the same `/api/v1` routes and HttpOnly-cookie authentication.

For a non-Docker setup, install `requirements.txt`, start MongoDB and Redis,
then run:

   ```bash
   uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
   ```

The interactive API documentation is available at `http://localhost:8000/docs`
when the service is running.

## Qoder disclosure

Qoder was used during development as an AI-assisted coding tool for iteration,
debugging and code-quality support. The architecture, integration decisions,
security review and final submitted implementation were directed and reviewed
by the team.

## Public-repository note

Treat the entire Git history of a public repository as public. Never add a
real credential or a production export to this branch; add local-only files to
`.gitignore` and rotate any secret that may have been exposed elsewhere.
