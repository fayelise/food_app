import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import '../config/api_config.dart';
import '../config/theme.dart';
import '../providers/auth_provider.dart';
import '../providers/cart_provider.dart';
import '../services/api_service.dart';
import '../widgets/app_header.dart';

const Map<String, List<String>> _dakarDepartments = {
  'Dakar': [
    'Plateau', 'Médina', 'Fann-Point E-Amitié', 'Gueule Tapée-Fass-Colobane',
    'Grand Dakar', 'Parcelles Assainies', 'HLM', 'Ngor', 'Ouakam', 'Yoff',
    'Mermoz-Sacré-Cœur', 'Liberté', 'Dieuppeul-Derklé',
  ],
  'Pikine': [
    'Pikine Est', 'Pikine Ouest', 'Pikine Nord', 'Dagoudane Pikine',
    'Thiaroye', 'Diamaguène Sicap Mbao', 'Mbao',
  ],
  'Rufisque': [
    'Rufisque Est', 'Rufisque Ouest', 'Rufisque Nord', 'Bargny', 'Sendou',
    'Sébikotane',
  ],
  'Guediawaye': [
    'Golf Sud', 'Médina Gounass', 'Ndiarème Limamoulaye', 'Sam Notaire',
    'Wakhinane Nimzatt',
  ],
};

class CartScreen extends StatelessWidget {
  const CartScreen({super.key});

  Future<void> _openCheckout(BuildContext context) async {
    final cart = context.read<CartProvider>();
    final auth = context.read<AuthProvider>();

    await showDialog(
      context: context,
      builder: (dialogContext) => _CheckoutDialog(
        total: cart.total,
        onConfirm: () async {
          Navigator.of(dialogContext).pop();
          final userId = auth.user?.id;
          if (userId != null) {
            try {
              await ApiService.createOrder(userId: userId, items: cart.cart);
            } catch (_) {
              // Order confirmation UX still shown even if the network call
              // fails, mirroring the original app's fire-and-forget flow;
              // the important thing here is not blocking the user.
            }
          }
          final total = cart.total;
          cart.clearCart();
          if (context.mounted) {
            _showOrderConfirmed(context, total, auth.user?.displayName ?? '');
          }
        },
      ),
    );
  }

  void _showOrderConfirmed(BuildContext context, double total, String name) {
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
        content: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            const Icon(Icons.check_circle, color: AppColors.success, size: 48),
            const SizedBox(height: 12),
            const Text('Order Confirmed',
                style: TextStyle(
                    fontSize: 20,
                    fontWeight: FontWeight.bold,
                    color: AppColors.success)),
            const SizedBox(height: 8),
            Text('Hi $name, your order is being prepared.'),
            const SizedBox(height: 4),
            Text('Total: \$${total.toStringAsFixed(2)}',
                style: const TextStyle(fontSize: 16)),
            const SizedBox(height: 8),
            const Text('Estimated delivery: 20 - 30 minutes',
                style: TextStyle(color: Colors.black54)),
          ],
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.of(context).pop(),
            child: const Text('Close'),
          ),
        ],
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    final cart = context.watch<CartProvider>();

    return Scaffold(
      appBar: const AppHeader(),
      body: Column(
        children: [
          Padding(
            padding: const EdgeInsets.all(16),
            child: Text('Your Cart',
                style: TextStyle(
                    fontSize: 24,
                    fontWeight: FontWeight.bold,
                    color: AppColors.primary)),
          ),
          Expanded(
            child: cart.cart.isEmpty
                ? const Center(child: Text('Your cart is empty.'))
                : ListView.builder(
                    padding: const EdgeInsets.symmetric(horizontal: 16),
                    itemCount: cart.cart.length,
                    itemBuilder: (context, index) {
                      final item = cart.cart[index];
                      final imageUrl = item.image != null
                          ? '${ApiConfig.fileUrl}${item.image}'
                          : null;
                      return Container(
                        margin: const EdgeInsets.only(bottom: 12),
                        padding: const EdgeInsets.all(12),
                        decoration: BoxDecoration(
                          border: Border.all(color: Colors.grey.shade300),
                          borderRadius: BorderRadius.circular(12),
                        ),
                        child: Row(
                          children: [
                            SizedBox(
                              width: 64,
                              height: 64,
                              child: imageUrl != null
                                  ? Image.network(imageUrl, fit: BoxFit.cover)
                                  : const Icon(Icons.fastfood),
                            ),
                            const SizedBox(width: 12),
                            Expanded(
                              child: Column(
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                  Text(item.name,
                                      style: const TextStyle(
                                          fontWeight: FontWeight.w600)),
                                  if (item.toppings.isNotEmpty)
                                    Text(
                                      'Toppings: ${item.toppings.map((t) => t.name).join(", ")}',
                                      style: const TextStyle(
                                          fontSize: 11, color: Colors.black54),
                                    ),
                                  const SizedBox(height: 6),
                                  Container(
                                    decoration: BoxDecoration(
                                      color: AppColors.primary,
                                      borderRadius: BorderRadius.circular(8),
                                    ),
                                    padding: const EdgeInsets.symmetric(
                                        horizontal: 8, vertical: 2),
                                    child: Row(
                                      mainAxisSize: MainAxisSize.min,
                                      children: [
                                        IconButton(
                                          padding: EdgeInsets.zero,
                                          constraints: const BoxConstraints(),
                                          icon: const Icon(Icons.remove,
                                              color: Colors.white, size: 16),
                                          onPressed: () => context
                                              .read<CartProvider>()
                                              .decreaseQty(index),
                                        ),
                                        const SizedBox(width: 8),
                                        Text('${item.quantity}',
                                            style: const TextStyle(
                                                color: Colors.white)),
                                        const SizedBox(width: 8),
                                        IconButton(
                                          padding: EdgeInsets.zero,
                                          constraints: const BoxConstraints(),
                                          icon: const Icon(Icons.add,
                                              color: Colors.white, size: 16),
                                          onPressed: () => context
                                              .read<CartProvider>()
                                              .increaseQty(index),
                                        ),
                                      ],
                                    ),
                                  ),
                                ],
                              ),
                            ),
                            IconButton(
                              icon: const Icon(Icons.delete_outline,
                                  color: Colors.red),
                              onPressed: () => context
                                  .read<CartProvider>()
                                  .removeItem(index),
                            ),
                          ],
                        ),
                      );
                    },
                  ),
          ),
          Padding(
            padding: const EdgeInsets.all(16),
            child: SizedBox(
              width: double.infinity,
              child: ElevatedButton(
                style: ElevatedButton.styleFrom(
                  backgroundColor:
                      cart.cart.isEmpty ? Colors.grey.shade400 : AppColors.primary,
                ),
                onPressed:
                    cart.cart.isEmpty ? null : () => _openCheckout(context),
                child: Text(
                    'Checkout — \$${cart.total.toStringAsFixed(2)}'),
              ),
            ),
          ),
        ],
      ),
    );
  }
}

