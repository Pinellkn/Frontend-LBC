import 'package:flutter/material.dart';
import '../data/lbc_data.dart';
import '../theme.dart';
import '../widgets/cards.dart';
import '../widgets/app_drawer.dart';
import 'job_detail_screen.dart';

class JobsScreen extends StatefulWidget {
  final int selectedIndex;
  final ValueChanged<int> onSelectTab;
  const JobsScreen({super.key, required this.selectedIndex, required this.onSelectTab});

  @override
  State<JobsScreen> createState() => _JobsScreenState();
}

class _JobsScreenState extends State<JobsScreen> {
  String query = "";
  String? typeFilter;

  @override
  Widget build(BuildContext context) {
    final results = opportunities.where((o) {
      final matchesQuery = query.isEmpty ||
          o.title.toLowerCase().contains(query.toLowerCase()) ||
          o.company.toLowerCase().contains(query.toLowerCase());
      final matchesType = typeFilter == null || o.type == typeFilter;
      return matchesQuery && matchesType;
    }).toList();

    return Scaffold(
      drawer: AppDrawer(selectedIndex: widget.selectedIndex, onSelect: widget.onSelectTab),
      appBar: AppBar(title: const Text("Emplois & stages")),
      body: Column(
        children: [
          Padding(
            padding: const EdgeInsets.fromLTRB(16, 12, 16, 8),
            child: TextField(
              decoration: const InputDecoration(
                hintText: "Intitulé, entreprise…",
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
                ChoiceChip(
                  label: const Text("Tous types"),
                  selected: typeFilter == null,
                  onSelected: (_) => setState(() => typeFilter = null),
                  backgroundColor: Colors.white,
                  selectedColor: LbcColors.deep,
                  labelStyle: TextStyle(
                    color: typeFilter == null ? Colors.white : LbcColors.ink,
                    fontSize: 12.5,
                  ),
                  side: const BorderSide(color: LbcColors.border),
                ),
                for (final t in opportunityTypes)
                  Padding(
                    padding: const EdgeInsets.only(left: 8),
                    child: ChoiceChip(
                      label: Text(t),
                      selected: typeFilter == t,
                      onSelected: (_) =>
                          setState(() => typeFilter = typeFilter == t ? null : t),
                      backgroundColor: Colors.white,
                      selectedColor: LbcColors.deep,
                      labelStyle: TextStyle(
                        color: typeFilter == t ? Colors.white : LbcColors.ink,
                        fontSize: 12.5,
                      ),
                      side: const BorderSide(color: LbcColors.border),
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
                      "Aucune opportunité ne correspond à votre recherche.",
                      style: TextStyle(color: LbcColors.steel),
                    ),
                  )
                : ListView.separated(
                    padding: const EdgeInsets.fromLTRB(16, 0, 16, 24),
                    itemCount: results.length,
                    separatorBuilder: (_, __) => const SizedBox(height: 12),
                    itemBuilder: (context, i) {
                      final o = results[i];
                      return JobCard(
                        job: o,
                        onTap: () => Navigator.of(context).push(
                          MaterialPageRoute(builder: (_) => JobDetailScreen(job: o)),
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
