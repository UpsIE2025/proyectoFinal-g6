import 'dart:convert';
import 'package:auth0_flutter/auth0_flutter.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'package:google_sign_in/google_sign_in.dart';
import 'package:http/http.dart' as http;

class AuthService {
  final Auth0 _auth0 = Auth0(
    'dev-xixaidu4.us.auth0.com', // Reemplaza con tu dominio de Auth0
    'WbwAnzYNYqky29c1Is3trSqdbF7cIsFl', // Reemplaza con tu Client ID
  );

  final FlutterSecureStorage storage = const FlutterSecureStorage();
  final GoogleSignIn _googleSignIn = GoogleSignIn();

  // Iniciar sesión con email y contraseña
  Future<void> loginWithCredentials(String email, String password) async {
    try {
      final result = await _auth0.api.login(
          usernameOrEmail: email,
          password: password,
          connectionOrRealm: 'Username-Password-Authentication',
          audience: "https://dev-xixaidu4.us.auth0.com/api/v2/");
      // Guardar el token de acceso
      await storage.write(key: 'access_token', value: result.accessToken);
      print('✅ Login successful - Token: ${result.accessToken}');
    } catch (e) {
      print('❌ Login failed: $e');
      rethrow;
    }
  }

  // Registrar usuario con email y contraseña
  Future<void> registerWithCredentials(String email, String password) async {
    try {
      await _auth0.api.signup(
        email: email,
        password: password,
        connection: 'Username-Password-Authentication',
      );
      print('✅ User registered successfully');
    } catch (e) {
      print('❌ Registration failed: $e');
      rethrow;
    }
  }

  // Inicio de sesión con Google de forma nativa
  Future<String> loginWithGoogleNative() async {
    try {
      // 🔴 Cierra la sesión existente antes de iniciar una nueva
      await _auth0.webAuthentication().logout();

      // 1️⃣ Inicia sesión con Google a través de Auth0
      final credentials = await _auth0.webAuthentication().login(
        parameters: {
          'connection':
              'google', // Especifica que quieres usar Google como proveedor
        },
      );

      // 2️⃣ Obtén el token de acceso
      final accessToken = credentials.accessToken;

      if (accessToken != null) {
        // Guarda el token de acceso en el almacenamiento seguro
        await storage.write(key: 'access_token', value: accessToken);
        print('✅ Google login successful - Token: $accessToken');
        return "success";
      } else {
        print('❌ Google login failed - No access token received');
        return "error: No access token received";
      }
    } catch (e) {
      print('❌ Error en loginWithGoogleNative: $e');
      return "error: $e";
    }
  }

  // Método para intercambiar el ID token de Google por un token de Auth0
  Future<Map<String, dynamic>> _exchangeGoogleTokenForAuth0Token(
      String googleIdToken) async {
    try {
      final url = Uri.https('dev-xixaidu4.us.auth0.com', '/oauth/token');
      final response = await http.post(
        url,
        headers: {'Content-Type': 'application/json'},
        body: json.encode({
          'grant_type': 'urn:ietf:params:oauth:grant-type:jwt-bearer',
          'client_id': 'WbwAnzYNYqky29c1Is3trSqdbF7cIsFl',
          'id_token': googleIdToken,
          'connection': 'google-oauth2',
          'scope': 'openid profile email'
        }),
      );

      if (response.statusCode == 200) {
        return json.decode(response.body);
      } else {
        print(
            '❌ Token exchange failed - Status: ${response.statusCode}, Body: ${response.body}');
        return {
          'error': 'Token exchange failed',
          'statusCode': response.statusCode,
          'body': response.body
        };
      }
    } catch (e) {
      print('❌ Exception in _exchangeGoogleTokenForAuth0Token: $e');
      return {'error': 'Exception occurred', 'details': e.toString()};
    }
  }

  // Cerrar sesión
  Future<void> logout() async {
    try {
      await _auth0.webAuthentication().logout();
      await _googleSignIn.signOut();
      await storage.deleteAll(); // Borra todos los tokens almacenados
      print('✅ Logout successful');
    } catch (e) {
      print('❌ Logout failed: $e');
      rethrow;
    }
  }
}
