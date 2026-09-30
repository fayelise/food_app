class Topping {
  final int id;
  final String name;
  final double price;
  final String image;

  Topping({
    required this.id,
    required this.name,
    required this.price,
    required this.image,
  });

  factory Topping.fromJson(Map<String, dynamic> json) {
    return Topping(
      id: json['id'] as int,
      name: json['name'] as String,
      price: (json['price'] as num).toDouble(),
      image: json['image'] as String? ?? '',
    );
  }

  Map<String, dynamic> toJson() => {'id': id, 'name': name, 'price': price};
}
