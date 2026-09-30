import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import '../config/api_config.dart';
import '../config/theme.dart';
import '../models/cart_item.dart';
import '../models/menu_item.dart';
import '../models/topping.dart';
import '../providers/cart_provider.dart';
import '../services/api_service.dart';
import '../widgets/app_header.dart';

class ElementScreen extends StatefulWidget {
  final int menuItemId;

  const ElementScreen({super.key, required this.menuItemId});

  @override
  State<ElementScreen> createState() => _ElementScreenState();
}

class _ElementScreenState extends State<ElementScreen> {
  MenuItem? _menuItem;
  List<Topping> _toppings = [];
  int _quantity = 1;
  final List<Topping> _selectedToppings = [];
  bool _addedToCart = false;
  bool _loading = true;

  @override
  void initState() {
    super.initState();
    _load();
  }

  Future<void> _load() async {
    setState(() => _loading = true);
    try {
      final item = await ApiService.getMenuItemById(widget.menuItemId);
      setState(() => _menuItem = item);
      if (item.supportsToppings) {
        final toppings = await ApiService.getToppings();
        setState(() => _toppings = toppings);
      }
    } catch (_) {
      // Keep it simple: leave menuItem null, the UI shows a fallback.
    } finally {
      if (mounted) setState(() => _loading = false);
    }
  }

  int _toppingCount(int id) =>
      _selectedToppings.where((t) => t.id == id).length;

  void _addTopping(Topping topping) {
    setState(() => _selectedToppings.add(topping));
  }

  void _removeTopping(int id) {
    setState(() {
      final index = _selectedToppings.indexWhere((t) => t.id == id);
      if (index > -1) _selectedToppings.removeAt(index);
    });
  }

  void _handleAddToCart() {
    final item = _menuItem;
    if (item == null) return;
    context.read<CartProvider>().addToCart(
          CartItem.fromMenuItem(
            item,
            quantity: _quantity,
            toppings: List.of(_selectedToppings),
          ),
        );
    setState(() => _addedToCart = true);
    Future.delayed(const Duration(seconds: 2), () {
      if (mounted) setState(() => _addedToCart = false);
    });
  }

