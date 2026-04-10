# Food App
Une application de commande de nourriture avec un backend Node.js (Express + Prisma + MySQL) et un frontend React (Vite + Tailwind CSS).

## Prérequis
- Node.js 20+
- Une instance MySQL en cours d’exécution

## Database
Créez une base de données MySQL :
- `CREATE DATABASE food_app;`

## Setup

### Backend
- `cd backend`
- `npm install`
- Créez `backend/.env` à partir de `backend/.env.example`
- Vérifiez que `DATABASE_URL` est correct
- Exécutez Prisma :
  - `npx prisma generate`
  - `npx prisma migrate dev --name init`
  - (seed optionnel) `node prisma/seed.js`

### Frontend
- `cd frontend`
- `npm install`

## Environment
Les variables backend sont définies dans `backend/.env`. Consultez `backend/.env.example` pour les clés actuelles.

### Clés backend requises
- `DATABASE_URL`
- `JWT_SECRET`

## Run

### Démarrer le backend
- `npm --prefix backend run dev`

Le backend écoute sur le port `5000` (voir `backend/src/server.js`).

### Démarrer le frontend
- `npm --prefix frontend run dev`

## API (backend)
- **Auth**
  - `POST /api/auth/register` `{ email, password }` → renvoie `{ id, email, token }`
  - `POST /api/auth/login` `{ email, password }` → renvoie `{ id, email, token }`
  - `GET /api/auth/me` (Bearer token) → renvoie `{ id, email }`
- **Menu**
  - `GET /api/menu` → tous les articles
  - `GET /api/menu/category/:category` → articles par catégorie (ex. `burger`, `chicken`, `pizza`)
  - `GET /api/menu/:id` → un article
- **Toppings**
  - `GET /api/topping` → tous les toppings
- **Orders**
  - `POST /api/order` → créer une commande
  - `GET /api/order/user/:userId` → récupérer les commandes d’un utilisateur


