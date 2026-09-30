# Foodie App — Flutter (frontend_mobile)

Client Flutter pour le backend `food_app` existant (Express + Prisma +
MySQL, inchangé). Reproduit les écrans de l'app React : Home, Login,
Register, Dashboard (menu + catégories), détail d'un item (+ toppings),
Panier (checkout avec adresse à Dakar), Historique des commandes.

## Backend

Le backend ne change pas. Démarre-le normalement dans `food_app/backend` :

```bash
npm install
npx prisma generate
npx prisma migrate dev --name init
node prisma/seed.js
npm run dev
```

Le backend doit tourner sur `http://localhost:5000` pendant que tu testes
l'app Flutter.

## Lancer l'app

```bash
flutter pub get

# Démarre un émulateur (le simulateur iOS n'est disponible que sur macOS)
flutter emulators
flutter emulators --launch <id>

# Vérifie que l'appareil est détecté, puis lance l'app dessus
flutter devices
flutter run -d <id>        # ex. flutter run -d emulator-5554
```

## Structure

```
lib/
  config/          # thème, URL de l'API
  models/          # AppUser, MenuItem, Topping, CartItem, FoodOrder
  providers/        # AuthProvider (JWT + session), CartProvider (panier persistant)
  services/        # ApiService — tous les appels HTTP vers le backend
  screens/         # Home, Login, Register, Dashboard, Element, Cart, Orders
  widgets/         # AppHeader, CategorySlider, MenuItemCard, RequireAuth, AuthGate
assets/images/     # logo, visuels d'accueil, icônes de catégories
```

## Correspondance avec l'app React d'origine

| React (`frontend/`)                  | Flutter (`lib/`)                          |
|---------------------------------------|--------------------------------------------|
| `context/AuthContext.jsx`            | `providers/auth_provider.dart`             |
| `context/CartContext.jsx`            | `providers/cart_provider.dart`             |
| `api.js` + `fetch(...)` un peu partout | `services/api_service.dart` (centralisé) |
| `components/auth/Login.jsx`          | `screens/login_screen.dart`                |
| `components/auth/Register.jsx`       | `screens/register_screen.dart`             |
| `components/auth/RequireAuth.jsx`    | `widgets/require_auth.dart`                |
| `components/layout/Header.jsx`       | `widgets/app_header.dart`                  |
| `components/pages/Home.jsx`          | `screens/home_screen.dart`                 |
| `components/pages/Dashboard.jsx`     | `screens/dashboard_screen.dart`            |
| `components/pages/Element.jsx`       | `screens/element_screen.dart`              |
| `components/pages/Cart.jsx`          | `screens/cart_screen.dart`                 |
| `components/pages/Orders.jsx`        | `screens/orders_screen.dart`               |
| `components/ui/CategorySlider.jsx`   | `widgets/category_slider.dart`             |
| `components/ui/Card.jsx`             | `widgets/menu_item_card.dart`              |

## Notes / choix faits

- **Gestion d'état** : `provider`, au plus proche des Context React
  d'origine (un `ChangeNotifier` par contexte).
- **Session** : le JWT est stocké avec `shared_preferences` (équivalent
  mobile de `localStorage`), et `/auth/me` est rappelé au démarrage pour
  restaurer la session, comme dans `AuthContext.jsx`.
- **Panier** : persisté par utilisateur (`food_app_cart_<userId>`), comme
  dans `CartContext.jsx`.
