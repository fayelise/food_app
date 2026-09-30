class MenuItem {
  final int id;
  final String name;
  final String description;
  final double price;
  final String category;
  final String? image;

  MenuItem({
    required this.id,
    required this.name,
    required this.description,
    required this.price,
    required this.category,
    this.image,
  });

  factory MenuItem.fromJson(Map<String, dynamic> json) {
    return MenuItem(
      id: json['id'] as int,
      name: json['name'] as String,
      description: json['description'] as String? ?? '',
      price: (json['price'] as num).toDouble(),
      category: json['category'] as String? ?? '',
      image: json['image'] as String?,
    );
  }

  /// Categories that support toppings, mirrors TOPPING_CATEGORIES in the
  /// original React Element.jsx page.
  static const toppingCategories = ['burger', 'chicken', 'pizza'];

  bool get supportsToppings =>
      toppingCategories.contains(category.toLowerCase());
}
