import 'package:flutter/material.dart';

import '../config/theme.dart';
import '../widgets/app_footer.dart';
import '../widgets/app_header.dart';

class HomeScreen extends StatelessWidget {
  const HomeScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: const AppHeader(),
      body: SingleChildScrollView(
        child: Column(
          children: [
            Container(
              width: double.infinity,
              padding: const EdgeInsets.symmetric(vertical: 60, horizontal: 24),
              decoration: const BoxDecoration(
                gradient: LinearGradient(
                  colors: [AppColors.primaryLight, AppColors.primary],
                  begin: Alignment.topLeft,
                  end: Alignment.bottomRight,
                ),
              ),
              child: Column(
                children: [
                  const Text(
                    'KAYY THIOPP',
                    textAlign: TextAlign.center,
                    style: TextStyle(
                      fontSize: 36,
                      fontWeight: FontWeight.bold,
                      color: Colors.white,
                    ),
                  ),
                  const SizedBox(height: 16),
                  const Text(
                    'Juicy, stacked burgers made with premium beef, fresh '
                    'toppings, and our secret sauce. Delivered hot to your '
                    'door in under 30 minutes. Order now and taste the '
                    'difference!',
                    textAlign: TextAlign.center,
                    style: TextStyle(fontSize: 16, color: Colors.white),
                  ),
                  const SizedBox(height: 24),
                  Image.asset('assets/images/delivery.png', height: 200),
                ],
              ),
            ),
            Container(
              width: double.infinity,
              constraints: const BoxConstraints(minHeight: 420),
              decoration: const BoxDecoration(
                image: DecorationImage(
                  image: AssetImage('assets/images/burger.png'),
                  fit: BoxFit.cover,
                ),
              ),
              child: Container(
                width: double.infinity,
                padding:
                    const EdgeInsets.symmetric(vertical: 48, horizontal: 24),
                color: Colors.white.withValues(alpha: 0.6),
                child: Column(
                  children: [
                    const Text(
                      'Come Order your favorite food from your favorite '
                      'burger spot and get it delivered to your doorstep.',
                      textAlign: TextAlign.center,
                      style: TextStyle(fontSize: 16),
                    ),
                    const SizedBox(height: 24),
                    ElevatedButton(
                      style: ElevatedButton.styleFrom(
                        shape: RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(32),
                        ),
                        minimumSize: const Size(220, 56),
                      ),
                      onPressed: () => Navigator.pushNamed(context, '/login'),
                      child: const Text('Get Started',
                          style: TextStyle(fontSize: 16)),
                    ),
                  ],
                ),
              ),
            ),
            const AppFooter(),
          ],
        ),
      ),
    );
  }
}
