import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import '../config/theme.dart';
import '../providers/auth_provider.dart';
import '../providers/cart_provider.dart';

/// Auth-aware top bar, mirrors Header.jsx: shows Login/Register buttons
/// when logged out, or the logo + cart icon + profile menu when logged in.
class AppHeader extends StatelessWidget implements PreferredSizeWidget {
  const AppHeader({super.key});

  @override
  Size get preferredSize => const Size.fromHeight(kToolbarHeight);

  @override
  Widget build(BuildContext context) {
    final auth = context.watch<AuthProvider>();
    final cart = context.watch<CartProvider>();
    final user = auth.user;

    return AppBar(
      titleSpacing: 12,
      title: GestureDetector(
        behavior: HitTestBehavior.opaque,
        onTap: () => Navigator.pushNamedAndRemoveUntil(
            context, '/', (route) => false),
        child: Row(
          mainAxisSize: MainAxisSize.min,
          children: [
            Image.asset('assets/images/logo.png', height: 36),
            const SizedBox(width: 8),
            const Text('Foodie App',
                style: TextStyle(fontWeight: FontWeight.bold, fontSize: 18)),
          ],
        ),
      ),
      actions: user == null
          ? [
              TextButton(
                onPressed: () => Navigator.pushNamed(context, '/login'),
                child: const Text('Login'),
              ),
              ElevatedButton(
                onPressed: () => Navigator.pushNamed(context, '/register'),
                child: const Text('Register'),
              ),
              const SizedBox(width: 8),
            ]
          : [
              Stack(
                clipBehavior: Clip.none,
                children: [
                  IconButton(
                    icon: const Icon(Icons.shopping_cart),
                    onPressed: () => Navigator.pushNamed(context, '/cart'),
                  ),
                  if (cart.itemCount > 0)
                    Positioned(
                      right: 4,
                      top: 4,
                      child: Container(
                        padding: const EdgeInsets.all(3),
                        decoration: const BoxDecoration(
                          color: AppColors.primary,
                          shape: BoxShape.circle,
                        ),
                        constraints:
                            const BoxConstraints(minWidth: 16, minHeight: 16),
                        child: Text(
                          '${cart.itemCount}',
                          style: const TextStyle(
                              color: Colors.white, fontSize: 10),
                          textAlign: TextAlign.center,
                        ),
                      ),
                    ),
                ],
              ),
              PopupMenuButton<String>(
                offset: const Offset(0, 48),
                icon: CircleAvatar(
                  backgroundImage:
                      const AssetImage('assets/images/profil.png'),
                  radius: 18,
                ),
                itemBuilder: (context) => [
                  PopupMenuItem(
                    enabled: false,
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      mainAxisSize: MainAxisSize.min,
                      children: [
                        Text(
                          user.email.split('@').first,
                          style: const TextStyle(
                            fontSize: 14,
                            fontWeight: FontWeight.w600,
                            color: Colors.black87,
                          ),
                        ),
                        Text(
                          user.email,
                          style: const TextStyle(
                              fontSize: 12, color: Colors.black54),
                        ),
                      ],
                    ),
                  ),
                  const PopupMenuItem(
                    value: 'cart',
                    child: Row(
                      children: [
                        Icon(Icons.shopping_cart_outlined, size: 18),
                        SizedBox(width: 8),
                        Text('MyCart'),
                      ],
                    ),
                  ),
                  const PopupMenuItem(
                    value: 'orders',
                    child: Row(
                      children: [
                        Icon(Icons.history, size: 18),
                        SizedBox(width: 8),
                        Text('MyOrders'),
                      ],
                    ),
                  ),
                  const PopupMenuDivider(),
                  const PopupMenuItem(
                    value: 'logout',
                    child: Row(
                      children: [
                        Icon(Icons.logout, size: 18, color: Colors.red),
                        SizedBox(width: 8),
                        Text('Sign out', style: TextStyle(color: Colors.red)),
                      ],
                    ),
                  ),
                ],
                onSelected: (value) async {
                  switch (value) {
                    case 'cart':
                      Navigator.pushNamed(context, '/cart');
                      break;
                    case 'orders':
                      Navigator.pushNamed(context, '/orders');
                      break;
                    case 'logout':
                      await context.read<AuthProvider>().logout();
                      await context.read<CartProvider>().loadForUser(null);
                      if (context.mounted) {
                        Navigator.pushNamedAndRemoveUntil(
                            context, '/login', (route) => false);
                      }
                      break;
                  }
                },
              ),
              const SizedBox(width: 8),
            ],
    );
  }
}
