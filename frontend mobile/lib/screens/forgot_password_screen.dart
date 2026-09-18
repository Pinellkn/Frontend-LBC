import 'package:flutter/material.dart';
import '../theme.dart';

class ForgotPasswordScreen extends StatefulWidget {
  const ForgotPasswordScreen({super.key});

  @override
  State<ForgotPasswordScreen> createState() => _ForgotPasswordScreenState();
}

class _ForgotPasswordScreenState extends State<ForgotPasswordScreen> {
  final _formKey = GlobalKey<FormState>();
  final _email = TextEditingController();
  bool sent = false;

  @override
  void dispose() {
    _email.dispose();
    super.dispose();
  }

  void _submit() {
    if (!_formKey.currentState!.validate()) return;
    setState(() => sent = true);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text("Mot de passe oublié")),
      body: ListView(
        padding: const EdgeInsets.all(20),
        children: [
          if (!sent) ...[
            Center(
              child: Container(
                padding: const EdgeInsets.all(18),
                decoration: const BoxDecoration(
                  color: LbcColors.mist,
                  shape: BoxShape.circle,
                ),
                child: const Icon(Icons.lock_reset_rounded,
                    size: 40, color: LbcColors.deep),
              ),
            ),
            const SizedBox(height: 20),
            const Text(
              "Saisissez l'adresse e-mail associée à votre compte : nous vous enverrons un lien pour réinitialiser votre mot de passe.",
              textAlign: TextAlign.center,
              style: TextStyle(color: LbcColors.steel, fontSize: 13.5, height: 1.4),
            ),
            const SizedBox(height: 24),
            Form(
              key: _formKey,
              child: TextFormField(
                controller: _email,
                keyboardType: TextInputType.emailAddress,
                decoration: const InputDecoration(
                  labelText: "Adresse e-mail",
                  prefixIcon: Icon(Icons.mail_outline_rounded, size: 20),
                ),
                validator: (v) {
                  final value = v?.trim() ?? "";
                  if (value.isEmpty) return "L'adresse e-mail est requise.";
                  if (!value.contains("@") || !value.contains(".")) {
                    return "Adresse e-mail invalide.";
                  }
                  return null;
                },
              ),
            ),
            const SizedBox(height: 20),
            ElevatedButton(
              style: ElevatedButton.styleFrom(minimumSize: const Size.fromHeight(50)),
              onPressed: _submit,
              child: const Text("Envoyer le lien de réinitialisation"),
            ),
            const SizedBox(height: 14),
            Center(
              child: TextButton(
                onPressed: () => Navigator.of(context).maybePop(),
                child: const Text("Retour à la connexion"),
              ),
            ),
          ] else ...[
            const SizedBox(height: 40),
            Center(
              child: Container(
                padding: const EdgeInsets.all(18),
                decoration: const BoxDecoration(
                  color: LbcColors.dangerSoft,
                  shape: BoxShape.circle,
                ),
                child: const Icon(Icons.mark_email_read_rounded,
                    size: 40, color: LbcColors.sage),
              ),
            ),
            const SizedBox(height: 20),
            Text(
              "E-mail envoyé",
              textAlign: TextAlign.center,
              style: Theme.of(context).textTheme.headlineSmall,
            ),
            const SizedBox(height: 8),
            Text(
              "Si un compte existe pour ${_email.text.trim()}, un lien de réinitialisation vient d'être envoyé. Vérifiez aussi vos spams.",
              textAlign: TextAlign.center,
              style: const TextStyle(color: LbcColors.steel, fontSize: 13.5, height: 1.4),
            ),
            const SizedBox(height: 24),
            ElevatedButton(
              style: ElevatedButton.styleFrom(minimumSize: const Size.fromHeight(50)),
              onPressed: () => Navigator.of(context).maybePop(),
              child: const Text("Retour à la connexion"),
            ),
          ],
        ],
      ),
    );
  }
}
