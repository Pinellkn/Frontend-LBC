import 'package:flutter/material.dart';
import '../data/models.dart';
import '../theme.dart';
import '../widgets/cards.dart';

class NewsDetailScreen extends StatelessWidget {
  final NewsItem news;
  const NewsDetailScreen({super.key, required this.news});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text(news.category)),
      body: ListView(
        padding: const EdgeInsets.all(16),
        children: [
          Row(
            children: [
              TypeChip(label: news.sourceType),
              const SizedBox(width: 8),
              Expanded(
                child: Text(
                  news.source,
                  style: const TextStyle(fontWeight: FontWeight.w700, fontSize: 13),
                ),
              ),
            ],
          ),
          const SizedBox(height: 10),
          Text(news.title, style: Theme.of(context).textTheme.titleLarge),
          const SizedBox(height: 6),
          Text(
            "${news.date} · ${news.time}",
            style: const TextStyle(color: LbcColors.steel, fontSize: 12.5),
          ),
          const SizedBox(height: 18),
          ...news.body.map(
            (p) => Padding(
              padding: const EdgeInsets.only(bottom: 14),
              child: Text(p, style: const TextStyle(fontSize: 14, height: 1.6)),
            ),
          ),
        ],
      ),
    );
  }
}
