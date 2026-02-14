# JustClaw API Interface

This document defines the backend API endpoints required to support the JustClaw frontend functionality.

## Base URL
All API requests should be prefixed with `/api/v1`.

## Authentication

### `POST /auth/login`
Authenticate a user (e.g., via Twitter/X OAuth flow).

**Request Body:**
```json
{
  "provider": "twitter",
  "token": "oauth_token_from_provider"
}
```

**Response (200 OK):**
```json
{
  "token": "jwt_access_token",
  "user": {
    "id": "user_123",
    "name": "John Doe",
    "avatar": "https://..."
  }
}
```

---

## User Profile

### `GET /user/profile`
Get the current user's profile information and balance.

**Response (200 OK):**
```json
{
  "id": "user_123",
  "balance": 142.50,
  "payment_method": {
    "type": "credit_card",
    "last4": "4242",
    "expiry": "12/24"
  }
}
```

### `GET /user/invoices`
Get a list of past invoices.

**Response (200 OK):**
```json
[
  {
    "id": "INV-001",
    "date": "2023-10-01",
    "amount": 29.00,
    "currency": "USD",
    "status": "paid" // "paid", "pending", "failed"
  }
]
```

### `GET /user/consumption`
Get historical usage/consumption data.

**Response (200 OK):**
```json
[
  {
    "date": "2023-10-01",
    "hours_used": 12,
    "cost": 0.50
  }
]
```

### `POST /user/deposit`
Initiate a crypto deposit.

**Request Body:**
```json
{
  "amount": 100.00,
  "chain": "ETH", // "ETH", "BSC", "SOL", "TRX"
  "token": "USDT" // "USDT", "USDC", "ETH", "BTC"
}
```

**Response (200 OK):**
```json
{
  "deposit_id": "dep_999",
  "address": "0x71C7656EC7ab88b098defB751B7401B5f6d8976F",
  "qr_code_url": "https://api.qrserver.com/v1/create-qr-code/?data=..."
}
```

---

## Bots Management

### `GET /bots`
List all bots owned by the user.

**Response (200 OK):**
```json
[
  {
    "id": "bot_1",
    "name": "Alpha Trader",
    "status": "running", // "running", "stopped", "error"
    "specs": {
      "storage": "512MB",
      "cpu_usage": "12%"
    },
    "expiry_date": "2023-11-15T00:00:00Z"
  }
]
```

### `POST /bots`
Deploy a new bot.

**Request Body:**
```json
{
  "name": "New Bot Name",
  "telegram_api_key": "123456:ABC-...",
  "telegram_user_id": "987654321",
  "plan": "starter" // "starter", "pro", "enterprise"
}
```

**Response (201 Created):**
```json
{
  "id": "bot_new_1",
  "status": "provisioning",
  "deployment_fee": 5.00,
  "monthly_fee": 29.00
}
```

### `POST /bots/{id}/start`
Start a stopped bot.

**Response (200 OK):**
```json
{
  "id": "bot_1",
  "status": "running"
}
```

### `POST /bots/{id}/stop`
Stop a running bot.

**Response (200 OK):**
```json
{
  "id": "bot_1",
  "status": "stopped"
}
```

### `DELETE /bots/{id}`
Delete a bot permanently.

**Response (204 No Content)**

---

## Admin API

### `GET /admin/stats`
Get aggregated system statistics.

**Response:**
```json
{
  "totalUsers": 1250,
  "totalBots": 850,
  "activeBots": 620,
  "totalRevenue": 45200.00
}
```

### `GET /admin/servers`
Get status of all server nodes.

**Response:**
```json
[
  {
    "id": "node-01",
    "name": "US-East-1",
    "status": "online",
    "cpu": "45%",
    "ram": "12GB/32GB",
    "storage": "450GB/1TB",
    "botCount": 120
  }
]
```

### `GET /admin/bots`
Get a paginated list of all bots across all users.

**Response:**
```json
[
  {
    "id": "bot_1",
    "owner": "user_123", // Expanded user object in real app
    "name": "Alpha Trader",
    "status": "running"
  }
]
```

### `GET /admin/transactions`
Get global transaction history.

**Response:**
```json
[
  {
    "id": "tx_999",
    "user": "user_123",
    "amount": 100.00,
    "type": "deposit",
    "status": "completed",
    "date": "2023-10-01T12:00:00Z"
  }
]
```
