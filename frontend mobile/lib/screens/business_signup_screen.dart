import 'package:flutter/material.dart';
import '../data/lbc_data.dart';
import '../theme.dart';

class BusinessSignupScreen extends StatefulWidget {
  const BusinessSignupScreen({super.key});

  @override
  State<BusinessSignupScreen> createState() => _BusinessSignupScreenState();
}

class _BusinessSignupScreenState extends State<BusinessSignupScreen> {
  final _formKey = GlobalKey<FormState>();
  final _structure = TextEditingController();
  final _email = TextEditingController();
  final _phone = TextEditingController();
  final _desc = TextEditingController();
  String? sector;
  String? commune;
  bool sent = false;

  @override
  void dispose() {
    _structure.dispose();
    _email.dispose();
    _phone.dispose();
    _desc.dispose();
    super.dispose();
  }

  void _submit() {
    final formOk = _formKey.currentState!.validate();
    if (!formOk || sector == null || commune == null) {
      if (sector == null || commune == null) {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(content: Text("Choisissez un secteur et une commune.")),
        );
      }
      return;
    }
    setState(() => sent = true);
  }

  @override
  Widget build(BuildContext context) {
    if (sent) {
      return Scaffold(
        appBar: AppBar(title: const Text("Compte entreprise")),
        body: ListView(
          padding: const EdgeInsets.all(20),
          children: [
            const SizedBox(height: 40),
            Center(
              child: Container(
                padding: const EdgeInsets.all(18),
                decoration: const BoxDecoration(
                  color: LbcColors.mist,
                  shape: BoxShape.circle,
                ),
                child: const Icon(Icons.mark_email_read_rounded,
                    size: 40, color: LbcColors.sage),
              ),
            ),
            const SizedBox(height: 20),
            Text(
              "Demande envoyée",
              textAlign: TextAlign.center,
              style: Theme.of(context).textTheme.headlineSmall,
            ),
            const SizedBox(height: 8),
            const Text(
              "Merci ! L'équipe LBC vérifie vos informations (RCCM, IFU) et revient vers vous sous 72 h pour finaliser la création de votre compte entreprise.",
              textAlign: TextAlign.center,
              style: TextStyle(color: LbcColors.steel, fontSize: 13.5, height: 1.4),
            ),
            const SizedBox(height: 24),
            ElevatedButton(
              style: ElevatedButton.styleFrom(minimumSize: const Size.fromHeight(50)),
              onPressed: () => Navigator.of(context).maybePop(),
              child: const Text("Retour à la connexion"),
            ),
          ],
        ),
      );
    }

    return Scaffold(
      appBar: AppBar(title: const Text("Créer un compte entreprise")),
      body: Form(
        key: _formKey,
        child: ListView(
          padding: const EdgeInsets.all(20),
          children: [
            const Text(
              "Référencez votre structure sur LBC : créez votre page, publiez vos offres et actualités, et obtenez le badge de vérification.",
              style: TextStyle(color: LbcColors.steel, fontSize: 13, height: 1.4),
            ),
            const SizedBox(height: 20),
            TextFormField(
              controller: _structure,
              decoration: const InputDecoration(
                labelText: "Nom de la structure",
                prefixIcon: Icon(Icons.apartment_rounded, size: 20),
              ),
              validator: (v) => (v == null || v.trim().isEmpty)
                  ? "Le nom de la structure est requis."
                  : null,
            ),
            const SizedBox(height: 14),
            DropdownButtonFormField<String>(
              initialValue: sector,
              decoration: const InputDecoration(labelText: "Secteur d'activité"),
              items: sectors
                  .map((s) => DropdownMenuItem(
                        value: s["name"] as String,
                        child: Text(s["name"] as String),
                      ))
                  .toList(),
              onChanged: (v) => setState(() => sector = v),
            ),
            const SizedBox(height: 14),
            DropdownButtonFormField<String>(
              initialValue: commune,
              decoration: const InputDecoration(labelText: "Commune"),
              items: communes
                  .map((c) => DropdownMenuItem(value: c, child: Text(c)))
                  .toList(),
              onChanged: (v) => setState(() => commune = v),
            ),
            const SizedBox(height: 14),
            TextFormField(
              controller: _email,
              keyboardType: TextInputType.emailAddress,
              decoration: const InputDecoration(
                labelText: "E-mail de contact",
                prefixIcon: Icon(Icons.mail_outline_rounded, size: 20),
              ),
              validator: (v) {
                final value = v?.trim() ?? "";
                if (value.isEmpty) return "L'e-mail est requis.";
                if (!value.contains("@") || !value.contains(".")) {
                  return "Adresse e-mail invalide.";
                }
                return null;
              },
            ),
            const SizedBox(height: 14),
            TextFormField(
              controller: _phone,
              keyboardType: TextInputType.phone,
              decoration: const InputDecoration(
                labelText: "Téléphone",
                prefixIcon: Icon(Icons.phone_outlined, size: 20),
                hintText: "+229 01 00 00 00 00",
              ),
              validator: (v) => (v == null || v.trim().isEmpty)
                  ? "Le téléphone est requis."
                  : null,
            ),
            const SizedBox(height: 14),
            TextFormField(
              controller: _desc,
              maxLines: 4,
              decoration: const InputDecoration(
                labelText: "Présentation et services",
                alignLabelWithHint: true,
              ),
              validator: (v) => (v == null || v.trim().isEmpty)
                  ? "Une courte présentation est requise."
                  : null,
            ),
            const SizedBox(height: 20),
            ElevatedButton(
              style: ElevatedButton.styleFrom(minimumSize: const Size.fromHeight(50)),
              onPressed: _submit,
              child: const Text("Envoyer ma demande"),
            ),
            const SizedBox(height: 12),
            Center(
              child: TextButton(
                onPressed: () => Navigator.of(context).maybePop(),
                child: const Text("Vous avez déjà un compte ? Se connecter"),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