class _CheckoutDialog extends StatefulWidget {
  final double total;
  final VoidCallback onConfirm;

  const _CheckoutDialog({required this.total, required this.onConfirm});

  @override
  State<_CheckoutDialog> createState() => _CheckoutDialogState();
}

class _CheckoutDialogState extends State<_CheckoutDialog> {
  String? _department;
  String? _neighborhood;
  final _streetController = TextEditingController();
  final _houseNumberController = TextEditingController();
  final _phoneController = TextEditingController();

  @override
  void dispose() {
    _streetController.dispose();
    _houseNumberController.dispose();
    _phoneController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final neighborhoods = _dakarDepartments[_department] ?? [];

    return AlertDialog(
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
      title: const Text('Checkout', textAlign: TextAlign.center),
      content: SingleChildScrollView(
        child: Column(
          mainAxisSize: MainAxisSize.min,
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            DropdownButtonFormField<String>(
              value: _department,
              decoration: const InputDecoration(hintText: 'Choose your department'),
              items: _dakarDepartments.keys
                  .map((d) => DropdownMenuItem(value: d, child: Text(d)))
                  .toList(),
              onChanged: (value) => setState(() {
                _department = value;
                _neighborhood = null;
              }),
            ),
            const SizedBox(height: 12),
            DropdownButtonFormField<String>(
              value: _neighborhood,
              decoration: InputDecoration(
                hintText: _department == null
                    ? 'Select a department first'
                    : 'Choose your neighborhood',
              ),
              items: neighborhoods
                  .map((n) => DropdownMenuItem(value: n, child: Text(n)))
                  .toList(),
              onChanged: _department == null
                  ? null
                  : (value) => setState(() => _neighborhood = value),
            ),
            const SizedBox(height: 12),
            TextField(
              controller: _streetController,
              decoration: const InputDecoration(hintText: 'Choose your street'),
            ),
            const SizedBox(height: 12),
            TextField(
              controller: _houseNumberController,
              decoration:
                  const InputDecoration(hintText: 'Enter your house number'),
            ),
            const SizedBox(height: 12),
            TextField(
              controller: _phoneController,
              keyboardType: TextInputType.phone,
              decoration:
                  const InputDecoration(hintText: 'Enter your phone number'),
            ),
            const SizedBox(height: 16),
            Text('Total: \$${widget.total.toStringAsFixed(2)}',
                style: const TextStyle(fontSize: 16, fontWeight: FontWeight.w600)),
          ],
        ),
      ),
      actions: [
        TextButton(
          onPressed: () => Navigator.of(context).pop(),
          child: const Text('Cancel'),
        ),
        ElevatedButton(
          style: ElevatedButton.styleFrom(backgroundColor: AppColors.primary),
          onPressed: widget.onConfirm,
          child: const Text('Confirm'),
        ),
      ],
    );
  }
}
