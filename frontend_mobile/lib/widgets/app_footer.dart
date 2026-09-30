import 'package:flutter/material.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';

/// Mirrors Footer.jsx: logo + brand name, contact info, social links.
class AppFooter extends StatelessWidget {
  const AppFooter({super.key});

  @override
  Widget build(BuildContext context) {
    return Container(
      width: double.infinity,
      padding: const EdgeInsets.all(24),
      decoration: const BoxDecoration(
        color: Colors.white,
        boxShadow: [BoxShadow(color: Colors.black26, blurRadius: 4)],
      ),
      child: Column(
        children: [
          Wrap(
            alignment: WrapAlignment.spaceBetween,
            runSpacing: 24,
            spacing: 24,
            children: [
              Row(
                mainAxisSize: MainAxisSize.min,
                children: [
                  Image.asset('assets/images/logo.png', height: 48),
                  const SizedBox(width: 8),
                  const Text('Kayy Thiopp',
                      style: TextStyle(
                          fontSize: 22, fontWeight: FontWeight.bold)),
                ],
              ),
              Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: const [
                  Text('Contact Us',
                      style: TextStyle(
                          fontSize: 18, fontWeight: FontWeight.bold)),
                  SizedBox(height: 8),
                  Text('Email: info@foodieapp.com'),
                  Text('Phone: +221 77 698 14 11'),
                ],
              ),
              Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  const Text('Follow Us',
                      style: TextStyle(
                          fontSize: 18, fontWeight: FontWeight.bold)),
                  const SizedBox(height: 12),
                  Row(
                    mainAxisSize: MainAxisSize.min,
                    children: const [
                      FaIcon(FontAwesomeIcons.facebook, size: 28),
                      SizedBox(width: 16),
                      FaIcon(FontAwesomeIcons.twitter, size: 28),
                      SizedBox(width: 16),
                      FaIcon(FontAwesomeIcons.instagram, size: 28),
                      SizedBox(width: 16),
                      FaIcon(FontAwesomeIcons.tiktok, size: 28),
                    ],
                  ),
                ],
              ),
            ],
          ),
          const SizedBox(height: 16),
          const Text('© 2026 Foodie App.', style: TextStyle(fontSize: 12)),
        ],
      ),
    );
  }
}
