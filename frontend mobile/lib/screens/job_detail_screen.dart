import 'package:flutter/material.dart';
import '../data/models.dart';
import '../theme.dart';
import '../widgets/cards.dart';

class JobDetailScreen extends StatelessWidget {
  final Opportunity job;
  const JobDetailScreen({super.key, required this.job});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text(job.type)),
      body: ListView(
        padding: const EdgeInsets.all(16),
        children: [
          TypeChip(label: job.type),
          const SizedBox(height: 10),
          Text(job.title, style: Theme.of(context).textTheme.titleLarge),
          const SizedBox(height: 4),
          Text(job.company, style: const TextStyle(color: LbcColors.medium, fontSize: 14)),
          const SizedBox(height: 16),
          Wrap(
            spacing: 16,
            runSpacing: 10,
            children: [
              _Meta(icon: Icons.place_outlined, label: "Lieu", value: job.location),
              _Meta(icon: Icons.school_outlined, label: "Niveau", value: job.level),
              _Meta(icon: Icons.description_outlined, label: "Contrat", value: job.contract),
              _Meta(icon: Icons.event_outlined, label: "Date limite", value: job.deadline),
              if (job.salary != null)
                _Meta(icon: Icons.payments_outlined, label: "Rémunération", value: job.salary!),
            ],
          ),
          const SizedBox(height: 20),
          Text(job.summary, style: const TextStyle(fontSize: 14, height: 1.5)),
          const SizedBox(height: 20),
          const Text("Missions", style: TextStyle(fontWeight: FontWeight.w700, fontSize: 15)),
          const SizedBox(height: 8),
          ...job.missions.map((m) => _Bullet(text: m)),
          const SizedBox(height: 16),
          const Text("Profil recherché", style: TextStyle(fontWeight: FontWeight.w700, fontSize: 15)),
          const SizedBox(height: 8),
          ...job.profile.map((p) => _Bullet(text: p)),
          const SizedBox(height: 20),
          Container(
            padding: const EdgeInsets.all(14),
            decoration: BoxDecoration(
              color: LbcColors.mist,
              borderRadius: BorderRadius.circular(14),
            ),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                const Text("Comment postuler",
                    style: TextStyle(fontWeight: FontWeight.w700, fontSize: 13.5)),
                const SizedBox(height: 6),
                Text(job.howToApply, style: const TextStyle(fontSize: 13, height: 1.45)),
              ],
            ),
          ),
          const SizedBox(height: 20),
          ElevatedButton(
            onPressed: () {
              ScaffoldMessenger.of(context).showSnackBar(
                const SnackBar(content: Text("Candidature enregistrée (démo).")),
              );
            },
            style: ElevatedButton.styleFrom(minimumSize: const Size.fromHeight(48)),
            child: const Text("Postuler"),
          ),
        ],
      ),
    );
  }
}

class _Meta extends StatelessWidget {
  final IconData icon;
  final String label;
  final String value;
  const _Meta({required this.icon, required this.label, required this.value});

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      width: 150,
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Icon(icon, size: 16, color: LbcColors.medium),
          const SizedBox(width: 6),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(label,
                    style: const TextStyle(fontSize: 10.5, color: LbcColors.steel)),
                Text(value,
                    style: const TextStyle(fontSize: 12.5, fontWeight: FontWeight.w600)),
              ],
            ),
          ),
        ],
      ),
    );
  }
}

class _Bullet extends StatelessWidget {
  final String text;
  const _Bullet({required this.text});

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 8),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const Padding(
            padding: EdgeInsets.only(top: 5),
            child: Icon(Icons.circle, size: 6, color: LbcColors.amber),
          ),
          const SizedBox(width: 10),
          Expanded(child: Text(text, style: const TextStyle(fontSize: 13.5, height: 1.4))),
        ],
      ),
    );
  }
}
