# Food App
A food ordering app with a Node.js backend (Express + Prisma + MySQL) and a React frontend (Vite + Tailwind CSS).

## Prerequisites
- Node.js 20+
- A running MySQL instance

## Database
Create a MySQL database:
- `CREATE DATABASE food_app;`

## Setup

### Backend
- `cd backend`
- `npm install`
- Create `backend/.env` based on `backend/.env.example`
- Ensure `DATABASE_URL` is correct
- Run Prisma:
  - `npx prisma generate`
  - `npx prisma migrate dev --name init`
  - (optional seed) `node prisma/seed.js`

### Frontend
- `cd frontend`
- `npm install`

## Environment
Backend variables are defined in `backend/.env`. See `backend/.env.example` for the current keys.

### Required backend keys
- `DATABASE_URL`
- `JWT_SECRET`

## Run

### Start backend
- `npm --prefix backend run dev`

The backend listens on port `5000` (see `backend/src/server.js`).

### Start frontend
- `npm --prefix frontend run dev`

## API (backend)
- **Auth**
  - `POST /api/auth/register` `{ email, password }` → returns `{ id, email, token }`
  - `POST /api/auth/login` `{ email, password }` → returns `{ id, email, token }`
  - `GET /api/auth/me` (Bearer token) → returns `{ id, email }`
- **Menu**
  - `GET /api/menu` → all items
  - `GET /api/menu/category/:category` → items by category (e.g. `burger`, `chicken`, `pizza`)
  - `GET /api/menu/:id` → single item
- **Toppings**
  - `GET /api/topping` → all toppings
- **Orders**
  - `POST /api/order` → create order
  - `GET /api/order/user/:userId` → get orders by user

## Frontend behavior notes
- **Toppings show only for**: `burger`, `chicken`, `pizza` (see `frontend/src/components/pages/Element.jsx`).
- **Cart is per user**: stored in `localStorage` under `food_app_cart_<userId>` (see `frontend/src/context/CartContext.jsx`).
- **Logout does not clear all localStorage**: it clears the auth token (so the user is signed out) but keeps per-user cart keys so the same user can log back in and see their cart again.

## Troubleshooting
- **Prisma connection errors**: verify `DATABASE_URL` in `backend/.env` (percent‑encode special characters in username/password).
- **Auth returns Unauthorized**: ensure you send `Authorization: Bearer <token>` for protected routes like `/api/auth/me`.
