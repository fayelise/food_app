import 'dart:convert';
import 'package:http/http.dart' as http;

import '../config/api_config.dart';
import '../models/menu_item.dart';
import '../models/topping.dart';
import '../models/order.dart';
import '../models/cart_item.dart';

/// Thrown when the backend responds with a non-2xx status. Carries the
/// server's error message when available (matches `{ error: "..." }`
/// shape returned by the Express controllers).
class ApiException implements Exception {
  final String message;
  ApiException(this.message);
  @override
  String toString() => message;
}

class ApiService {
  static Uri _uri(String path) => Uri.parse('${ApiConfig.apiUrl}$path');

  static Future<Map<String, dynamic>> _decodeOrThrow(
      http.Response response) async {
    final body = response.body.isNotEmpty ? jsonDecode(response.body) : {};
    if (response.statusCode < 200 || response.statusCode >= 300) {
      final message = (body is Map && body['error'] != null)
          ? body['error'].toString()
          : 'Server error (${response.statusCode})';
      throw ApiException(message);
    }
    return body as Map<String, dynamic>;
  }

  // ---------------- Auth ----------------

  static Future<Map<String, dynamic>> register(
      String email, String password) async {
    final res = await http.post(
      _uri('/auth/register'),
      headers: {'Content-Type': 'application/json'},
      body: jsonEncode({'email': email, 'password': password}),
    );
    return _decodeOrThrow(res);
  }

  static Future<Map<String, dynamic>> login(
      String email, String password) async {
    final res = await http.post(
      _uri('/auth/login'),
      headers: {'Content-Type': 'application/json'},
      body: jsonEncode({'email': email, 'password': password}),
    );
    return _decodeOrThrow(res);
  }

  static Future<Map<String, dynamic>> me(String token) async {
    final res = await http.get(
      _uri('/auth/me'),
      headers: {'Authorization': 'Bearer $token'},
    );
    return _decodeOrThrow(res);
  }

  // ---------------- Menu ----------------

  static Future<List<MenuItem>> getMenu({String? category}) async {
    final path = (category == null || category.toLowerCase() == 'all')
        ? '/menu'
        : '/menu/category/${category.toLowerCase()}';
    final res = await http.get(_uri(path));
    if (res.statusCode != 200) {
      throw ApiException('Error fetching menu (${res.statusCode})');
    }
    final List<dynamic> list = jsonDecode(res.body);
    return list.map((e) => MenuItem.fromJson(e)).toList();
  }

  static Future<MenuItem> getMenuItemById(int id) async {
    final res = await http.get(_uri('/menu/$id'));
    final body = await _decodeOrThrow(res);
    return MenuItem.fromJson(body);
  }

  // ---------------- Toppings ----------------

  static Future<List<Topping>> getToppings() async {
    final res = await http.get(_uri('/topping'));
    if (res.statusCode != 200) {
      throw ApiException('Error fetching toppings (${res.statusCode})');
    }
    final List<dynamic> list = jsonDecode(res.body);
    return list.map((e) => Topping.fromJson(e)).toList();
  }

  // ---------------- Orders ----------------

  static Future<Map<String, dynamic>> createOrder({
    required int userId,
    required List<CartItem> items,
  }) async {
    final itemsPayload = items
        .map((item) => {
              'menuItemId': item.menuItemId,
              'quantity': item.quantity,
              'toppings': item.toppings.map((t) => {'id': t.id}).toList(),
            })
        .toList();

    final res = await http.post(
      _uri('/order/create'),
      headers: {'Content-Type': 'application/json'},
      body: jsonEncode({'userId': userId, 'items': itemsPayload}),
    );
    return _decodeOrThrow(res);
  }

  static Future<List<FoodOrder>> getUserOrders(int userId) async {
    final res = await http.get(_uri('/order/user/$userId'));
    if (res.statusCode != 200) {
      throw ApiException('Error fetching orders (${res.statusCode})');
    }
    final List<dynamic> list = jsonDecode(res.body);
    return list.map((e) => FoodOrder.fromJson(e)).toList();
  }
}
