# Food App
Une application de commande de nourriture avec un backend Node.js (Express + Prisma + MySQL) et un frontend React (Vite + Tailwind CSS).

## Prérequis
- Node.js 
- Une instance MySQL en cours d’exécution


## Cloner le projet
- `git clone https://github.com/fayelise/food_app.git`

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
  - `node prisma/seed.js`

### Frontend
- `cd frontend`
- `npm install`

## Environment
Les variables backend sont définies dans `backend/.env`. Consultez `backend/.env.example` pour les clés actuelles.



### Démarrer le backend
- `npm run dev`

Le backend écoute sur le port `5000` (voir `backend/src/server.js`).

### Démarrer le frontend
- `npm  run dev`

