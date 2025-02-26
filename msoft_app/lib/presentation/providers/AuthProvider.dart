import 'package:flutter/material.dart';
import 'package:msoft_app/infraestructure/services/AuthService.dart';

class AuthProvider with ChangeNotifier {
  final AuthService _authService = AuthService();
  bool _isAuthenticated = false;
  bool _isLoading = false;

  bool get isAuthenticated => _isAuthenticated;
  bool get isLoading => _isLoading;

  void _setLoading(bool value) {
    if (_isLoading != value) {
      _isLoading = value;
      Future.microtask(() => notifyListeners());
    }
  }

  Future<void> checkAuthentication() async {
    _setLoading(true);
    try {
      final token = await _authService.storage.read(key: 'access_token');
      _isAuthenticated = token != null;
    } catch (e) {
      _isAuthenticated = false;
      throw Exception('Error checking authentication: $e');
    } finally {
      _setLoading(false);
    }
  }

  Future<void> loginWithCredentials(String email, String password) async {
    _setLoading(true);
    try {
      await _authService.loginWithCredentials(email, password);
      _isAuthenticated = true;
    } catch (e) {
      _isAuthenticated = false;
      throw Exception('Login failed: $e');
    } finally {
      _setLoading(false);
    }
  }

  Future<void> loginWithGoogle() async {
    _setLoading(true);
    try {
      await _authService.loginWithGoogleNative();
      _isAuthenticated = true;
    } catch (e) {
      _isAuthenticated = false;
      throw Exception('Google login failed: $e');
    } finally {
      _setLoading(false);
    }
  }

  Future<void> registerWithCredentials(String email, String password) async {
    _setLoading(true);
    try {
      await _authService.registerWithCredentials(email, password);
      _isAuthenticated = true;
    } catch (e) {
      _isAuthenticated = false;
      throw Exception('Registration failed: $e');
    } finally {
      _setLoading(false);
    }
  }

  Future<void> logout() async {
    _setLoading(true);
    try {
      await _authService.storage.delete(key: 'access_token');
      _isAuthenticated = false;
      Future.microtask(() => notifyListeners());
    } catch (e) {
      print("Error en logout: $e");
      Future.microtask(() => notifyListeners());
      throw Exception('Logout failed: $e');
    } finally {
      _setLoading(false);
    }
  }
}
