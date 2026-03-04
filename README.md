# Docker networking lab

This project explores **networking topology for cloud-native applications**. The goal is to understand how production environments separate traffic into public and private subnets, and to replicate that locally so that the gap between local and live environments is reduced.

Docker is used to run a **public/private networks**: a reverse proxy (NGINX) as the single entry point on the public side, and a frontend (Vite), backend (Node), and database (Postgres) on the private side. All user traffic goes through the proxy; the backend and database are not directly exposed to the host.

**Stack**

- **NGINX** — reverse proxy (port 80), routes `/` to the frontend and `/api/` to the backend
- **Vite + Vue** — frontend
- **Node (Express)** — backend, talks to Postgres
- **Postgres** — database, init and seed via SQL in `db/init/`

**Run (production-like)**

```bash
docker compose -f docker-compose.yml up
```

Open http://localhost for the app; the API is under `/api/` (e.g. `GET /api/todos`).

## Development workflow (hot reload)

For local development you typically want hot reload, To keep `docker-compose.yml` production-oriented this can be handled via `docker-compose.override.yml`, which Docker Compose picks up automatically in dev.

**Dev-only override file (`docker-compose.override.yml`):**

```yaml
services:
  frontend:
    develop:
      watch:
        - action: sync
          path: ./frontend
          target: /app
          initial_sync: true
          ignore:
            - node_modules/
        - action: rebuild
          path: package.json

  backend:
    develop:
      watch:
        - action: sync
          path: ./backend
          target: /app
          initial_sync: true
          ignore:
            - node_modules/
        - action: rebuild
          path: package.json
```

**Start the stack for development (with hot reload):**

```bash
# Watch mode only works if the flag is provided
docker compose up --watch
```

In this mode:

This separation keeps your local workflow fast and pleasant, while keeping the base Compose file closer to how a real deployment would look.
