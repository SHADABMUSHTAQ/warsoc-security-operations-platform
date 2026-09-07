# WarSOC Backend — Hackathon Submission

This branch contains the public, source-only backend for **WarSOC**, an
AI-assisted security operations platform built to help security teams ingest,
triage and investigate security telemetry through a single dashboard.

## What is included

- FastAPI backend and domain modules
- Agent source, build/support scripts, test code and non-secret deployment templates
- MongoDB and Redis integration code
- API routes, schemas, detection/triage workflows and monitoring utilities
- A safe environment template plus a minimal local Docker setup

## What is deliberately excluded

This is a public hackathon submission. It does **not** include secrets,
credentials, `.env` files, private certificates/keys, database backups, logs,
test reports, screenshots, deployment runbooks, cloud infrastructure settings
or compiled agent installers. Production runbooks and active cloud settings
are also excluded. Configure your own services and secrets before running it.

## Run locally

1. Create a virtual environment and install dependencies:

   ```bash
   python -m venv .venv
   .venv\\Scripts\\activate
   pip install -r requirements.txt
   ```

2. Copy `.env.example` to `.env`, then set a unique `JWT_SECRET_KEY` of at
   least 32 characters. Start MongoDB and Redis locally, or use the example
   Compose file.

3. Start the API:

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
