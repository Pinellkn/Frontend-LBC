import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:lboncoin/main.dart';

void main() {
  testWidgets('LBC app launches on the home screen', (tester) async {
    await tester.pumpWidget(const LbcApp());
    await tester.pumpAndSettle();
    expect(find.text('LBC Bénin'), findsWidgets);
    expect(find.byIcon(Icons.home_rounded), findsOneWidget);
  });
}
