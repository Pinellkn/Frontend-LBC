import 'package:flutter/material.dart';
import 'package:url_launcher/url_launcher.dart';
import '../data/models.dart';
import '../theme.dart';

class PracticalInfoDetailScreen extends StatelessWidget {
  final PracticalInfo info;
  const PracticalInfoDetailScreen({super.key, required this.info});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text(info.category)),
      body: ListView(
        padding: const EdgeInsets.all(16),
        children: [
          Text(info.title, style: Theme.of(context).textTheme.titleLarge),
          const SizedBox(height: 4),
          Text("Piloté par ${info.owner}",
              style: const TextStyle(color: LbcColors.steel, fontSize: 13)),
          const SizedBox(height: 16),
          Text(info.description, style: const TextStyle(fontSize: 14, height: 1.55)),
          const SizedBox(height: 20),
          const Text("Étapes", style: TextStyle(fontWeight: FontWeight.w700, fontSize: 15)),
          const SizedBox(height: 10),
          for (int i = 0; i < info.steps.length; i++)
            Padding(
              padding: const EdgeInsets.only(bottom: 10),
              child: Row(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  CircleAvatar(
                    radius: 12,
                    backgroundColor: LbcColors.deep,
                    child: Text(
                      "${i + 1}",
                      style: const TextStyle(
                          color: Colors.white, fontSize: 11, fontWeight: FontWeight.w700),
                    ),
                  ),
                  const SizedBox(width: 10),
                  Expanded(
                    child: Text(info.steps[i],
                        style: const TextStyle(fontSize: 13.5, height: 1.4)),
                  ),
                ],
              ),
            ),
          if (info.officialUrl != null) ...[
            const SizedBox(height: 12),
            ElevatedButton.icon(
              onPressed: () => launchUrl(Uri.parse(info.officialUrl!),
                  mode: LaunchMode.externalApplication),
              style: ElevatedButton.styleFrom(minimumSize: const Size.fromHeight(48)),
              icon: const Icon(Icons.open_in_new_rounded, size: 18),
              label: Text(info.action),
            ),
          ],
        ],
      ),
    );
  }
}
