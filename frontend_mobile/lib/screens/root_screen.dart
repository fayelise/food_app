import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import '../providers/auth_provider.dart';
import 'dashboard_screen.dart';
import 'home_screen.dart';

/// Mirrors the "/" route in App.jsx: shows Dashboard if logged in,
/// otherwise the marketing Home screen.
class RootScreen extends StatelessWidget {
  const RootScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final auth = context.watch<AuthProvider>();

    if (auth.loading) {
      return const Scaffold(body: Center(child: CircularProgressIndicator()));
    }

    return auth.user != null ? const DashboardScreen() : const HomeScreen();
  }
}
