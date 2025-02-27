import 'package:flutter/material.dart';
import 'package:msoft_app/presentation/auth/screen/LoginScreen.dart';
import 'package:msoft_app/presentation/auth/screen/RegisterScreen.dart';
import 'package:msoft_app/presentation/home/screens/HomeScreen.dart';
import 'package:msoft_app/presentation/providers/AuthProvider.dart';
import 'package:msoft_app/shared/widgets/checkAuthentication.dart';
import 'package:provider/provider.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return ChangeNotifierProvider(
      create: (context) => AuthProvider(),
      child: MaterialApp(
        title: 'Flutter Demo',
        debugShowCheckedModeBanner: false,
        theme: ThemeData(
          primarySwatch: Colors.blue,
        ),
        initialRoute: '/',
        routes: {
          '/': (context) => AuthWrapper(),
          '/login': (context) => const LoginScreen(),
          '/home': (context) => const HomeScreen(),
          '/register': (context) => RegisterScreen(),
        },
      ),
    );
  }
}
