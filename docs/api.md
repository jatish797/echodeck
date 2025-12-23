# EchoDeck API Documentation

## Base URL

```
http://localhost:3001/api
```

## Authentication

All protected endpoints require authentication token in header:

```
Authorization: Bearer <token>
```

## Endpoints

### Accounts

#### GET /accounts

Get all connected accounts

```json
Response: {
  "accounts": [
    {
      "id": "uuid",
      "platform": "twitter",
      "username": "@username",
      "avatarUrl": "https://...",
      "isActive": true
    }
  ]
}
```

#### POST /accounts/connect

Initiate OAuth connection

```json
Request: {
  "platform": "twitter" | "linkedin" | "instagram"
}
Response: {
  "authUrl": "https://oauth-provider.com/..."
}
```

### Posts

#### GET /posts

Get all posts

```json
Query params:
  - status: draft | scheduled | published | failed
  - accountId: uuid

Response: {
  "posts": [
    {
      "id": "uuid",
      "content": "Post text",
      "status": "scheduled",
      "scheduledAt": "2025-01-01T12:00:00Z"
    }
  ]
}
```

#### POST /posts

Create new post

```json
Request: {
  "accountId": "uuid",
  "content": "Post text",
  "scheduledAt": "2025-01-01T12:00:00Z",
  "media": ["file1.jpg", "file2.jpg"]
}
Response: {
  "post": { ... }
}
```

#### PUT /posts/:id

Update post

```json
Request: {
  "content": "Updated text",
  "scheduledAt": "2025-01-02T12:00:00Z"
}
```

#### DELETE /posts/:id

Delete post

### Media

#### POST /media/upload

Upload media file

```
Content-Type: multipart/form-data
Field: file

Response: {
  "mediaId": "uuid",
  "url": "/uploads/...",
  "mimeType": "image/jpeg"
}
```

## Error Responses

```json
{
  "error": "Error message",
  "code": "ERROR_CODE",
  "details": {}
}
```

### Error Codes

- `AUTH_REQUIRED`: Authentication required
- `INVALID_TOKEN`: Invalid or expired token
- `NOT_FOUND`: Resource not found
- `VALIDATION_ERROR`: Invalid request data
- `RATE_LIMIT`: Rate limit exceeded
