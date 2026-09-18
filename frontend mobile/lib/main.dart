import 'package:flutter/material.dart';
import 'theme.dart';
import 'screens/splash_screen.dart';

void main() {
  runApp(const LbcApp());
}

class LbcApp extends StatelessWidget {
  const LbcApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'LBC Bénin',
      debugShowCheckedModeBanner: false,
      theme: LbcTheme.light,
      home: const SplashScreen(),
    );
  }
}
