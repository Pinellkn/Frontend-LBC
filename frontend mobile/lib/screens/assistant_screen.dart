import 'package:flutter/material.dart';
import '../data/lbc_data.dart';
import '../theme.dart';

class _ChatMessage {
  final String text;
  final bool isUser;
  const _ChatMessage(this.text, this.isUser);
}

class AssistantScreen extends StatefulWidget {
  const AssistantScreen({super.key});

  @override
  State<AssistantScreen> createState() => _AssistantScreenState();
}

class _AssistantScreenState extends State<AssistantScreen> {
  final _controller = TextEditingController();
  final _scroll = ScrollController();
  final List<_ChatMessage> _messages = [
    const _ChatMessage(
      "Bonjour 👋 Je suis l'assistant LBC. Posez-moi une question sur les entreprises, "
      "les emplois, les actualités ou les démarches administratives du Bénin.",
      false,
    ),
  ];

  void _send([String? preset]) {
    final text = preset ?? _controller.text.trim();
    if (text.isEmpty) return;
    setState(() {
      _messages.add(_ChatMessage(text, true));
      _messages.add(_ChatMessage(_fakeReply(text), false));
      _controller.clear();
    });
    Future.delayed(const Duration(milliseconds: 80), () {
      if (_scroll.hasClients) {
        _scroll.animateTo(
          _scroll.position.maxScrollExtent,
          duration: const Duration(milliseconds: 250),
          curve: Curves.easeOut,
        );
      }
    });
  }

  String _fakeReply(String question) {
    final q = question.toLowerCase();
    if (q.contains("btp") || q.contains("construction")) {
      return "Il y a ${companies.where((c) => c.sector == 'BTP & construction').length} entreprises de BTP référencées, dont Bénin BTP Services à Abomey-Calavi. Consultez l'onglet Entreprises pour filtrer par commune.";
    }
    if (q.contains("stage") || q.contains("emploi") || q.contains("job")) {
      return "Il y a actuellement ${opportunities.length} opportunités actives (emplois, stages, alternances). Ouvrez l'onglet Emplois pour filtrer par type et localisation.";
    }
    if (q.contains("créer") && q.contains("entreprise")) {
      return "Pour créer une entreprise au Bénin : choisissez la forme juridique, préparez pièce d'identité et justificatif de domicile, puis déposez le dossier au guichet unique (monentreprise.bj). Détails dans Infos pratiques.";
    }
    return "Je note votre demande. Explorez les onglets Entreprises, Emplois, Actualités et Infos pratiques pour affiner votre recherche — d'autres réponses détaillées arriveront avec la connexion à l'IA en ligne.";
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Row(
          children: [
            Icon(Icons.auto_awesome_rounded, size: 20),
            SizedBox(width: 8),
            Text("Assistant IA"),
          ],
        ),
      ),
      body: Column(
        children: [
          Expanded(
            child: ListView(
              controller: _scroll,
              padding: const EdgeInsets.all(16),
              children: [
                for (final m in _messages)
                  Align(
                    alignment:
                        m.isUser ? Alignment.centerRight : Alignment.centerLeft,
                    child: Container(
                      margin: const EdgeInsets.only(bottom: 10),
                      padding:
                          const EdgeInsets.symmetric(horizontal: 14, vertical: 10),
                      constraints: BoxConstraints(
                          maxWidth: MediaQuery.of(context).size.width * 0.78),
                      decoration: BoxDecoration(
                        color: m.isUser ? LbcColors.deep : Colors.white,
                        borderRadius: BorderRadius.circular(16),
                        border: m.isUser
                            ? null
                            : Border.all(color: LbcColors.border),
                      ),
                      child: Text(
                        m.text,
                        style: TextStyle(
                          color: m.isUser ? Colors.white : LbcColors.ink,
                          fontSize: 13.5,
                          height: 1.4,
                        ),
                      ),
                    ),
                  ),
                if (_messages.length == 1)
                  Wrap(
                    spacing: 8,
                    runSpacing: 8,
                    children: assistantExamples
                        .map(
                          (e) => ActionChip(
                            label: Text(e, style: const TextStyle(fontSize: 12)),
                            backgroundColor: Colors.white,
                            side: const BorderSide(color: LbcColors.border),
                            onPressed: () => _send(e),
                          ),
                        )
                        .toList(),
                  ),
              ],
            ),
          ),
          SafeArea(
            child: Padding(
              padding: const EdgeInsets.fromLTRB(12, 8, 12, 12),
              child: Row(
                children: [
                  Expanded(
                    child: TextField(
                      controller: _controller,
                      decoration: const InputDecoration(
                        hintText: "Posez votre question…",
                      ),
                      onSubmitted: (_) => _send(),
                    ),
                  ),
                  const SizedBox(width: 8),
                  IconButton.filled(
                    onPressed: () => _send(),
                    icon: const Icon(Icons.send_rounded),
                  ),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }
}
