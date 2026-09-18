import 'package:flutter/material.dart';
import '../data/lbc_data.dart';
import '../theme.dart';
import '../widgets/cards.dart';
import '../widgets/app_drawer.dart';
import 'company_detail_screen.dart';
import 'job_detail_screen.dart';
import 'news_detail_screen.dart';

class HomeScreen extends StatelessWidget {
  final ValueChanged<int> onNavigate;
  final int selectedIndex;
  final ValueChanged<int> onSelectTab;
  const HomeScreen({
    super.key,
    required this.onNavigate,
    required this.selectedIndex,
    required this.onSelectTab,
  });

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      drawer: AppDrawer(selectedIndex: selectedIndex, onSelect: onSelectTab),
      appBar: AppBar(
        title: Row(
          children: [
            Image.asset('assets/images/lbc-logo.png', height: 28),
            const SizedBox(width: 8),
            const Text("LBC Bénin"),
          ],
        ),
      ),
      body: ListView(
        padding: const EdgeInsets.fromLTRB(16, 12, 16, 32),
        children: [
          _Hero(onNavigate: onNavigate),
          const SizedBox(height: 20),
          _ModulesGrid(onNavigate: onNavigate),
          SectionHeader(
            title: "Entreprises à la une",
            action: "Voir tout",
            onAction: () => onNavigate(1),
          ),
          ...featuredCompanies.map(
            (c) => Padding(
              padding: const EdgeInsets.only(bottom: 12),
              child: CompanyCard(
                company: c,
                onTap: () => Navigator.of(context).push(
                  MaterialPageRoute(builder: (_) => CompanyDetailScreen(company: c)),
                ),
              ),
            ),
          ),
          SectionHeader(
            title: "Dernières opportunités",
            action: "Voir tout",
            onAction: () => onNavigate(2),
          ),
          ...opportunities.take(3).map(
                (o) => Padding(
                  padding: const EdgeInsets.only(bottom: 12),
                  child: JobCard(
                    job: o,
                    onTap: () => Navigator.of(context).push(
                      MaterialPageRoute(builder: (_) => JobDetailScreen(job: o)),
                    ),
                  ),
                ),
              ),
          SectionHeader(
            title: "Actualités du jour",
            action: "Voir tout",
            onAction: () => onNavigate(3),
          ),
          ...newsFeed.take(3).map(
                (n) => Padding(
                  padding: const EdgeInsets.only(bottom: 12),
                  child: NewsCard(
                    news: n,
                    onTap: () => Navigator.of(context).push(
                      MaterialPageRoute(builder: (_) => NewsDetailScreen(news: n)),
                    ),
                  ),
                ),
              ),
          const SizedBox(height: 8),
          _ImpactSection(),
        ],
      ),
    );
  }
}

class _Hero extends StatelessWidget {
  final ValueChanged<int> onNavigate;
  const _Hero({required this.onNavigate});

  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(24),
        gradient: const LinearGradient(
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
          colors: [LbcColors.deep, LbcColors.medium],
        ),
      ),
      clipBehavior: Clip.antiAlias,
      child: Stack(
        children: [
          Positioned.fill(
            child: Opacity(
              opacity: 0.22,
              child: Image.asset(
                'assets/images/lbc-hero-benin.jpg',
                fit: BoxFit.cover,
              ),
            ),
          ),
          Padding(
            padding: const EdgeInsets.all(20),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                const Text(
                  "L'annuaire économique et pratique du Bénin",
                  style: TextStyle(
                    color: Colors.white,
                    fontSize: 21,
                    fontWeight: FontWeight.w700,
                    height: 1.25,
                  ),
                ),
                const SizedBox(height: 8),
                const Text(
                  "Entreprises vérifiées, emplois, actualités et démarches administratives, au même endroit.",
                  style: TextStyle(color: Colors.white70, fontSize: 13.5, height: 1.4),
                ),
                const SizedBox(height: 16),
                Wrap(
                  spacing: 10,
                  runSpacing: 10,
                  children: [
                    ElevatedButton.icon(
                      style: ElevatedButton.styleFrom(
                        backgroundColor: Colors.white,
                        foregroundColor: LbcColors.deep,
                      ),
                      onPressed: () => onNavigate(1),
                      icon: const Icon(Icons.search_rounded, size: 18),
                      label: const Text("Explorer"),
                    ),
                    OutlinedButton.icon(
                      style: OutlinedButton.styleFrom(
                        foregroundColor: Colors.white,
                        side: const BorderSide(color: Colors.white54),
                      ),
                      onPressed: () => onNavigate(5),
                      icon: const Icon(Icons.auto_awesome_rounded, size: 18),
                      label: const Text("Assistant IA"),
                    ),
                  ],
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}

class _ModulesGrid extends StatelessWidget {
  final ValueChanged<int> onNavigate;
  const _ModulesGrid({required this.onNavigate});

  @override
  Widget build(BuildContext context) {
    return GridView.count(
      crossAxisCount: 2,
      shrinkWrap: true,
      physics: const NeverScrollableScrollPhysics(),
      mainAxisSpacing: 12,
      crossAxisSpacing: 12,
      childAspectRatio: 1.05,
      children: lbcModules
          .map(
            (m) => InkWell(
              borderRadius: BorderRadius.circular(18),
              onTap: () => onNavigate(m.tabIndex),
              child: Container(
                padding: const EdgeInsets.all(14),
                decoration: BoxDecoration(
                  color: Colors.white,
                  borderRadius: BorderRadius.circular(18),
                  border: Border.all(color: LbcColors.border),
                ),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Container(
                      width: 36,
                      height: 36,
                      decoration: BoxDecoration(
                        color: LbcColors.deep.withValues(alpha: 0.08),
                        borderRadius: BorderRadius.circular(10),
                      ),
                      alignment: Alignment.center,
                      child: Icon(m.icon, color: LbcColors.deep, size: 19),
                    ),
                    const Spacer(),
                    Text(m.title,
                        maxLines: 1,
                        overflow: TextOverflow.ellipsis,
                        style: const TextStyle(fontWeight: FontWeight.w700, fontSize: 14)),
                    const SizedBox(height: 2),
                    Text(m.signal,
                        maxLines: 2,
                        overflow: TextOverflow.ellipsis,
                        style: const TextStyle(color: LbcColors.steel, fontSize: 11.5, height: 1.25)),
                  ],
                ),
              ),
            ),
          )
          .toList(),
    );
  }
}

class _ImpactSection extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        const SectionHeader(title: "Ce que LBC change au quotidien"),
        ...impactCards.map(
          (c) => Padding(
            padding: const EdgeInsets.only(bottom: 10),
            child: Container(
              padding: const EdgeInsets.all(14),
              decoration: BoxDecoration(
                color: Colors.white,
                borderRadius: BorderRadius.circular(16),
                border: Border.all(color: LbcColors.border),
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(c["title"]!,
                      style: const TextStyle(fontWeight: FontWeight.w700, fontSize: 13.5)),
                  const SizedBox(height: 4),
                  Text(c["text"]!,
                      style: const TextStyle(color: LbcColors.steel, fontSize: 12.5, height: 1.4)),
                ],
              ),
            ),
          ),
        ),
      ],
    );
  }
}
