import 'package:flutter/material.dart';

import '../models/menu_item.dart';
import '../services/api_service.dart';
import '../widgets/app_header.dart';
import '../widgets/category_slider.dart';
import '../widgets/menu_item_card.dart';

class DashboardScreen extends StatefulWidget {
  const DashboardScreen({super.key});

  @override
  State<DashboardScreen> createState() => _DashboardScreenState();
}

class _DashboardScreenState extends State<DashboardScreen> {
  String _selectedCategory = 'All';
  List<MenuItem> _items = [];
  bool _loading = true;
  String? _error;

  @override
  void initState() {
    super.initState();
    _fetchMenu();
  }

  Future<void> _fetchMenu() async {
    setState(() {
      _loading = true;
      _error = null;
    });
    try {
      final items = await ApiService.getMenu(category: _selectedCategory);
      setState(() => _items = items);
    } on ApiException catch (e) {
      setState(() => _error = e.message);
    } catch (_) {
      setState(() => _error = 'Could not load the menu. Is the backend running?');
    } finally {
      setState(() => _loading = false);
    }
  }

  void _onSelectCategory(String category) {
    setState(() => _selectedCategory = category);
    _fetchMenu();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: const AppHeader(),
      body: RefreshIndicator(
        onRefresh: _fetchMenu,
        child: CustomScrollView(
          slivers: [
            SliverToBoxAdapter(
              child: CategorySlider(
                selectedCategory: _selectedCategory,
                onSelectCategory: _onSelectCategory,
              ),
            ),
            if (_loading)
              const SliverFillRemaining(
                child: Center(child: CircularProgressIndicator()),
              )
            else if (_error != null)
              SliverFillRemaining(
                child: Center(
                  child: Padding(
                    padding: const EdgeInsets.all(24),
                    child: Text(_error!, textAlign: TextAlign.center),
                  ),
                ),
              )
            else if (_items.isEmpty)
              const SliverFillRemaining(
                child: Center(child: Text('No items in this category yet.')),
              )
            else
              SliverPadding(
                padding: const EdgeInsets.all(16),
                sliver: SliverGrid(
                  gridDelegate:
                      const SliverGridDelegateWithFixedCrossAxisCount(
                    crossAxisCount: 2,
                    mainAxisSpacing: 16,
                    crossAxisSpacing: 16,
                    childAspectRatio: 0.56,
                  ),
                  delegate: SliverChildBuilderDelegate(
                    (context, index) {
                      final item = _items[index];
                      return MenuItemCard(
                        item: item,
                        onViewDetails: () => Navigator.pushNamed(
                          context,
                          '/element',
                          arguments: item.id,
                        ),
                      );
                    },
                    childCount: _items.length,
                  ),
                ),
              ),
          ],
        ),
      ),
    );
  }
}
