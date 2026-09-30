import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import '../providers/auth_provider.dart';
import '../providers/cart_provider.dart';

/// Keeps CartProvider in sync with the currently logged-in user: loads
/// that user's persisted cart whenever the logged-in user id changes
/// (login, logout, or session restore on app start). Mirrors the
/// `useEffect` in CartContext.jsx that watches `user?.id`.
class AuthGate extends StatefulWidget {
  final Widget child;

  const AuthGate({super.key, required this.child});

  @override
  State<AuthGate> createState() => _AuthGateState();
}

class _AuthGateState extends State<AuthGate> {
  int? _lastUserId;

  @override
  Widget build(BuildContext context) {
    final auth = context.watch<AuthProvider>();

    if (!auth.loading && auth.user?.id != _lastUserId) {
      final newUserId = auth.user?.id;
      WidgetsBinding.instance.addPostFrameCallback((_) {
        if (!mounted) return;
        _lastUserId = newUserId;
        context.read<CartProvider>().loadForUser(newUserId);
      });
    }

    return widget.child;
  }
}
