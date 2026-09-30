class OrderToppingRef {
  final int id;
  final String name;
  final double price;

  OrderToppingRef({required this.id, required this.name, required this.price});

  factory OrderToppingRef.fromJson(Map<String, dynamic> json) {
    final t = json['topping'] as Map<String, dynamic>;
    return OrderToppingRef(
      id: t['id'] as int,
      name: t['name'] as String,
      price: (t['price'] as num).toDouble(),
    );
  }
}

class OrderItemDetail {
  final int id;
  final String menuItemName;
  final double menuItemPrice;
  final int quantity;
  final List<OrderToppingRef> toppings;

  OrderItemDetail({
    required this.id,
    required this.menuItemName,
    required this.menuItemPrice,
    required this.quantity,
    required this.toppings,
  });

  double get toppingsTotal => toppings.fold(0, (sum, t) => sum + t.price);
  double get itemTotal => (menuItemPrice + toppingsTotal) * quantity;

  factory OrderItemDetail.fromJson(Map<String, dynamic> json) {
    final menuItem = json['menuItem'] as Map<String, dynamic>;
    return OrderItemDetail(
      id: json['id'] as int,
      menuItemName: menuItem['name'] as String,
      menuItemPrice: (menuItem['price'] as num).toDouble(),
      quantity: json['quantity'] as int,
      toppings: (json['toppings'] as List<dynamic>? ?? [])
          .map((t) => OrderToppingRef.fromJson(t as Map<String, dynamic>))
          .toList(),
    );
  }
}

class FoodOrder {
  final int id;
  final String status;
  final double total;
  final DateTime createdAt;
  final List<OrderItemDetail> items;

  FoodOrder({
    required this.id,
    required this.status,
    required this.total,
    required this.createdAt,
    required this.items,
  });

  factory FoodOrder.fromJson(Map<String, dynamic> json) {
    return FoodOrder(
      id: json['id'] as int,
      status: json['status'] as String? ?? 'pending',
      total: (json['total'] as num).toDouble(),
      createdAt: DateTime.tryParse(json['createdAt'] as String? ?? '') ??
          DateTime.now(),
      items: (json['items'] as List<dynamic>? ?? [])
          .map((i) => OrderItemDetail.fromJson(i as Map<String, dynamic>))
          .toList(),
    );
  }
}
