import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import 'config/theme.dart';
import 'providers/auth_provider.dart';
import 'providers/cart_provider.dart';
import 'screens/cart_screen.dart';
import 'screens/dashboard_screen.dart';
import 'screens/element_screen.dart';
import 'screens/login_screen.dart';
import 'screens/orders_screen.dart';
import 'screens/register_screen.dart';
import 'screens/root_screen.dart';
import 'widgets/auth_gate.dart';
import 'widgets/require_auth.dart';

void main() {
  runApp(const FoodieApp());
}

class FoodieApp extends StatelessWidget {
  const FoodieApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MultiProvider(
      providers: [
        ChangeNotifierProvider(create: (_) => AuthProvider()),
        ChangeNotifierProvider(create: (_) => CartProvider()),
      ],
      child: AuthGate(
        child: MaterialApp(
          title: 'Foodie App',
          debugShowCheckedModeBanner: false,
          theme: buildAppTheme(),
          initialRoute: '/',
          onGenerateRoute: (settings) {
            switch (settings.name) {
              case '/':
                return MaterialPageRoute(builder: (_) => const RootScreen());
              case '/login':
                return MaterialPageRoute(builder: (_) => const LoginScreen());
              case '/register':
                return MaterialPageRoute(
                    builder: (_) => const RegisterScreen());
              case '/dashboard':
                return MaterialPageRoute(
                  builder: (_) => const RequireAuth(child: DashboardScreen()),
                );
              case '/element':
                final id = settings.arguments as int;
                return MaterialPageRoute(
                  builder: (_) => RequireAuth(
                    child: ElementScreen(menuItemId: id),
                  ),
                );
              case '/cart':
                return MaterialPageRoute(
                  builder: (_) => const RequireAuth(child: CartScreen()),
                );
              case '/orders':
                return MaterialPageRoute(
                  builder: (_) => const RequireAuth(child: OrdersScreen()),
                );
              default:
                return MaterialPageRoute(builder: (_) => const RootScreen());
            }
          },
        ),
      ),
    );
  }
}
