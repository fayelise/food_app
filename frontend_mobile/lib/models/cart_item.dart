import 'menu_item.dart';
import 'topping.dart';

class CartItem {
  final int menuItemId;
  final String name;
  final double price;
  final String? image;
  int quantity;
  final List<Topping> toppings;

  CartItem({
    required this.menuItemId,
    required this.name,
    required this.price,
    this.image,
    required this.quantity,
    List<Topping>? toppings,
  }) : toppings = toppings ?? [];

  factory CartItem.fromMenuItem(
    MenuItem item, {
    required int quantity,
    required List<Topping> toppings,
  }) {
    return CartItem(
      menuItemId: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      quantity: quantity,
      toppings: toppings,
    );
  }

  double get toppingsTotal => toppings.fold(0, (sum, t) => sum + t.price);

  double get lineTotal => (price + toppingsTotal) * quantity;

  // --- Persistence (mirrors the localStorage cart in CartContext.jsx) ---

  Map<String, dynamic> toJson() => {
        'menuItemId': menuItemId,
        'name': name,
        'price': price,
        'image': image,
        'quantity': quantity,
        'toppings': toppings.map((t) => t.toJson()).toList(),
      };

  factory CartItem.fromJson(Map<String, dynamic> json) {
    return CartItem(
      menuItemId: json['menuItemId'] as int,
      name: json['name'] as String,
      price: (json['price'] as num).toDouble(),
      image: json['image'] as String?,
      quantity: json['quantity'] as int,
      toppings: (json['toppings'] as List<dynamic>? ?? [])
          .map((t) => Topping(
                id: t['id'] as int,
                name: t['name'] as String? ?? '',
                price: (t['price'] as num?)?.toDouble() ?? 0,
                image: '',
              ))
          .toList(),
    );
  }
}
