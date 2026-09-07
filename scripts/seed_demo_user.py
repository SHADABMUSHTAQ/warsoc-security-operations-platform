"""Create or refresh a local-only demo admin account.

This helper is intentionally opt-in: it needs explicit DEMO_* environment
variables, refuses production mode, and never stores a password in source.
"""

from __future__ import annotations

import os
import sys
import uuid
from datetime import datetime, timezone

from passlib.context import CryptContext
from pymongo import MongoClient


def required(name: str) -> str:
    value = os.getenv(name, "").strip()
    if not value:
        raise ValueError(f"{name} must be set in your local .env file")
    return value


def main() -> int:
    if os.getenv("APP_ENV", "development").strip().lower() == "production":
        raise RuntimeError("Demo seeding is disabled when APP_ENV=production")

    username = required("DEMO_USERNAME").lower()
    email = required("DEMO_EMAIL").lower()
    password = required("DEMO_PASSWORD")
    if len(password.encode("utf-8")) < 12:
        raise ValueError("DEMO_PASSWORD must contain at least 12 characters")

    mongo_uri = os.getenv("MONGODB_URI", "mongodb://localhost:27017")
    database_name = os.getenv("MONGODB_DB_NAME", "WarSOC_DB")
    tenant_id = f"DEMO_{uuid.uuid5(uuid.NAMESPACE_DNS, email).hex[:12].upper()}"
    now = datetime.now(timezone.utc)
    password_hash = CryptContext(schemes=["pbkdf2_sha256", "bcrypt"], deprecated="auto").hash(password)

    with MongoClient(mongo_uri, serverSelectionTimeoutMS=10_000) as client:
        database = client[database_name]
        database.tenants.update_one(
            {"tenant_id": tenant_id},
            {
                "$set": {
                    "tenant_id": tenant_id,
                    "company_name": "WarSOC Local Demo",
                    "plan": "Professional",
                    "retention_days": 90,
                    "status": "active",
                    "active": True,
                    "has_active_plan": True,
                    "updated_at": now,
                },
                "$setOnInsert": {"created_at": now},
            },
            upsert=True,
        )
        database.users.update_one(
            {"username": username, "tenant_id": tenant_id},
            {
                "$set": {
                    "username": username,
                    "email": email,
                    "full_name": "WarSOC Demo Admin",
                    "hashed_password": password_hash,
                    "tenant_id": tenant_id,
                    "plan_type": "Professional",
                    "role": "admin",
                    "compliance_packs": ["peca_forensic"],
                    "has_active_plan": True,
                    "status": "active",
                    "updated_at": now,
                },
                "$setOnInsert": {"created_at": now},
            },
            upsert=True,
        )

    print(f"Local demo user '{username}' is ready for tenant {tenant_id}.")
    return 0


if __name__ == "__main__":
    try:
        raise SystemExit(main())
    except (RuntimeError, ValueError) as exc:
        print(f"Demo seed failed: {exc}", file=sys.stderr)
        raise SystemExit(2)
