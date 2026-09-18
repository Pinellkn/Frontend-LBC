import 'package:flutter/material.dart';
import '../theme.dart';
import '../widgets/app_drawer.dart';
import 'assistant_screen.dart';
import 'login_screen.dart';
import 'practical_info_screen.dart';
import 'signaler_screen.dart';

class MoreScreen extends StatelessWidget {
  final int selectedIndex;
  final ValueChanged<int> onSelectTab;
  const MoreScreen({super.key, required this.selectedIndex, required this.onSelectTab});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      drawer: AppDrawer(selectedIndex: selectedIndex, onSelect: onSelectTab),
      appBar: AppBar(title: const Text("Mon espace")),
      body: ListView(
        padding: const EdgeInsets.all(16),
        children: [
          Container(
            padding: const EdgeInsets.all(16),
            decoration: BoxDecoration(
              gradient: const LinearGradient(
                colors: [LbcColors.deep, LbcColors.medium],
                begin: Alignment.topLeft,
                end: Alignment.bottomRight,
              ),
              borderRadius: BorderRadius.circular(18),
            ),
            child: Row(
              children: [
                const CircleAvatar(
                  radius: 24,
                  backgroundColor: Colors.white24,
                  child: Icon(Icons.person_rounded, color: Colors.white),
                ),
                const SizedBox(width: 14),
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      const Text("Bienvenue sur LBC",
                          style: TextStyle(
                              color: Colors.white,
                              fontWeight: FontWeight.w700,
                              fontSize: 15)),
                      const SizedBox(height: 2),
                      const Text("Connectez-vous pour publier une offre ou une actualité.",
                          style: TextStyle(color: Colors.white70, fontSize: 12)),
                    ],
                  ),
                ),
              ],
            ),
          ),
          const SizedBox(height: 8),
          ElevatedButton(
            style: ElevatedButton.styleFrom(minimumSize: const Size.fromHeight(46)),
            onPressed: () => Navigator.of(context)
                .push(MaterialPageRoute(builder: (_) => const LoginScreen())),
            child: const Text("Se connecter / Créer un compte"),
          ),
          const SizedBox(height: 20),
          _Tile(
            icon: Icons.auto_awesome_rounded,
            title: "Assistant IA",
            subtitle: "Posez vos questions sur le Bénin économique",
            onTap: () => Navigator.of(context)
                .push(MaterialPageRoute(builder: (_) => const AssistantScreen())),
          ),
          _Tile(
            icon: Icons.account_balance_rounded,
            title: "Infos pratiques",
            subtitle: "Administrations et démarches",
            onTap: () => Navigator.of(context).push(MaterialPageRoute(
              builder: (_) => PracticalInfoScreen(
                selectedIndex: 4,
                onSelectTab: (_) => Navigator.of(context).pop(),
              ),
            )),
          ),
          _Tile(
            icon: Icons.post_add_rounded,
            title: "Publier une offre d'emploi",
            subtitle: "Réservé aux comptes entreprise",
            onTap: () => Navigator.of(context)
                .push(MaterialPageRoute(builder: (_) => const LoginScreen())),
          ),
          _Tile(
            icon: Icons.campaign_outlined,
            title: "Publier une actualité",
            subtitle: "Réservé aux comptes vérifiés",
            onTap: () => Navigator.of(context)
                .push(MaterialPageRoute(builder: (_) => const LoginScreen())),
          ),
          _Tile(
            icon: Icons.flag_outlined,
            title: "Signaler un problème",
            subtitle: "Numéro erroné, doublon, contenu inexact",
            onTap: () => Navigator.of(context)
                .push(MaterialPageRoute(builder: (_) => const SignalerScreen())),
          ),
          _Tile(
            icon: Icons.info_outline_rounded,
            title: "À propos de LBC",
            subtitle: "L'annuaire économique et pratique du Bénin",
            onTap: () => showAboutDialog(
              context: context,
              applicationName: "LBC Bénin",
              applicationVersion: "1.0.0",
              children: const [
                Text(
                  "LBC connecte les entreprises, les talents et les citoyens du Bénin autour d'un annuaire vérifié, des offres d'emploi et des démarches administratives.",
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}

class _Tile extends StatelessWidget {
  final IconData icon;
  final String title;
  final String subtitle;
  final VoidCallback onTap;
  const _Tile({
    required this.icon,
    required this.title,
    required this.subtitle,
    required this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    return Card(
      margin: const EdgeInsets.only(bottom: 10),
      child: ListTile(
        leading: Container(
          width: 40,
          height: 40,
          decoration: BoxDecoration(
            color: LbcColors.deep.withValues(alpha: 0.08),
            borderRadius: BorderRadius.circular(10),
          ),
          alignment: Alignment.center,
          child: Icon(icon, color: LbcColors.deep, size: 20),
        ),
        title: Text(title, style: const TextStyle(fontWeight: FontWeight.w700, fontSize: 13.5)),
        subtitle: Text(subtitle, style: const TextStyle(fontSize: 11.5)),
        trailing: const Icon(Icons.chevron_right_rounded, color: LbcColors.steel),
        onTap: onTap,
      ),
    );
  }
}
