import 'dart:convert';
import 'package:flutter/foundation.dart';
import 'package:shared_preferences/shared_preferences.dart';

import '../models/cart_item.dart';

/// Mirrors CartContext.jsx: cart is kept in memory and persisted to
/// local storage per-user, so switching accounts on the same device
/// keeps carts separate. Call [loadForUser] on login and [clear] on
/// logout (see AuthProvider usage in main.dart / screens).
class CartProvider extends ChangeNotifier {
  List<CartItem> _cart = [];
  int? _userId;

  List<CartItem> get cart => List.unmodifiable(_cart);

  double get total => _cart.fold(0, (sum, item) => sum + item.lineTotal);

  int get itemCount => _cart.length;

  String _storageKey(int userId) => 'food_app_cart_$userId';

  Future<void> loadForUser(int? userId) async {
    _userId = userId;
    if (userId == null) {
      _cart = [];
      notifyListeners();
      return;
    }
    final prefs = await SharedPreferences.getInstance();
    final raw = prefs.getString(_storageKey(userId));
    if (raw != null) {
      final List<dynamic> list = jsonDecode(raw);
      _cart = list.map((e) => CartItem.fromJson(e)).toList();
    } else {
      _cart = [];
    }
    notifyListeners();
  }

  Future<void> _persist() async {
    if (_userId == null) return;
    final prefs = await SharedPreferences.getInstance();
    await prefs.setString(
      _storageKey(_userId!),
      jsonEncode(_cart.map((e) => e.toJson()).toList()),
    );
  }

  void addToCart(CartItem item) {
    _cart = [..._cart, item];
    notifyListeners();
    _persist();
  }

  void increaseQty(int index) {
    _cart[index].quantity += 1;
    notifyListeners();
    _persist();
  }

  void decreaseQty(int index) {
    if (_cart[index].quantity > 1) {
      _cart[index].quantity -= 1;
      notifyListeners();
      _persist();
    }
  }

  void removeItem(int index) {
    _cart = [..._cart]..removeAt(index);
    notifyListeners();
    _persist();
  }

  void clearCart() {
    _cart = [];
    notifyListeners();
    _persist();
  }
}
