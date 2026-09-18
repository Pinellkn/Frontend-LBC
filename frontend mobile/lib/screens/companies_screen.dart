import 'package:flutter/material.dart';
import '../data/lbc_data.dart';
import '../theme.dart';
import '../widgets/cards.dart';
import '../widgets/app_drawer.dart';
import 'company_detail_screen.dart';

class CompaniesScreen extends StatefulWidget {
  final int selectedIndex;
  final ValueChanged<int> onSelectTab;
  const CompaniesScreen({super.key, required this.selectedIndex, required this.onSelectTab});

  @override
  State<CompaniesScreen> createState() => _CompaniesScreenState();
}

class _CompaniesScreenState extends State<CompaniesScreen> {
  String query = "";
  String? sectorFilter;
  String? communeFilter;

  @override
  Widget build(BuildContext context) {
    final results = companies.where((c) {
      final matchesQuery = query.isEmpty ||
          c.name.toLowerCase().contains(query.toLowerCase()) ||
          c.sector.toLowerCase().contains(query.toLowerCase());
      final matchesSector = sectorFilter == null || c.sector == sectorFilter;
      final matchesCommune = communeFilter == null || c.commune == communeFilter;
      return matchesQuery && matchesSector && matchesCommune;
    }).toList();

    return Scaffold(
      drawer: AppDrawer(selectedIndex: widget.selectedIndex, onSelect: widget.onSelectTab),
      appBar: AppBar(title: const Text("Entreprises")),
      body: Column(
        children: [
          Padding(
            padding: const EdgeInsets.fromLTRB(16, 12, 16, 8),
            child: TextField(
              decoration: const InputDecoration(
                hintText: "Nom, secteur, commune…",
                prefixIcon: Icon(Icons.search_rounded),
              ),
              onChanged: (v) => setState(() => query = v),
            ),
          ),
          SizedBox(
            height: 40,
            child: ListView(
              scrollDirection: Axis.horizontal,
              padding: const EdgeInsets.symmetric(horizontal: 16),
              children: [
                _FilterChip(
                  label: "Toutes communes",
                  selected: communeFilter == null,
                  onTap: () => setState(() => communeFilter = null),
                ),
                for (final c in communes)
                  Padding(
                    padding: const EdgeInsets.only(left: 8),
                    child: _FilterChip(
                      label: c,
                      selected: communeFilter == c,
                      onTap: () => setState(
                          () => communeFilter = communeFilter == c ? null : c),
                    ),
                  ),
              ],
            ),
          ),
          const SizedBox(height: 8),
          Expanded(
            child: results.isEmpty
                ? const Center(
                    child: Text(
                      "Aucune entreprise ne correspond à votre recherche.",
                      style: TextStyle(color: LbcColors.steel),
                    ),
                  )
                : ListView.separated(
                    padding: const EdgeInsets.fromLTRB(16, 0, 16, 24),
                    itemCount: results.length,
                    separatorBuilder: (_, __) => const SizedBox(height: 12),
                    itemBuilder: (context, i) {
                      final c = results[i];
                      return CompanyCard(
                        company: c,
                        onTap: () => Navigator.of(context).push(
                          MaterialPageRoute(
                            builder: (_) => CompanyDetailScreen(company: c),
                          ),
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

class _FilterChip extends StatelessWidget {
  final String label;
  final bool selected;
  final VoidCallback onTap;
  const _FilterChip({
    required this.label,
    required this.selected,
    required this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    return ChoiceChip(
      label: Text(label),
      selected: selected,
      onSelected: (_) => onTap(),
      selectedColor: LbcColors.deep,
      labelStyle: TextStyle(
        color: selected ? Colors.white : LbcColors.ink,
        fontSize: 12.5,
        fontWeight: FontWeight.w600,
      ),
      backgroundColor: Colors.white,
      side: const BorderSide(color: LbcColors.border),
    );
  }
}
