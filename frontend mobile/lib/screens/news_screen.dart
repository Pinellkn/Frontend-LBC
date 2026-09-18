import 'package:flutter/material.dart';
import '../data/lbc_data.dart';
import '../theme.dart';
import '../widgets/cards.dart';
import '../widgets/app_drawer.dart';
import 'news_detail_screen.dart';

class NewsScreen extends StatefulWidget {
  final int selectedIndex;
  final ValueChanged<int> onSelectTab;
  const NewsScreen({super.key, required this.selectedIndex, required this.onSelectTab});

  @override
  State<NewsScreen> createState() => _NewsScreenState();
}

class _NewsScreenState extends State<NewsScreen> {
  String category = "Toutes";

  @override
  Widget build(BuildContext context) {
    final results = newsFeed
        .where((n) => category == "Toutes" || n.category == category)
        .toList();

    return Scaffold(
      drawer: AppDrawer(selectedIndex: widget.selectedIndex, onSelect: widget.onSelectTab),
      appBar: AppBar(title: const Text("Actualités")),
      body: Column(
        children: [
          SizedBox(
            height: 44,
            child: ListView(
              scrollDirection: Axis.horizontal,
              padding: const EdgeInsets.fromLTRB(16, 10, 16, 4),
              children: [
                for (final c in newsCategories)
                  Padding(
                    padding: const EdgeInsets.only(right: 8),
                    child: ChoiceChip(
                      label: Text(c),
                      selected: category == c,
                      onSelected: (_) => setState(() => category = c),
                      backgroundColor: Colors.white,
                      selectedColor: LbcColors.deep,
                      labelStyle: TextStyle(
                        color: category == c ? Colors.white : LbcColors.ink,
                        fontSize: 12.5,
                      ),
                      side: const BorderSide(color: LbcColors.border),
                    ),
                  ),
              ],
            ),
          ),
          const SizedBox(height: 6),
          Expanded(
            child: ListView.separated(
              padding: const EdgeInsets.fromLTRB(16, 0, 16, 24),
              itemCount: results.length,
              separatorBuilder: (_, __) => const SizedBox(height: 12),
              itemBuilder: (context, i) {
                final n = results[i];
                return NewsCard(
                  news: n,
                  onTap: () => Navigator.of(context).push(
                    MaterialPageRoute(builder: (_) => NewsDetailScreen(news: n)),
                  ),
                );
              },
            ),
          ),
        ],
      ),
    );
  }
}