  @override
  Widget build(BuildContext context) {
    if (_loading) {
      return Scaffold(
        appBar: const AppHeader(),
        body: const Center(child: CircularProgressIndicator()),
      );
    }

    final item = _menuItem;
    if (item == null) {
      return Scaffold(
        appBar: const AppHeader(),
        body: const Center(child: Text('Item not found.')),
      );
    }

    final imageUrl =
        item.image != null ? '${ApiConfig.fileUrl}${item.image}' : null;

    return Scaffold(
      appBar: const AppHeader(),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(20),
        child: Container(
          padding: const EdgeInsets.all(20),
          decoration: BoxDecoration(
            color: Colors.white,
            borderRadius: BorderRadius.circular(24),
            boxShadow: const [
              BoxShadow(color: Colors.black12, blurRadius: 16),
            ],
          ),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Center(
                child: SizedBox(
                  height: 220,
                  child: imageUrl != null
                      ? Image.network(imageUrl, fit: BoxFit.contain)
                      : const Icon(Icons.fastfood, size: 96, color: Colors.grey),
                ),
              ),
              const SizedBox(height: 20),
              Row(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          item.name,
                          style: const TextStyle(
                              fontSize: 24, fontWeight: FontWeight.bold),
                        ),
                        const SizedBox(height: 8),
                        Text(
                          item.description,
                          style: const TextStyle(color: Colors.black54),
                        ),
                      ],
                    ),
                  ),
                  Text(
                    '\$${item.price.toStringAsFixed(2)}',
                    style: const TextStyle(
                      fontSize: 22,
                      fontWeight: FontWeight.w900,
                      color: AppColors.primary,
                    ),
                  ),
                ],
              ),
              const SizedBox(height: 20),
              Row(
                children: [
                  IconButton.filled(
                    style: IconButton.styleFrom(
                        backgroundColor: Colors.grey.shade200,
                        foregroundColor: Colors.black87),
                    onPressed: () =>
                        setState(() => _quantity = (_quantity - 1).clamp(1, 99)),
                    icon: const Icon(Icons.remove),
                  ),
                  SizedBox(
                    width: 44,
                    child: Text(
                      '$_quantity',
                      textAlign: TextAlign.center,
                      style: const TextStyle(
                          fontSize: 18, fontWeight: FontWeight.w600),
                    ),
                  ),
                  IconButton.filled(
                    style: IconButton.styleFrom(
                        backgroundColor: Colors.grey.shade200,
                        foregroundColor: Colors.black87),
                    onPressed: () => setState(() => _quantity++),
                    icon: const Icon(Icons.add),
                  ),
                ],
              ),
              if (item.supportsToppings && _toppings.isNotEmpty) ...[
                const Divider(height: 40),
                const Text('Toppings',
                    style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold)),
                const SizedBox(height: 12),
                SizedBox(
                  height: 140,
                  child: ListView.separated(
                    scrollDirection: Axis.horizontal,
                    itemCount: _toppings.length,
                    separatorBuilder: (_, __) => const SizedBox(width: 12),
                    itemBuilder: (context, index) {
                      final topping = _toppings[index];
                      final count = _toppingCount(topping.id);
                      final toppingImg =
                          '${ApiConfig.fileUrl}${topping.image}';
                      return Container(
                        width: 130,
                        decoration: BoxDecoration(
                          borderRadius: BorderRadius.circular(16),
                          border: Border.all(
                              color: AppColors.primary.withOpacity(0.3)),
                          boxShadow: const [
                            BoxShadow(color: Colors.black12, blurRadius: 6),
                          ],
                        ),
                        clipBehavior: Clip.antiAlias,
                        child: Column(
                          children: [
                            Container(
                              height: 70,
                              width: double.infinity,
                              color: Colors.white,
                              child: Image.network(toppingImg,
                                  fit: BoxFit.contain,
                                  errorBuilder: (_, __, ___) =>
                                      const Icon(Icons.local_pizza)),
                            ),
                            Container(
                              padding: const EdgeInsets.symmetric(
                                  horizontal: 8, vertical: 6),
                              color: const Color(0xFF3C2F2F),
                              child: Row(
                                mainAxisAlignment:
                                    MainAxisAlignment.spaceBetween,
                                children: [
                                  Expanded(
                                    child: Text(
                                      topping.name,
                                      style: const TextStyle(
                                          color: Colors.white, fontSize: 12),
                                      overflow: TextOverflow.ellipsis,
                                    ),
                                  ),
                                  Text(
                                    '\$${topping.price.toStringAsFixed(2)}',
                                    style: const TextStyle(
                                        color: Colors.white, fontSize: 11),
                                  ),
                                ],
                              ),
                            ),
                            const Spacer(),
                            Padding(
                              padding: const EdgeInsets.only(bottom: 6),
                              child: Row(
                                mainAxisAlignment: MainAxisAlignment.center,
                                children: [
                                  if (count > 0) ...[
                                    _RoundIconButton(
                                      icon: Icons.remove,
                                      background: Colors.grey.shade300,
                                      foreground: Colors.black87,
                                      onTap: () => _removeTopping(topping.id),
                                    ),
                                    const SizedBox(width: 6),
                                  ],
                                  _RoundIconButton(
                                    icon: count > 0 ? null : Icons.add,
                                    label: count > 0 ? '$count' : null,
                                    background: AppColors.primary,
                                    foreground: Colors.white,
                                    onTap: () => _addTopping(topping),
                                  ),
                                ],
                              ),
                            ),
                          ],
                        ),
                      );
                    },
                  ),
                ),
              ],
              const SizedBox(height: 24),
              SizedBox(
                width: double.infinity,
                height: 56,
                child: ElevatedButton.icon(
                  style: ElevatedButton.styleFrom(
                    backgroundColor:
                        _addedToCart ? AppColors.success : AppColors.primary,
                  ),
                  onPressed: _handleAddToCart,
                  icon: Icon(_addedToCart ? Icons.check : Icons.add_shopping_cart),
                  label: Text(_addedToCart ? 'Added!' : 'Add to cart'),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}

class _RoundIconButton extends StatelessWidget {
  final IconData? icon;
  final String? label;
  final Color background;
  final Color foreground;
  final VoidCallback onTap;

  const _RoundIconButton({
    this.icon,
    this.label,
    required this.background,
    required this.foreground,
    required this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    return InkWell(
      onTap: onTap,
      customBorder: const CircleBorder(),
      child: Container(
        width: 28,
        height: 28,
        decoration: BoxDecoration(color: background, shape: BoxShape.circle),
        alignment: Alignment.center,
        child: icon != null
            ? Icon(icon, size: 16, color: foreground)
            : Text(label ?? '',
                style: TextStyle(
                    color: foreground,
                    fontSize: 12,
                    fontWeight: FontWeight.bold)),
      ),
    );
  }
}
