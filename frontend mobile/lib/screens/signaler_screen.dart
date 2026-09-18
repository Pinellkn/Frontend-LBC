import 'package:flutter/material.dart';
import '../theme.dart';

class SignalerScreen extends StatefulWidget {
  const SignalerScreen({super.key});

  @override
  State<SignalerScreen> createState() => _SignalerScreenState();
}

class _SignalerScreenState extends State<SignalerScreen> {
  String? type;
  final _target = TextEditingController();
  final _details = TextEditingController();

  final types = const [
    "Numéro erroné",
    "Information inexacte",
    "Doublon",
    "Offre expirée",
    "Contenu inapproprié",
    "Autre",
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text("Signaler un problème")),
      body: ListView(
        padding: const EdgeInsets.all(16),
        children: [
          const Text(
            "Aidez-nous à garder LBC fiable : signalez une information erronée, un doublon ou un contenu inapproprié.",
            style: TextStyle(color: LbcColors.steel, fontSize: 13, height: 1.4),
          ),
          const SizedBox(height: 20),
          const Text("Type de signalement",
              style: TextStyle(fontWeight: FontWeight.w700, fontSize: 13.5)),
          const SizedBox(height: 8),
          Wrap(
            spacing: 8,
            runSpacing: 8,
            children: types
                .map(
                  (t) => ChoiceChip(
                    label: Text(t, style: const TextStyle(fontSize: 12)),
                    selected: type == t,
                    onSelected: (_) => setState(() => type = t),
                    backgroundColor: Colors.white,
                    selectedColor: LbcColors.deep,
                    labelStyle: TextStyle(
                      color: type == t ? Colors.white : LbcColors.ink,
                    ),
                    side: const BorderSide(color: LbcColors.border),
                  ),
                )
                .toList(),
          ),
          const SizedBox(height: 20),
          TextField(
            controller: _target,
            decoration: const InputDecoration(
              labelText: "Entreprise, offre ou actualité concernée",
            ),
          ),
          const SizedBox(height: 14),
          TextField(
            controller: _details,
            maxLines: 4,
            decoration: const InputDecoration(
              labelText: "Détails du signalement",
              alignLabelWithHint: true,
            ),
          ),
          const SizedBox(height: 20),
          ElevatedButton(
            style: ElevatedButton.styleFrom(minimumSize: const Size.fromHeight(48)),
            onPressed: () {
              ScaffoldMessenger.of(context).showSnackBar(
                const SnackBar(content: Text("Signalement envoyé. Merci !")),
              );
              Navigator.of(context).maybePop();
            },
            child: const Text("Envoyer le signalement"),
          ),
        ],
      ),
    );
  }
}
