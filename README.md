# Docker networking lab

This project explores **networking topology for cloud-native applications**. The goal is to understand how production environments separate traffic into public and private subnets, and to replicate that locally so that the gap between local and live environments is reduced.

Docker is used to run a **public/private networks**: a reverse proxy (NGINX) as the single entry point on the public side, and a frontend (Vite), backend (Node), and database (Postgres) on the private side. All user traffic goes through the proxy; the backend and database are not directly exposed to the host.

**Stack**

- **NGINX** — reverse proxy (port 80), routes `/` to the frontend and `/api/` to the backend
- **Vite + Vue** — frontend
- **Node (Express)** — backend, talks to Postgres
- **Postgres** — database, init and seed via SQL in `db/init/`

**Run**

```bash
docker compose up
```

Open http://localhost for the app; the API is under `/api/` (e.g. `GET /api/todos`).
