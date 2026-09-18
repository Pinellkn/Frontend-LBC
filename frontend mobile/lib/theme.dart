import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

/// Palette LBC reprise des variables CSS du site (--lbc-*).
class LbcColors {
  static const deep = Color(0xFF1E3247);
  static const medium = Color(0xFF2C4C74);
  static const sage = Color(0xFF6FA98C);
  static const amber = Color(0xFFD89A4E);
  static const mist = Color(0xFFF2F4F6);
  static const ink = Color(0xFF232A35);
  static const steel = Color(0xFF6B7280);
  static const surface = Color(0xFFFDFDFE);
  static const success = sage;
  static const dangerSoft = Color(0xFFF7DCD9);
  static const border = Color(0xFFD8DEE4);
}

class LbcTheme {
  static ThemeData get light {
    final base = ThemeData(
      useMaterial3: true,
      colorScheme: ColorScheme.fromSeed(
        seedColor: LbcColors.deep,
        primary: LbcColors.deep,
        secondary: LbcColors.medium,
        tertiary: LbcColors.amber,
        surface: LbcColors.surface,
        error: const Color(0xFFB3261E),
      ),
      scaffoldBackgroundColor: LbcColors.mist,
      fontFamily: GoogleFonts.manrope().fontFamily,
    );
    return base.copyWith(
      textTheme: GoogleFonts.manropeTextTheme(base.textTheme).copyWith(
        headlineSmall: GoogleFonts.sora(
          fontWeight: FontWeight.w700,
          color: LbcColors.ink,
        ),
        headlineMedium: GoogleFonts.sora(
          fontWeight: FontWeight.w700,
          color: LbcColors.ink,
        ),
        titleLarge: GoogleFonts.sora(
          fontWeight: FontWeight.w700,
          color: LbcColors.ink,
        ),
        titleMedium: GoogleFonts.sora(
          fontWeight: FontWeight.w600,
          color: LbcColors.ink,
        ),
      ),
      appBarTheme: const AppBarTheme(
        backgroundColor: LbcColors.deep,
        foregroundColor: Colors.white,
        elevation: 0,
        centerTitle: false,
      ),
      cardTheme: CardThemeData(
        color: LbcColors.surface,
        elevation: 0,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(18),
          side: const BorderSide(color: LbcColors.border),
        ),
        margin: EdgeInsets.zero,
      ),
      chipTheme: base.chipTheme.copyWith(
        backgroundColor: LbcColors.mist,
        labelStyle: const TextStyle(color: LbcColors.ink, fontSize: 12),
        side: BorderSide.none,
        shape: const StadiumBorder(),
      ),
      elevatedButtonTheme: ElevatedButtonThemeData(
        style: ElevatedButton.styleFrom(
          backgroundColor: LbcColors.deep,
          foregroundColor: Colors.white,
          padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 14),
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(14),
          ),
          elevation: 0,
        ),
      ),
      outlinedButtonTheme: OutlinedButtonThemeData(
        style: OutlinedButton.styleFrom(
          foregroundColor: LbcColors.deep,
          side: const BorderSide(color: LbcColors.border),
          padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 14),
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(14),
          ),
        ),
      ),
      inputDecorationTheme: InputDecorationTheme(
        filled: true,
        fillColor: Colors.white,
        contentPadding:
            const EdgeInsets.symmetric(horizontal: 16, vertical: 14),
        border: OutlineInputBorder(
          borderRadius: BorderRadius.circular(14),
          borderSide: const BorderSide(color: LbcColors.border),
        ),
        enabledBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(14),
          borderSide: const BorderSide(color: LbcColors.border),
        ),
        focusedBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(14),
          borderSide: const BorderSide(color: LbcColors.medium, width: 1.4),
        ),
      ),
      bottomNavigationBarTheme: const BottomNavigationBarThemeData(
        backgroundColor: LbcColors.surface,
        selectedItemColor: LbcColors.deep,
        unselectedItemColor: LbcColors.steel,
        type: BottomNavigationBarType.fixed,
        showUnselectedLabels: true,
        elevation: 8,
      ),
      dividerTheme: const DividerThemeData(color: LbcColors.border),
    );
  }
}
