# Curvvtech Backend (Node + Express + Mongo)
(IMP NOTE: please rename .env.ecample to .env)

A clean, conventional REST API for a simplified Smart Device Management Platform.

## Tech Stack
- Node.js + Express
- MongoDB + Mongoose
- JWT auth (access token)
- Zod for validation
- express-rate-limit for per-user rate limiting
- node-cron for background job (auto-deactivate inactive devices)
- Jest + Supertest (sample tests)
- Docker + docker-compose

## Getting Started

### 1) Clone & Install
```bash
npm ci
```

### 2) Configure Environment
Copy `.env.example` to `.env` and set values.

### 3) Run MongoDB
- Local: ensure MongoDB is running; or
- With Docker: `docker compose up -d mongo`

### 4) Start the API
```bash
npm run dev
```
Server runs at `http://localhost:${PORT}` (default 4000).

### 5) Import Postman Collection
Import `postman_collection.json`. Set `baseUrl` variable to your server URL. After login, set `token` variable in Postman.

## API Endpoints

### Auth
- `POST /auth/signup` → Create account
- `POST /auth/login` → Login with email & password → returns JWT + user info

### Devices
- `POST /devices` → Register new device
- `GET /devices?type=light&status=active&page=1&limit=20` → List devices (filters + pagination)
- `PATCH /devices/:id` → Update device
- `DELETE /devices/:id` → Remove device
- `POST /devices/:id/heartbeat` → Set `last_active_at` (now) and optional `status`

### Data & Analytics
- `POST /devices/:id/logs` → Create log entry
- `GET /devices/:id/logs?limit=10` → Last N logs (default 10)
- `GET /devices/:id/usage?range=24h` → Aggregated usage (sum of `units_consumed` in range). Range format: `15m`, `24h`, `7d`.

## Security & Validation
- All device/log routes require `Authorization: Bearer <token>`.
- Input validated via Zod. Helpful error messages on 400.
- Rate limit: **100 req/min per user** (falls back to IP for unauthenticated endpoints).

## Background Job
Every 30 minutes, any device with `last_active_at` older than **24h** is auto-marked `inactive`.

## Notes & Assumptions
- Only device owner can manage a device and its logs.
- Aggregated usage sums logs with `event === "units_consumed"`.
- Minimal tests provided for shape; extend with mongodb-memory-server for full e2e.

## Run with Docker
```bash
docker compose up --build
```
API at `http://localhost:4000` and Mongo at `mongodb://mongo:27017/curvvtech`.
