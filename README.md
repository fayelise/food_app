# Food App
Une application de commande de nourriture avec un backend Node.js (Express + Prisma + MySQL) un frontend web React (Vite + Tailwind CSS) et une application mobile Flutter (`frontend_mobile/`).

## Prérequis
- Node.js 
- Une instance MySQL en cours d’exécution
- Pour l'app mobile : [Flutter SDK](https://docs.flutter.dev/get-started/install) (Dart ≥ 3.3) et un émulateur Android (via Android Studio) ou un simulateur iOS (macOS uniquement). Vérifiez l'installation avec `flutter doctor`.


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

### Démarrer l'app mobile (Flutter)
Le backend doit être démarré (port `5000`) avant de lancer l'app.

- `cd frontend_mobile`
- `flutter pub get`
- Lancez un émulateur Android ou un simulateur iOS (le simulateur iOS n'est disponible que sur macOS) : `flutter emulators` pour lister, `flutter emulators --launch <id>` pour en démarrer un
- Vérifiez que l'appareil est détecté et notez son id : `flutter devices`
- `flutter run -d <id>` (ex. `flutter run -d emulator-5554`) pour forcer le lancement sur l'émulateur, même si d'autres appareils (Chrome, Windows…) sont détectés

Plus de détails dans [frontend_mobile/README.md](frontend_mobile/README.md).
