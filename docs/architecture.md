# EchoDeck Architecture

## Overview

EchoDeck is a privacy-first desktop application for managing social media posts across multiple platforms.

## Tech Stack

- **Desktop**: Electron + React + TypeScript
- **Backend**: Node.js + Express + TypeScript
- **Database**: PostgreSQL
- **Queue**: Redis + BullMQ
- **Auth**: OAuth 2.0 + Keytar

## Architecture Layers

### 1. Desktop Layer (Electron)

- **Main Process**: Window management, system tray, native OS integration
- **Renderer Process**: React app for UI
- **IPC Bridge**: Secure communication between main and renderer

### 2. Frontend Layer (React)

- Component-based architecture
- State management with Zustand
- API communication with backend

### 3. Backend Layer (Node.js)

- RESTful API
- OAuth authentication
- Queue management for scheduled posts
- Database operations

### 4. Infrastructure

- PostgreSQL for persistent data
- Redis for job queue
- Docker for local development

## Data Flow

1. User creates post in React UI
2. IPC sends data to Electron main process
3. Main process forwards to backend API
4. Backend stores in PostgreSQL
5. Scheduler adds job to Redis queue
6. Worker processes job at scheduled time
7. Post published to platform
