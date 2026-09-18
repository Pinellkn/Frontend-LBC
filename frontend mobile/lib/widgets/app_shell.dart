import 'package:flutter/material.dart';
import '../screens/companies_screen.dart';
import '../screens/home_screen.dart';
import '../screens/jobs_screen.dart';
import '../screens/more_screen.dart';
import '../screens/news_screen.dart';
import '../screens/practical_info_screen.dart';
import '../screens/assistant_screen.dart';

class AppShell extends StatefulWidget {
  const AppShell({super.key});

  @override
  State<AppShell> createState() => _AppShellState();
}

class _AppShellState extends State<AppShell> {
  int index = 0;

  // Raccourci "Assistant IA" utilisé depuis l'accueil : ouvert en poussé,
  // ce n'est pas une section du menu.
  void _openAssistant(int i) {
    if (i == 5) {
      Navigator.of(context).push(
        MaterialPageRoute(builder: (_) => const AssistantScreen()),
      );
      return;
    }
    setState(() => index = i);
  }

  // Sélection d'une section depuis le menu vertical (3 traits) : ferme le
  // menu puis affiche la section choisie.
  void _selectTab(int i) => setState(() => index = i);

  @override
  Widget build(BuildContext context) {
    final pages = [
      HomeScreen(onNavigate: _openAssistant, selectedIndex: 0, onSelectTab: _selectTab),
      CompaniesScreen(selectedIndex: 1, onSelectTab: _selectTab),
      JobsScreen(selectedIndex: 2, onSelectTab: _selectTab),
      NewsScreen(selectedIndex: 3, onSelectTab: _selectTab),
      PracticalInfoScreen(selectedIndex: 4, onSelectTab: _selectTab),
      MoreScreen(selectedIndex: 5, onSelectTab: _selectTab),
    ];

    return IndexedStack(index: index > 4 ? 5 : index, children: pages);
  }
}
