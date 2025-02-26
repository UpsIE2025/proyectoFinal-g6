import 'package:flutter/material.dart';
import 'package:msoft_app/presentation/auth/screen/LoginScreen.dart';
import 'package:msoft_app/presentation/providers/AuthProvider.dart';
import 'package:provider/provider.dart';

class HomeScreen extends StatefulWidget {
  const HomeScreen({super.key});

  @override
  _HomeScreenState createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  int _selectedIndex = 0;

  final List<Widget> _screens = [
    const Center(child: Text('Welcome to the home screen')),
    const Center(child: Text('Listado de elementos')),
    const Center(child: Text('Crear nuevo elemento')),
    const Center(child: Text('Mi perfil')),
  ];

  void _onItemTapped(int index) {
    setState(() {
      _selectedIndex = index;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Consumer<AuthProvider>(
      builder: (context, authProvider, child) {
        if (authProvider.isLoading) {
          return const Scaffold(
            body: Center(child: CircularProgressIndicator()),
          );
        }

        if (!authProvider.isAuthenticated) {
          return const LoginScreen();
        }

        return Scaffold(
          appBar: AppBar(
            title: const Text('Home', style: TextStyle(color: Colors.white)),
            backgroundColor:
                Colors.deepPurple, // Mejorar el color de la app bar
            actions: [
              IconButton(
                icon: const Icon(Icons.logout),
                color: Colors.white, // Color del icono de logout
                onPressed: () async {
                  await authProvider.logout();
                },
              ),
            ],
          ),
          body: _screens[_selectedIndex],
          backgroundColor: Colors.grey[100], // Fondo de pantalla más suave
          bottomNavigationBar: BottomNavigationBar(
            items: const [
              BottomNavigationBarItem(
                icon: Icon(Icons.home),
                label: 'Home',
                backgroundColor:
                    Colors.deepPurple, // Fondo de la barra de navegación
              ),
              BottomNavigationBarItem(
                icon: Icon(Icons.list),
                label: 'Listado',
                backgroundColor: Colors.deepPurple,
              ),
              BottomNavigationBarItem(
                icon: Icon(Icons.add),
                label: 'Nuevo',
                backgroundColor: Colors.deepPurple,
              ),
              BottomNavigationBarItem(
                icon: Icon(Icons.person),
                label: 'Mi Perfil',
                backgroundColor: Colors.deepPurple,
              ),
            ],
            currentIndex: _selectedIndex,
            selectedItemColor:
                Colors.amberAccent, // Color de selección más brillante
            unselectedItemColor:
                Colors.white70, // Color para los elementos no seleccionados
            onTap: _onItemTapped,
            showUnselectedLabels:
                true, // Mostrar las etiquetas de los elementos no seleccionados
            selectedFontSize: 14.0, // Mejorar el tamaño de la fuente
            unselectedFontSize:
                12.0, // Mejorar el tamaño de la fuente para los elementos no seleccionados
          ),
        );
      },
    );
  }
}
