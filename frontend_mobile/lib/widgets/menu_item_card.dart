import 'package:flutter/material.dart';

import '../config/api_config.dart';
import '../config/theme.dart';
import '../models/menu_item.dart';

/// Mirrors Card.jsx: image, name, description, price, and a
/// "View Details" button leading to the element/detail screen.
class MenuItemCard extends StatelessWidget {
  final MenuItem item;
  final VoidCallback onViewDetails;

  const MenuItemCard({
    super.key,
    required this.item,
    required this.onViewDetails,
  });

  @override
  Widget build(BuildContext context) {
    final imageUrl =
        item.image != null ? '${ApiConfig.fileUrl}${item.image}' : null;

    return Container(
      padding: const EdgeInsets.all(12),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(20),
        boxShadow: const [
          BoxShadow(color: Colors.black12, blurRadius: 10, offset: Offset(0, 4)),
        ],
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.center,
        children: [
          SizedBox(
            height: 100,
            child: imageUrl != null
                ? Image.network(
                    imageUrl,
                    fit: BoxFit.contain,
                    errorBuilder: (_, __, ___) =>
                        const Icon(Icons.fastfood, size: 56, color: Colors.grey),
                  )
                : const Icon(Icons.fastfood, size: 56, color: Colors.grey),
          ),
          const SizedBox(height: 8),
          Text(
            item.name,
            style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 15),
            textAlign: TextAlign.center,
            maxLines: 2,
            overflow: TextOverflow.ellipsis,
          ),
          const SizedBox(height: 4),
          Text(
            item.description,
            style: const TextStyle(fontSize: 12, color: Colors.black54),
            textAlign: TextAlign.center,
            maxLines: 2,
            overflow: TextOverflow.ellipsis,
          ),
          const SizedBox(height: 8),
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Text(
                '\$${item.price.toStringAsFixed(2)}',
                style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 16),
              ),
              const Text('4.5⭐', style: TextStyle(fontWeight: FontWeight.bold)),
            ],
          ),
          const SizedBox(height: 8),
          SizedBox(
            width: double.infinity,
            child: ElevatedButton(
              style: ElevatedButton.styleFrom(
                backgroundColor: AppColors.primary,
                padding: const EdgeInsets.symmetric(vertical: 10),
              ),
              onPressed: onViewDetails,
              child: const Text('View Details', style: TextStyle(fontSize: 13)),
            ),
          ),
        ],
      ),
    );
  }
}
