# Blockflow — Job Processing Demo

A fullstack job processing demo with real-time progress updates via WebSocket and REST API polling.

## Tech Stack

- **Backend:** NestJS 11, TypeORM, PostgreSQL 16, BullMQ (Redis 7), Socket.IO
- **Frontend:** React 19, Vite 8, Tailwind CSS 4, React Router DOM v7, Socket.IO Client
- **Infrastructure:** Docker Compose, Nginx

## User Interaction Scenarios

### WebSocket Job Flow
1. User navigates to `/jobs` and clicks **"Run WebSocket job"**.
2. Frontend opens a Socket.IO connection and emits `initJob`.
3. Backend creates a `Job` in PostgreSQL (`status: queued`, `progress: 0`), adds it to the BullMQ `jobs` queue, and registers the socket for live updates.
4. As the pipeline runs, the backend emits `jobProgress` events (30%, 70%) and a final `jobCompleted` event.
5. The frontend updates the progress bar in real time without polling.

### REST API Polling Flow
1. User navigates to `/jobs` and clicks **"Run polling job"**.
2. Frontend sends `POST /jobs` to create a job and receives a `JobDto` with the job UUID.
3. Frontend polls `GET /jobs/:id` every second.
4. When `status` becomes `done`, polling stops.

### Onboarding Flow
1. Landing at `/mainwish` — user selects a wish.
2. Navigates to `/weight` — user enters weight with lbs/kg toggle.
3. Navigates to `/jobs` — user runs a job via WebSocket or polling.
4. "Reset" returns to `/mainwish`.

## Job Processing Logic

Jobs flow through a **3-step sequential pipeline**, each step taking ~3 seconds:

```
User triggers job
       ↓
[1] Job created → status: queued, progress: 0
       ↓
[2] Added to BullMQ 'jobs' queue
       ↓
[3] BullMQ worker picks up the job
       ↓
[4] Status updated to 'processing' in DB
       ↓
[5] Pipeline handlers execute sequentially:
       ├── FirstStepHandler   (3s) → progress = 30%
       ├── SecondStepHandler  (3s) → progress = 70%
       └── ThirdStepHandler   (3s) → progress = 100%, status = done
       ↓
[6] WebSocket emits 'jobCompleted'
```

**Total processing time:** ~9 seconds.

The pipeline is driven by `JobsQueueProcessor` (`backend/src/jobs-queue/jobs-queue.processor.ts`), which uses RxJS `concatMap` to run handlers in sequence. Each handler implements `JobsQueueHandler` (`backend/src/jobs-queue/jobs-queue-handler.interface.ts`) and calls `databaseService.setJobProgress()` or `databaseService.finishJob()` to update the database.

## Job Processing Status Updates

Status is tracked at **two levels simultaneously**:

### Database (PostgreSQL)
- **Entity:** `Job` with fields `id` (UUID), `status` (enum: `queued | processing | done | failed`), `progress` (int 0–100), `createdAt`.
- **Status transitions:** `queued → processing → done` (or `failed`).
- Every status/progress change is persisted immediately via TypeORM.
- Service: `DatabaseService` (`backend/src/database/database.service.ts`) wraps the `JobRepository` with methods `updateJobStatus()`, `setJobProgress()`, `finishJob()`.

### Real-time (WebSocket)
- `WebSocketAdapter` (`backend/src/websocket/websocket.adapter.ts`) maintains a `Map<jobId, Set<socketId>>` to track which sockets are watching each job.
- After each pipeline handler completes, `JobsQueueProcessor` emits via the adapter:
  - `jobProgress` — `{ jobId, progress, status }`
- After all handlers finish:
  - `jobCompleted` — `{ jobId }`
- BullMQ `QueueEvents` listeners also emit `jobProgress`, `jobCompleted`, `jobFailed`, and `jobStatus` events from Redis-level events.

### REST (Polling)
- Clients poll `GET /jobs/:id` (`backend/src/rest/rest.controller.ts`).
- The endpoint reads job state directly from PostgreSQL and returns a `JobDto`.

### Status Summary

| Stage        | DB Status      | DB Progress | WS Event         |
|-------------|----------------|-------------|------------------|
| Created     | `queued`       | 0           | —                |
| Started     | `processing`   | 0           | `jobStatus`      |
| Step 1 done | `processing`   | 30          | `jobProgress`    |
| Step 2 done | `processing`   | 70          | `jobProgress`    |
| Step 3 done | `done`         | 100         | `jobCompleted`   |
| On error    | `failed`       | —           | `jobFailed`      |

## Running the Project

```bash
# Start all services (PostgreSQL, Redis, Backend, Frontend)
docker compose up

# With hot-reload for development
docker compose --profile dev up

# Frontend: http://localhost (production) or http://localhost:5173 (dev)
# Backend API: http://localhost:3000
```
