import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import '../providers/auth_provider.dart';

/// Mirrors RequireAuth.jsx: shows nothing while the session is being
/// restored, redirects to /login if there's no user, otherwise renders
/// the protected screen.
class RequireAuth extends StatelessWidget {
  final Widget child;

  const RequireAuth({super.key, required this.child});

  @override
  Widget build(BuildContext context) {
    final auth = context.watch<AuthProvider>();

    if (auth.loading) {
      return const Scaffold(body: Center(child: CircularProgressIndicator()));
    }

    if (auth.user == null) {
      WidgetsBinding.instance.addPostFrameCallback((_) {
        Navigator.of(context)
            .pushNamedAndRemoveUntil('/login', (route) => false);
      });
      return const Scaffold(body: SizedBox.shrink());
    }

    return child;
  }
}
