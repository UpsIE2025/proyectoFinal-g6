import 'package:flutter/material.dart';
import 'package:msoft_app/presentation/providers/AuthProvider.dart';
import 'package:provider/provider.dart';

class AuthWrapper extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Consumer<AuthProvider>(
      builder: (context, authProvider, child) {
        // Mientras se está verificando el estado de autenticación, mostramos una pantalla de carga
        if (authProvider.isLoading) {
          return const Scaffold(
            body: Center(child: CircularProgressIndicator()),
          );
        }

        // Si el usuario no está autenticado, redirigimos a la pantalla de login
        if (!authProvider.isAuthenticated) {
          Future.microtask(() {
            Navigator.pushReplacementNamed(context, '/login');
          });
          return const SizedBox
              .shrink(); // Se usa SizedBox vacío mientras se redirige
        }

        // Si el usuario está autenticado, redirigimos a la pantalla principal
        Future.microtask(() {
          Navigator.pushReplacementNamed(context, '/home');
        });
        return const SizedBox
            .shrink(); // Se usa SizedBox vacío mientras se redirige
      },
    );
  }
}
