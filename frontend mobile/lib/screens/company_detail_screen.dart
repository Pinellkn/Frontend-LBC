import 'package:flutter/material.dart';
import 'package:url_launcher/url_launcher.dart';
import '../data/models.dart';
import '../theme.dart';
import '../widgets/cards.dart';

class CompanyDetailScreen extends StatelessWidget {
  final Company company;
  const CompanyDetailScreen({super.key, required this.company});

  Future<void> _launch(String url) async {
    final uri = Uri.parse(url);
    await launchUrl(uri, mode: LaunchMode.externalApplication);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text(company.name)),
      body: ListView(
        padding: const EdgeInsets.all(16),
        children: [
          Row(
            children: [
              Container(
                width: 64,
                height: 64,
                decoration: BoxDecoration(
                  color: LbcColors.deep,
                  borderRadius: BorderRadius.circular(16),
                ),
                alignment: Alignment.center,
                child: Text(
                  company.name.characters.first,
                  style: const TextStyle(
                      color: Colors.white, fontSize: 24, fontWeight: FontWeight.w700),
                ),
              ),
              const SizedBox(width: 14),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(company.name, style: Theme.of(context).textTheme.titleLarge),
                    const SizedBox(height: 4),
                    Text("${company.sector} · ${company.commune}",
                        style: const TextStyle(color: LbcColors.steel, fontSize: 13)),
                    const SizedBox(height: 6),
                    Wrap(
                      crossAxisAlignment: WrapCrossAlignment.center,
                      spacing: 6,
                      runSpacing: 4,
                      children: [
                        StatusBadge(status: company.status),
                        Row(
                          mainAxisSize: MainAxisSize.min,
                          children: [
                            const Icon(Icons.star_rounded, size: 15, color: LbcColors.amber),
                            Text(" ${company.rating} (${company.reviews})",
                                style: const TextStyle(fontSize: 12.5, color: LbcColors.steel)),
                          ],
                        ),
                      ],
                    ),
                  ],
                ),
              ),
            ],
          ),
          const SizedBox(height: 20),
          Text(company.description,
              style: const TextStyle(fontSize: 14, height: 1.5, color: LbcColors.ink)),
          const SizedBox(height: 20),
          const Text("Services", style: TextStyle(fontWeight: FontWeight.w700, fontSize: 15)),
          const SizedBox(height: 8),
          Wrap(
            spacing: 8,
            runSpacing: 8,
            children: company.services.map((s) => TypeChip(label: s)).toList(),
          ),
          const SizedBox(height: 20),
          Container(
            padding: const EdgeInsets.all(16),
            decoration: BoxDecoration(
              color: Colors.white,
              border: Border.all(color: LbcColors.border),
              borderRadius: BorderRadius.circular(16),
            ),
            child: Column(
              children: [
                _InfoRow(icon: Icons.place_outlined, label: company.address),
                _InfoRow(icon: Icons.schedule_outlined, label: company.hours),
                _InfoRow(
                  icon: Icons.phone_outlined,
                  label: company.phone,
                  onTap: () => _launch("tel:${company.phone.replaceAll(' ', '')}"),
                ),
                _InfoRow(
                  icon: Icons.mail_outline_rounded,
                  label: company.email,
                  onTap: () => _launch("mailto:${company.email}"),
                ),
                if (company.website != null)
                  _InfoRow(
                    icon: Icons.public_rounded,
                    label: company.website!,
                    onTap: () => _launch("https://${company.website}"),
                  ),
                _InfoRow(
                  icon: Icons.business_outlined,
                  label: "Fondée en ${company.founded} · ${company.size}",
                ),
              ],
            ),
          ),
          const SizedBox(height: 20),
          Row(
            children: [
              Expanded(
                child: ElevatedButton.icon(
                  onPressed: () => _launch("tel:${company.phone.replaceAll(' ', '')}"),
                  icon: const Icon(Icons.call_rounded, size: 18),
                  label: const Text("Appeler"),
                ),
              ),
              const SizedBox(width: 10),
              Expanded(
                child: OutlinedButton.icon(
                  onPressed: () {},
                  icon: const Icon(Icons.flag_outlined, size: 18),
                  label: const Text("Signaler"),
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }
}

class _InfoRow extends StatelessWidget {
  final IconData icon;
  final String label;
  final VoidCallback? onTap;
  const _InfoRow({required this.icon, required this.label, this.onTap});

  @override
  Widget build(BuildContext context) {
    return InkWell(
      onTap: onTap,
      child: Padding(
        padding: const EdgeInsets.symmetric(vertical: 8),
        child: Row(
          children: [
            Icon(icon, size: 18, color: LbcColors.medium),
            const SizedBox(width: 10),
            Expanded(
              child: Text(
                label,
                style: TextStyle(
                  fontSize: 13.5,
                  color: onTap != null ? LbcColors.medium : LbcColors.ink,
                  decoration: onTap != null ? TextDecoration.underline : null,
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
