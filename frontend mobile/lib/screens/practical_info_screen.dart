import 'package:flutter/material.dart';
import '../data/lbc_data.dart';
import '../theme.dart';
import '../widgets/cards.dart';
import '../widgets/app_drawer.dart';
import 'practical_info_detail_screen.dart';

class PracticalInfoScreen extends StatefulWidget {
  final int selectedIndex;
  final ValueChanged<int> onSelectTab;
  const PracticalInfoScreen({super.key, required this.selectedIndex, required this.onSelectTab});

  @override
  State<PracticalInfoScreen> createState() => _PracticalInfoScreenState();
}

class _PracticalInfoScreenState extends State<PracticalInfoScreen> {
  String category = "Toutes";

  @override
  Widget build(BuildContext context) {
    final results = practicalInfos
        .where((p) => category == "Toutes" || p.category == category)
        .toList();

    return Scaffold(
      drawer: AppDrawer(selectedIndex: widget.selectedIndex, onSelect: widget.onSelectTab),
      appBar: AppBar(title: const Text("Infos pratiques")),
      body: Column(
        children: [
          SizedBox(
            height: 44,
            child: ListView(
              scrollDirection: Axis.horizontal,
              padding: const EdgeInsets.fromLTRB(16, 10, 16, 4),
              children: [
                for (final c in practicalCategories)
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
              padding: const EdgeInsets.fromLTRB(16, 0, 16, 12),
              itemCount: results.length,
              separatorBuilder: (_, __) => const SizedBox(height: 10),
              itemBuilder: (context, i) {
                final p = results[i];
                return PracticalInfoCard(
                  info: p,
                  onTap: () => Navigator.of(context).push(
                    MaterialPageRoute(
                      builder: (_) => PracticalInfoDetailScreen(info: p),
                    ),
                  ),
                );
              },
            ),
          ),
          const _AdminsFooter(),
        ],
      ),
    );
  }
}

class _AdminsFooter extends StatelessWidget {
  const _AdminsFooter();

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.fromLTRB(16, 0, 16, 16),
      child: OutlinedButton.icon(
        style: OutlinedButton.styleFrom(minimumSize: const Size.fromHeight(46)),
        onPressed: () => showModalBottomSheet(
          context: context,
          isScrollControlled: true,
          builder: (_) => const _AdminsSheet(),
        ),
        icon: const Icon(Icons.account_balance_outlined, size: 18),
        label: const Text("Administrations par commune"),
      ),
    );
  }
}

class _AdminsSheet extends StatelessWidget {
  const _AdminsSheet();

  @override
  Widget build(BuildContext context) {
    return DraggableScrollableSheet(
      initialChildSize: 0.6,
      maxChildSize: 0.9,
      expand: false,
      builder: (context, controller) => ListView(
        controller: controller,
        padding: const EdgeInsets.all(16),
        children: [
          const Text("Administrations par commune",
              style: TextStyle(fontWeight: FontWeight.w700, fontSize: 16)),
          const SizedBox(height: 12),
          for (final a in administrations)
            Padding(
              padding: const EdgeInsets.only(bottom: 12),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(a.name, style: const TextStyle(fontWeight: FontWeight.w700)),
                  Text("${a.commune} · ${a.domain}",
                      style: const TextStyle(fontSize: 12.5, color: LbcColors.steel)),
                  Text("${a.phone} · ${a.hours}",
                      style: const TextStyle(fontSize: 12.5, color: LbcColors.steel)),
                ],
              ),
            ),
        ],
      ),
    );
  }
}
