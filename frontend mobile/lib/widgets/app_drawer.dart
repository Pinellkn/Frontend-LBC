import 'package:flutter/material.dart';
import '../theme.dart';

class _NavEntry {
  final IconData icon;
  final IconData activeIcon;
  final String label;
  final int index;
  const _NavEntry(this.icon, this.activeIcon, this.label, this.index);
}

const _entries = [
  _NavEntry(Icons.home_outlined, Icons.home_rounded, "Accueil", 0),
  _NavEntry(Icons.apartment_outlined, Icons.apartment_rounded, "Entreprises", 1),
  _NavEntry(Icons.work_outline_rounded, Icons.work_rounded, "Emplois & stages", 2),
  _NavEntry(Icons.newspaper_outlined, Icons.newspaper_rounded, "Actualités", 3),
  _NavEntry(Icons.account_balance_outlined, Icons.account_balance_rounded, "Infos pratiques", 4),
  _NavEntry(Icons.person_outline_rounded, Icons.person_rounded, "Mon espace", 5),
];

/// Menu vertical ouvert via l'icône "hamburger" (3 traits) de chaque écran.
/// On choisit une section : le menu se referme puis la section s'affiche.
class AppDrawer extends StatelessWidget {
  final int selectedIndex;
  final ValueChanged<int> onSelect;
  const AppDrawer({super.key, required this.selectedIndex, required this.onSelect});

  @override
  Widget build(BuildContext context) {
    return Drawer(
      child: SafeArea(
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Container(
              width: double.infinity,
              padding: const EdgeInsets.fromLTRB(20, 24, 20, 20),
              decoration: const BoxDecoration(
                gradient: LinearGradient(
                  begin: Alignment.topLeft,
                  end: Alignment.bottomRight,
                  colors: [LbcColors.deep, LbcColors.medium],
                ),
              ),
              child: Row(
                children: [
                  Image.asset('assets/images/lbc-logo.png', height: 32),
                  const SizedBox(width: 10),
                  const Expanded(
                    child: Text(
                      "LBC Bénin",
                      style: TextStyle(
                        color: Colors.white,
                        fontWeight: FontWeight.w700,
                        fontSize: 17,
                      ),
                    ),
                  ),
                ],
              ),
            ),
            const SizedBox(height: 8),
            Expanded(
              child: ListView(
                padding: const EdgeInsets.symmetric(horizontal: 10),
                children: [
                  for (final e in _entries)
                    _DrawerItem(
                      entry: e,
                      selected: e.index == selectedIndex,
                      onTap: () {
                        Navigator.of(context).pop();
                        if (e.index != selectedIndex) onSelect(e.index);
                      },
                    ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}

class _DrawerItem extends StatelessWidget {
  final _NavEntry entry;
  final bool selected;
  final VoidCallback onTap;
  const _DrawerItem({required this.entry, required this.selected, required this.onTap});

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 3),
      child: Material(
        color: selected ? LbcColors.deep.withValues(alpha: 0.08) : Colors.transparent,
        borderRadius: BorderRadius.circular(12),
        child: InkWell(
          borderRadius: BorderRadius.circular(12),
          onTap: onTap,
          child: Padding(
            padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 13),
            child: Row(
              children: [
                Icon(
                  selected ? entry.activeIcon : entry.icon,
                  size: 22,
                  color: selected ? LbcColors.deep : LbcColors.steel,
                ),
                const SizedBox(width: 16),
                Expanded(
                  child: Text(
                    entry.label,
                    maxLines: 1,
                    overflow: TextOverflow.ellipsis,
                    style: TextStyle(
                      fontSize: 14.5,
                      fontWeight: selected ? FontWeight.w700 : FontWeight.w500,
                      color: selected ? LbcColors.deep : LbcColors.ink,
                    ),
                  ),
                ),
                if (selected)
                  const Icon(Icons.circle, size: 7, color: LbcColors.deep),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
