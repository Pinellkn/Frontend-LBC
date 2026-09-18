import 'package:flutter/material.dart';
import '../theme.dart';

class LoginScreen extends StatefulWidget {
  const LoginScreen({super.key});

  @override
  State<LoginScreen> createState() => _LoginScreenState();
}

class _LoginScreenState extends State<LoginScreen> {
  bool isSignup = false;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text("Connexion")),
      body: ListView(
        padding: const EdgeInsets.all(20),
        children: [
          Center(
            child: Image.asset('assets/images/lbc-logo.png', height: 56),
          ),
          const SizedBox(height: 24),
          Container(
            padding: const EdgeInsets.all(4),
            decoration: BoxDecoration(
              color: LbcColors.mist,
              borderRadius: BorderRadius.circular(14),
            ),
            child: Row(
              children: [
                Expanded(
                  child: _Tab(
                    label: "Se connecter",
                    selected: !isSignup,
                    onTap: () => setState(() => isSignup = false),
                  ),
                ),
                Expanded(
                  child: _Tab(
                    label: "Créer un compte",
                    selected: isSignup,
                    onTap: () => setState(() => isSignup = true),
                  ),
                ),
              ],
            ),
          ),
          const SizedBox(height: 24),
          if (isSignup)
            const _Field(label: "Nom complet", icon: Icons.person_outline_rounded),
          const _Field(label: "Adresse e-mail", icon: Icons.mail_outline_rounded),
          const _Field(
              label: "Mot de passe",
              icon: Icons.lock_outline_rounded,
              obscure: true),
          const SizedBox(height: 8),
          ElevatedButton(
            style: ElevatedButton.styleFrom(minimumSize: const Size.fromHeight(50)),
            onPressed: () {
              ScaffoldMessenger.of(context).showSnackBar(
                SnackBar(
                  content: Text(isSignup
                      ? "Compte créé (démo)."
                      : "Connexion réussie (démo)."),
                ),
              );
              Navigator.of(context).maybePop();
            },
            child: Text(isSignup ? "Créer mon compte" : "Se connecter"),
          ),
          const SizedBox(height: 14),
          Center(
            child: TextButton(
              onPressed: () {},
              child: const Text("Mot de passe oublié ?"),
            ),
          ),
          const Divider(height: 32),
          OutlinedButton.icon(
            style: OutlinedButton.styleFrom(minimumSize: const Size.fromHeight(50)),
            onPressed: () {},
            icon: const Icon(Icons.apartment_rounded, size: 18),
            label: const Text("Créer un compte entreprise"),
          ),
        ],
      ),
    );
  }
}

class _Tab extends StatelessWidget {
  final String label;
  final bool selected;
  final VoidCallback onTap;
  const _Tab({required this.label, required this.selected, required this.onTap});

  @override
  Widget build(BuildContext context) {
    return InkWell(
      onTap: onTap,
      borderRadius: BorderRadius.circular(10),
      child: Container(
        padding: const EdgeInsets.symmetric(vertical: 10),
        decoration: BoxDecoration(
          color: selected ? Colors.white : Colors.transparent,
          borderRadius: BorderRadius.circular(10),
        ),
        alignment: Alignment.center,
        child: Text(
          label,
          style: TextStyle(
            fontWeight: FontWeight.w700,
            fontSize: 12.5,
            color: selected ? LbcColors.deep : LbcColors.steel,
          ),
        ),
      ),
    );
  }
}

class _Field extends StatelessWidget {
  final String label;
  final IconData icon;
  final bool obscure;
  const _Field({required this.label, required this.icon, this.obscure = false});

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 14),
      child: TextField(
        obscureText: obscure,
        decoration: InputDecoration(
          labelText: label,
          prefixIcon: Icon(icon, size: 20),
        ),
      ),
    );
  }
}
