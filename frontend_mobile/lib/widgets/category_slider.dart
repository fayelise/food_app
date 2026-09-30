import 'package:flutter/material.dart';

class _Category {
  final String name;
  final String asset;
  const _Category(this.name, this.asset);
}

const _categories = [
  _Category('All', 'assets/images/image.png'),
  _Category('Burger', 'assets/images/baconator.png'),
  _Category('Chicken', 'assets/images/mcchicken.png'),
  _Category('breakfast', 'assets/images/baconegg.png'),
  _Category('Fries', 'assets/images/largefries.png'),
  _Category('Drink', 'assets/images/strawberry.png'),
  _Category('Noodles', 'assets/images/noodles.png'),
  _Category('Pizza', 'assets/images/pepperonipizza.png'),
  _Category('tenders', 'assets/images/tenders.png'),
  _Category('dessert', 'assets/images/chocolatechipcookie.png'),
];

/// Horizontal scrollable category picker, mirrors CategorySlider.jsx.
class CategorySlider extends StatelessWidget {
  final String selectedCategory;
  final ValueChanged<String> onSelectCategory;

  const CategorySlider({
    super.key,
    required this.selectedCategory,
    required this.onSelectCategory,
  });

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      height: 110,
      child: ListView.separated(
        scrollDirection: Axis.horizontal,
        padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
        itemCount: _categories.length,
        separatorBuilder: (_, __) => const SizedBox(width: 12),
        itemBuilder: (context, index) {
          final cat = _categories[index];
          final isSelected =
              cat.name.toLowerCase() == selectedCategory.toLowerCase();
          return GestureDetector(
            onTap: () => onSelectCategory(cat.name),
            child: Container(
              width: 92,
              decoration: BoxDecoration(
                color: Colors.white,
                borderRadius: BorderRadius.circular(16),
                border: Border.all(
                  color: isSelected
                      ? Theme.of(context).colorScheme.primary
                      : Colors.grey.shade200,
                  width: isSelected ? 2 : 1,
                ),
                boxShadow: const [
                  BoxShadow(
                    color: Colors.black12,
                    blurRadius: 4,
                    offset: Offset(0, 2),
                  ),
                ],
              ),
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  SizedBox(
                    width: 48,
                    height: 48,
                    child: Image.asset(cat.asset, fit: BoxFit.contain),
                  ),
                  const SizedBox(height: 6),
                  Text(
                    cat.name.toUpperCase(),
                    style: const TextStyle(
                      fontSize: 10,
                      fontWeight: FontWeight.bold,
                      color: Colors.black87,
                    ),
                  ),
                ],
              ),
            ),
          );
        },
      ),
    );
  }
}
