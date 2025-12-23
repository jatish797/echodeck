# EchoDeck Setup Guide

## Prerequisites

- Node.js v20+
- Docker Desktop
- Git

## Installation Steps

### 1. Clone Repository

```bash
git clone https://github.com/jatish797/echodeck.git
cd echodeck
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Start Infrastructure

```bash
npm run docker:up
```

This starts PostgreSQL and Redis containers.

### 4. Configure Environment

Copy `.env.example` files:

```bash
cp apps/desktop/.env.example apps/desktop/.env
cp apps/server/.env.example apps/server/.env
```

Edit the `.env` files with your configuration.

### 5. Run Database Migrations

```bash
npm run db:migrate --workspace=apps/server
```

### 6. Start Development Servers

```bash
# Start both server and desktop app
npm run dev

# Or start individually:
npm run dev:server
npm run dev:desktop
```

## Building for Production

### Desktop App

```bash
npm run build:desktop
npm run pack --workspace=apps/desktop
```

### Server

```bash
npm run build:server
```

## Troubleshooting

### Docker containers not starting

```bash
docker-compose -f infrastructure/docker/docker-compose.yml down
docker-compose -f infrastructure/docker/docker-compose.yml up -d
```

### Port conflicts

Check if ports 3001 (server), 5432 (postgres), 6379 (redis) are available.
